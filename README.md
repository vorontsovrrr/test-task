# Dev Journal (Frontend + Backend)

## Prerequisites
- Node.js 18+
- npm 9+

## Install
```bash
# Backend
cd backend
npm install
# Frontend
cd ../frontend
npm install
```

## Run (two terminals)
```bash
# Terminal 1: backend (NestJS + SQLite)
cd backend
npm run start:dev

# Terminal 2: frontend (Gatsby)
cd frontend
GATSBY_API_BASE_URL=http://localhost:4000 npm run develop -- --port 8001
```

Open:
- Frontend: http://localhost:8001
- Backend health: http://localhost:4000/posts/admin/test

The backend seeds two demo posts on first start. Posts are fetched from the backend and rendered on the frontend.
