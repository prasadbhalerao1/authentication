# Authentication System - Backend

This is the backend for the MERN Stack Authentication System. It provides a robust and secure API for user authentication and management.

## Features

- **User Authentication**:
  - Register with Email & Password.
  - Login with Email & Password.
  - Logout.
- **Email Verification**:
  - Sends a verification link upon registration.
  - OTP verification for login (2FA).
- **Session Management**:
  - JWT used for Access Tokens (short-lived) and Refresh Tokens (long-lived).
  - Redis used to store session data and refresh tokens.
  - CSRF Protection using double-submit cookie pattern and Redis.
  - Rate Limiting to prevent abuse (Redis-based).
- **Security**:
  - Passwords hashed using `bcrypt`.
  - Secure Cookies (HttpOnly, Secure, SameSite).
  - Input validation using `zod` and `mongo-sanitize`.
- **Admin**:
  - Admin role support with protected routes.

## Tech Stack

- **Node.js** & **Express.js**: Server framework.
- **MongoDB** & **Mongoose**: Database.
- **Redis**: Caching, Session store, Rate limiting.
- **Nodemailer**: Sending emails.
- **Zod**: Schema validation.
- **JsonWebToken (JWT)**: Authentication tokens.

## API Endpoints

### User Routes

| Method | Endpoint                | Description                   | Auth Required    |
| :----- | :---------------------- | :---------------------------- | :--------------- |
| `POST` | `/api/v1/register`      | Register a new user           | No               |
| `POST` | `/api/v1/verify/:token` | Verify email using token      | No               |
| `POST` | `/api/v1/login`         | Login user (Sends OTP)        | No               |
| `POST` | `/api/v1/verify`        | Verify OTP and Complete Login | No               |
| `GET`  | `/api/v1/me`            | Get current user profile      | Yes              |
| `POST` | `/api/v1/refresh`       | Refresh Access Token          | No (uses cookie) |
| `POST` | `/api/v1/logout`        | Logout user                   | Yes              |
| `POST` | `/api/v1/refresh-csrf`  | Refresh CSRF Token            | Yes              |
| `GET`  | `/api/v1/admin`         | Admin dashboard (Example)     | Yes (Admin)      |

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
REDIS_URL=your_redis_url
BASE_URL=http://localhost:5173
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Server**:
    ```bash
    npm run dev
    ```
