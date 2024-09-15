import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskInput, setEditingTaskInput] = useState('');
  const [editingDeadlineInput, setEditingDeadlineInput] = useState('');

  const addTask = () => {
    if (taskInput && deadlineInput) {
      const newTask = {
        id: Date.now(),
        name: taskInput,
        deadline: new Date(deadlineInput),
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDeadlineInput('');
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setEditingTaskInput(task.name);
    setEditingDeadlineInput(task.deadline.toISOString().slice(0, 16));
  };

  const updateTask = () => {
    if (editingTaskInput && editingDeadlineInput) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, name: editingTaskInput, deadline: new Date(editingDeadlineInput) }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setEditingTaskInput('');
      setEditingDeadlineInput('');
    }
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const timeLeft = deadline - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Task"
        />
        <input
          type="datetime-local"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {editingTask && (
        <div className='edit-form'>

        
          <input
            type="text"
            value={editingTaskInput}
            onChange={(e) => setEditingTaskInput(e.target.value)}
          />

          <input
            type="datetime-local"
            value={editingDeadlineInput}
            onChange={(e) => setEditingDeadlineInput(e.target.value)}
          />
          <button onClick={updateTask}>Update</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
          
            <span className='task-name'>{task.name} </span> 
            
            
            <span >Time Left: {calculateTimeLeft(task.deadline)}</span>
            

            <button   onClick={() => editTask(task)}>Edit</button>
            <button  onClick={() => deleteTask(task.id)}>Delete</button>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
