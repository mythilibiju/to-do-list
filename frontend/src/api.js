// api.js — functions that call the Express backend using fetch
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Helper: send a request, throw an Error with the server's message on failure
async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// GET /api/tasks
export const getTasks = () => request(BASE_URL);

// POST /api/tasks
export const createTask = (title) =>
  request(BASE_URL, { method: "POST", body: JSON.stringify({ title }) });

// PUT /api/tasks/:id — `updates` can contain { completed } and/or { title }
export const updateTask = (id, updates) =>
  request(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

// DELETE /api/tasks/:id
export const deleteTask = (id) =>
  request(`${BASE_URL}/${id}`, { method: "DELETE" });
