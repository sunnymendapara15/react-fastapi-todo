import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "" });

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.id - b.id);
  }, [tasks]);

  const fetchTasks = async () => {
    setStatus({ loading: true, message: "Loading todos..." });
    try {
      const response = await fetch(`${API_BASE}/tasks`);
      if (!response.ok) throw new Error("Unable to load todos");
      const payload = await response.json();
      setTasks(payload);
      setStatus({ loading: false, message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: error.message });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!newTask.trim()) return;
    setStatus({ loading: true, message: "Saving todo..." });

    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask.trim() }),
      });

      if (!response.ok) throw new Error("Failed to save todo");

      const created = await response.json();
      setTasks((prev) => [...prev, created]);
      setNewTask("");
      setStatus({ loading: false, message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: error.message });
    }
  };

  const handleToggle = async (task) => {
    setStatus({ loading: true, message: "Updating todo..." });
    try {
      const response = await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!response.ok) throw new Error("Unable to toggle todo");
      const updated = await response.json();
      setTasks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setStatus({ loading: false, message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: error.message });
    }
  };

  const handleDelete = async (taskId) => {
    setStatus({ loading: true, message: "Deleting todo..." });
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to delete todo");
      setTasks((prev) => prev.filter((item) => item.id !== taskId));
      setStatus({ loading: false, message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: error.message });
    }
  };

  return (
    <div className="app-shell">
      <h1>FastAPI + React Todo</h1>
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          disabled={status.loading}
        />
        <button type="submit" disabled={status.loading || !newTask.trim()}>
          Add
        </button>
      </form>

      {status.message && <p className="status">{status.message}</p>}

      <ul className="todo-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task)}
              />
              {task.title}
            </label>
            <button onClick={() => handleDelete(task.id)} aria-label="Delete todo">
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
