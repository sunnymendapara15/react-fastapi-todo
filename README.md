# React + FastAPI Todo App

This repository contains a full-stack todo list example with a **React (Vite)** frontend and a **FastAPI** backend backed by SQLite. The two layers communicate over HTTP so you can run each service independently during development.

## Features

-  CRUD operations for todos (create, read, update, delete)
-  FastAPI backend with SQLite persistence
-  React frontend with optimistic UI updates and error handling
-  CORS-enabled FastAPI server so the frontend can call it from `localhost` ports

## Development

### Backend

1. Create a Python virtual environment and install dependencies:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # use .\venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
3. The API docs are available at `http://localhost:8000/docs`.

### Frontend

1. Install dependencies and run the Vite dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open the displayed URL (usually `http://localhost:5173`) to see the todo app.
3. (Optional) Point the frontend at a different backend by setting `VITE_API_BASE_URL`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000 npm run dev
   ```

## API

- `GET /tasks` - list all todos
- `POST /tasks` - create a todo (`{ "title": "Buy groceries" }`)
- `PUT /tasks/{id}` - update a todo title/completed status
- `DELETE /tasks/{id}` - remove a todo

## Project structure

```
frontend/   # Vite/React SPA
backend/    # FastAPI app (SQLite)
```
