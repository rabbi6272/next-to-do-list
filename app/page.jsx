"use client";
import React, { useEffect, useState, useRef } from "react";
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
    if (formRef.current[0].value.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    toast.promise(
      addTask({
        title: formRef.current[0].value,
        isCompleted: false,
      }).then(async () => {
        const data = await getTasks();
        setTasks(data);
      }),
      {
        loading: "Adding task...",
        success: "Task added successfully",
        error: "Error adding task",
      }
    );
    formRef.current[0].value = "";
  }

  async function handleToggleTask(task) {
    toast.promise(
      updateTask(task.id, {
        ...task,
        isCompleted: !task.isCompleted,
      }).then(async () => {
        const data = await getTasks();
        setTasks(data);
      }),
      {
        loading: "Updating task...",
        success: "Task updated successfully",
        error: "Error updating task",
      }
    );
  }

  async function handleDeleteTask(id) {
    toast.promise(
      deleteTask(id).then(async () => {
        const data = await getTasks();
        setTasks(data);
      }),
      {
        loading: "Deleting task...",
        success: "Task deleted successfully",
        error: "Error deleting task",
      }
    );
  }

  return (
    <main className="h-[calc(100vh-36px)] flex flex-col items-center justify-center">
      <h1 className="text-5xl text-gray-600 font-extralight m-0 pb-2">
        To Do List
      </h1>
      <div
        className="bg-white shadow-md w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] min-h-au
       max-h-[70%] lg:max-h-[65%] xl:max-h-[60%] p-3 md:p-4 rounded-lg flex flex-col items-center justify-center"
      >
        <form
          ref={formRef}
          className="w-full h-[40px] mb-2 flex items-center justify-center gap-2"
        >
          <input
            className="flex-1 placeholder:text-gray-400 border border-gray-400 focus:outline-none focus:border-violet-500 rounded-full text-gray-800 text-center bg-transparent h-[40px] transition-colors duration-300"
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
        <div className="w-full flex-1 overflow-y-auto">
          <ul className=" mx-auto rounded-md" id="list">
            {tasks?.map((task) => (
              <li
                key={task.id}
                className="list-items flex items-center gap-4 p-2 border-b border-gray-300"
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  className="cursor-pointer"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task)}
                />
                <span className="text-gray-800">{task.title}</span>
                <button
                  className="ml-auto cursor-pointer text-red-400 font-bold"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
