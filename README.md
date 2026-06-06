# BlogNest

BlogNest is set up with a React frontend and an Express/MongoDB backend.

## Project Structure

- `frontend` - React + Vite + Tailwind CSS
- `backend` - Node.js + Express + MongoDB/Mongoose

## Setup

Install frontend dependencies:

```bash
npm install --prefix frontend
```

Install backend dependencies:

```bash
npm install --prefix backend
```

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Then update `backend/.env` with your MongoDB connection string if needed.

## Run

Start frontend:

```bash
npm run dev --prefix frontend
```

Start backend:

```bash
npm run dev --prefix backend
```

Frontend: `http://127.0.0.1:5173`
