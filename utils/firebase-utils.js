import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function addTask(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function getTasks() {
  const tasksCol = collection(db, "tasks");
  const taskSnapshot = await getDocs(tasksCol);
  const taskList = taskSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return taskList;
}

export async function updateTask(id, updatedTask) {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, updatedTask);
}

export async function deleteTask(id) {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
}
