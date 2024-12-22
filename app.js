// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase Configuration (Your Configuration)
const firebaseConfig = {
  apiKey: "AIzaSyCzSSA4E6mp2soKEFmC0iJN8IoqyoFS-Tw",
  authDomain: "to-do-app-3a80d.firebaseapp.com",
  projectId: "to-do-app-3a80d",
  storageBucket: "to-do-app-3a80d.firebasestorage.app",
  messagingSenderId: "1070199487278",
  appId: "1:1070199487278:web:070ddb5aa3ef73d88098bf",
  measurementId: "G-WJD1W9ZMJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// References
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Fetch Tasks from Firestore
async function fetchTasks() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    displayTask(doc.id, doc.data().task);
  });
}

// Add Task to Firestore
async function addTask() {
  const task = todoInput.value.trim();
  if (task) {
    const docRef = await addDoc(collection(db, "todos"), { task });
    displayTask(docRef.id, task);
    todoInput.value = ""; // Clear input
  }
}

// Display Task
function displayTask(id, task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "todo-item";
  taskDiv.id = id;
  taskDiv.innerHTML = `
    <span>${task}</span>
    <button onclick="deleteTask('${id}')">Delete</button>
  `;
  todoList.appendChild(taskDiv);
}

// Delete Task from Firestore
async function deleteTask(id) {
  await deleteDoc(doc(db, "todos", id));
  document.getElementById(id).remove();
}

// Initialize App
fetchTasks();
