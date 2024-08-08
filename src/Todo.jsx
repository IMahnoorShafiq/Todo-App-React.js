
import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-pink-300">
      <div className="bg-white p-6 rounded shadow-md  w-full max-w-md">
        <h1 className="text-2xl text-purple-900  font-bold mb-4"><i className="fas fa-tasks mr-2"></i>Todoist</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter a new task"
          />
          <button
            onClick={isEditing ? updateTask : addTask}
            className={`${
              isEditing ? "bg-blue-500" : "bg-purple-500"
            } text-white px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-purple-400`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <ul >
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2"
            >
              <span>{task}</span>
              <div>
                <button
                  onClick={() => editTask(index)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2"
                ><i class="fas fa-edit mr-2"></i>
                  Edit
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                ><i className="fas fa-trash mr-2"></i>
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
