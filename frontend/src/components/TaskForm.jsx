import { useState } from "react";

// TaskForm — input + button to add a new task
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's full page reload
    if (!title.trim()) return;
    await onAdd(title); // parent calls the POST endpoint
    setTitle(""); // clear the input after adding
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task title"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
