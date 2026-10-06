# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB and managed through a REST API; the React UI supports adding, completing, editing and deleting tasks without a page reload.

Course: 23CSB40B Web Technology, Assignment 2 (MBCET, CSE).

## Project structure

```
mern-todo/
├── backend/
│   ├── models/Task.js       # Mongoose schema (title, completed, createdAt)
│   ├── routes/tasks.js      # GET / POST / PUT / DELETE /api/tasks
│   ├── server.js            # Express app, CORS, MongoDB connection
│   ├── .env.example         # Variable names only (copy to .env)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # TaskForm, TaskList, TaskItem
│   │   ├── api.js           # fetch calls to the backend
│   │   ├── App.jsx          # state + useEffect data loading
│   │   └── App.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── .gitignore
```

## Prerequisites

- Node.js 18 or newer
- MongoDB, either local (`mongodb://127.0.0.1:27017/todo`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Running the project

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # then edit .env (Windows: copy .env.example .env)
npm start
```

Fill in `.env`:

| Variable        | Example                                | Meaning                                  |
|-----------------|----------------------------------------|------------------------------------------|
| `MONGO_URI`     | `mongodb://127.0.0.1:27017/todo`       | MongoDB connection string (required)     |
| `PORT`          | `5000`                                 | API port (defaults to 5000)              |
| `CLIENT_ORIGIN` | `http://localhost:3000`                | Only origin allowed by CORS (default shown) |

The server prints `Connected to MongoDB` and `Server running on port 5000` when ready.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000. The frontend calls the API at `http://localhost:5000/api/tasks`
(override with `VITE_API_URL` in `frontend/.env` if your backend uses another address).

## API reference

| Method | Endpoint          | Body                             | Success | Errors            |
|--------|-------------------|----------------------------------|---------|-------------------|
| GET    | `/api/tasks`      | none                             | 200     | 500               |
| POST   | `/api/tasks`      | `{ "title": "Buy milk" }`        | 201     | 400 empty title   |
| PUT    | `/api/tasks/:id`  | `{ "completed": true }` and/or `{ "title": "New" }` | 200 | 400 empty title, 404 not found |
| DELETE | `/api/tasks/:id`  | none                             | 200     | 404 not found     |

Titles are converted with `String()`, trimmed, and rejected with `400` if empty.

## Screenshots

Add your screenshots to a `screenshots/` folder and reference them here:

- `screenshots/add-task.png`
- `screenshots/complete-task.png`
- `screenshots/delete-task.png`
- `screenshots/merged-pull-requests.png`

## Security notes

- `.env` is excluded from Git; only `.env.example` is committed.
- CORS allows only the frontend origin instead of every origin.
