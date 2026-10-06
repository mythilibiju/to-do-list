import { useState } from "react";

// TaskItem — a single task with checkbox, inline edit and delete button
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  // Save the edited title through the PUT endpoint
  const saveEdit = async () => {
    const ok = await onEdit(task._id, draft);
    if (ok) setEditing(false);
  };

  return (
    <li className={task.completed ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${
          task.completed ? "incomplete" : "complete"
        }`}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          autoFocus
        />
      ) : (
        // Completed tasks are shown with a strike-through via the "done" class
        <span className="title">{task.title}</span>
      )}

      <div className="actions">
        {editing ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button
              className="secondary"
              onClick={() => {
                setDraft(task.title);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="secondary" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        <button className="danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
