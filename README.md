# Habit Tracker

## Overview

Habit Tracker is a full stack habit management application built with a React frontend and an Express backend. Users can register, authenticate using JWT, create and update habits, track daily completion, and view streak metrics.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7e8fc9c-e97b-4f32-a890-229731362991" />

## WakaTime

<img width="1694" height="812" alt="image" src="https://github.com/user-attachments/assets/e11263fe-db50-4263-9db4-782b0750f2a1" />

## Technology Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Bcrypt for password hashing
- Zod for request validation
- CORS
- dotenv

## Features

- User registration and login with JWT authentication
- Protected habit management API routes
- Create new habits
- Toggle habit completion for the current day
- View habit streaks and statistics
- MongoDB persistence for habits, logs, and users

## Project Structure

```
Habit Tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── habitController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validateResource.js
│   ├── models/
│   │   ├── Habit.js
│   │   ├── HabitLog.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── habitRoutes.js
│   ├── validations/
│   │   └── habitValidation.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── vite-env.d.ts
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── DashboardC/
│   │   │   ├── LandingPageC/
│   │   │   ├── ProfileC/
│   │   │   └── SigninC/
│   │   ├── pages/
│   │   ├── store/
│   │   │   └── useHabitStore.ts
│   │   └── utils/
│   │       └── auth.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.js
│   └── eslint.config.js
└── README.md
```

## Setup

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following values:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,https://habit-tracker-plum-chi.vercel.app
```

4. Start the backend server:

```bash
npm run dev
```

The backend should be available at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the API URL:

```env
VITE_API_URL=http://localhost:5000
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend should run on Vite’s default port, typically `http://localhost:5173`.

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Request body: `{ "email": "...", "password": "...", "name": "..." }`
  - Response: `token` and `user`

- `POST /api/auth/login`
  - Request body: `{ "email": "...", "password": "..." }`
  - Response: `token` and `user`

### Habits

- `GET /api/habits`
- `GET /api/habits/stats`
- `POST /api/habits`
  - Request body: `{ "title": "..." }`
- `POST /api/habits/:id/toggle`

### Headers

All protected habit requests require:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

## Testing with Postman

1. Register a new user with `POST /api/auth/register`.
2. Save the returned `token` from the response.
3. Use `POST /api/auth/login` to verify the account.
4. Add the `Authorization` header to habit requests with the Bearer token.
5. Call the protected habit endpoints to confirm the backend accepts the JWT.

## Notes

- The backend uses JWT to authenticate requests and attaches `req.auth.userId` to protected routes.
- Passwords are hashed with bcrypt before they are stored in MongoDB.
- The frontend stores the token in `localStorage` and sends it on every protected API request.

## License

This project is provided under the MIT License.

