import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";

function App() {
  // All tasks live in component state; updating it re-renders without a page reload
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add: POST to the API, then append the saved task to state
  const handleAdd = async (title) => {
    try {
      const created = await createTask(title);
      setTasks((prev) => [...prev, created]);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle: PUT { completed } and replace the task in state with the server's copy
  const handleToggle = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit title: PUT { title }; returns true on success so TaskItem can close the editor
  const handleEdit = async (id, title) => {
    try {
      const updated = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Delete: DELETE from the API, then remove the task from state
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <h1>To-Do List</h1>
      <p className="subtitle">
        {tasks.length === 0
          ? "Nothing planned yet"
          : `${remaining} of ${tasks.length} remaining`}
      </p>

      <TaskForm onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="empty">Loading…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </main>
  );
}

export default App;
