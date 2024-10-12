import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://to-do-list-138e6-default-rtdb.firebaseio.com/"
}

const taskInput = document.getElementById("task-input")
const todoForm = document.getElementById("todo-form")
const taskListEl = document.getElementById("task-list")

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const tasksRef = ref(database, "tasks")

onValue(tasksRef, function(snapshot) {
  const snapshotDoesExist = snapshot.exists()
  if (snapshotDoesExist) {
    const snapshotData = snapshot.val()
    const taskValues = Object.values(snapshotData)
    const taskIds = Object.keys(snapshotData)
    renderTask(taskValues, taskIds)
  } else {
    cleanTasks()
  }
})

function getInputValue() {
  return taskInput.value
}

function resetInput() {
  taskInput.value = ""
}

function cleanTasks() {
  taskListEl.innerHTML = `<li class="task-item no-tasks-msg">No tasks available</li>`
}

function renderTask(taskValues, taskIds) {
  let items = ""
  for (let i = 0; i < taskValues.length; i++) {
    items += `<li class="task-item">
      <input type="checkbox" name="task1" id="${taskIds[i]}" class="task-checkbox">
      <label for="${taskIds[i]}" class="task-label">${taskValues[i]}</label>
    </li>`
  }
  taskListEl.innerHTML = items
}

todoForm.addEventListener("submit", function(e) {
  e.preventDefault()
  let input = getInputValue()
  if (input) {
    push(tasksRef, input)
    resetInput()
  }
})

todoForm.addEventListener("reset", function() {
  remove(tasksRef)
})