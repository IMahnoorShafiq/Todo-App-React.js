import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import "./styles.css"; 

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const updateTask = () => {
    if (task.trim() && currentTaskIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === currentTaskIndex ? task : t
      );
      setTasks(updatedTasks);
      setTask("");
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (isEditing && currentTaskIndex === index) {
      setTask("");
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-200 to-pink-300 text-black"}`}>
      <div className={`p-6 rounded shadow-md w-full max-w-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold"><i className="fas fa-tasks mr-2"></i>Todoist</h1>
          <button
            onClick={toggleTheme}
            className="bg-gradient-to-r from-yellow-300 to-orange-300 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className={`border ${isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"} rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400`}
            placeholder="Enter a new task"
          />
          <button
            onClick={isEditing ? updateTask : addTask}
            className={`${isEditing ? "bg-blue-500" : "bg-purple-500"} text-white px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-purple-400`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              <span>{task}</span>
              <div>
                <button
                  onClick={() => editTask(index)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
