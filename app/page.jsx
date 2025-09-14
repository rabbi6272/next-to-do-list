"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  getTasks,
  deleteTask,
  updateTask,
  addTask,
} from "@/utils/firebase-utils";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  async function handleAddTask(e) {
    e.preventDefault();
    const taskInput = formRef.current[0].value;
    if (taskInput.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    await addTask({
      title: taskInput,
      isCompleted: false,
    });
    formRef.current.reset();
    const data = await getTasks();
    setTasks(data);
    toast.success("Task added successfully");
  }
  async function handleToggleTask(task) {
    await updateTask(task.id, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    const data = await getTasks();
    setTasks(data);
    toast.success("Task updated successfully");
  }
  async function handleDeleteTask(id) {
    await deleteTask(id);
    const data = await getTasks();
    setTasks(data);
    toast.success("Task deleted successfully");
  }
  return (
    <main className="h-screen w-screen grid place-items-center">
      <div className="bg-gray-50 shadow-md w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] p-4 rounded-lg flex flex-col items-center justify-center">
        <form
          ref={formRef}
          className="w-full h-1/5 pb-4 flex items-center justify-center gap-2"
        >
          <input
            className="flex-1 placeholder:text-gray-400 border border-gray-400 focus:outline-none focus:border-violet-500 rounded-full text-gray-800 text-center bg-transparent py-1.5 transition-colors duration-300"
            type="text"
            placeholder="Add a task...."
          />
          <button
            className="px-6 py-2 rounded-full bg-violet-500 hover:bg-violet-600 text-white"
            type="submit"
            onClick={handleAddTask}
          >
            Add
          </button>
        </form>
        <div className="w-full h-4/5">
          <ul className="overflow-y-auto mx-auto rounded-md" id="list">
            {tasks?.map((task) => (
              <li
                key={task.id}
                className="list-items flex items-center gap-4 p-2 border-b border-violet-400"
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task)}
                />
                <span className="text-gray-800">{task.title}</span>
                <button
                  className="ml-auto cursor-pointer text-red-600 font-bold"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="absolute bottom-0 text-center text-gray-600">
        <p className="mb-3">
          Developed by
          <Link
            href="https://github.com/rabbi6272"
            target="_blank"
            className="ml-1 hover:underline"
          >
            Rabbi
          </Link>
        </p>
      </footer>
    </main>
  );
}
