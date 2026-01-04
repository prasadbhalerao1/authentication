# Authentication System - Frontend

This is the frontend for the MERN Stack Authentication System. It is built with React and Vite, featuring a modern and premium design using Shadcn UI and Tailwind CSS.

## Features

- **Modern UI**: Built with Shadcn UI and Tailwind CSS v4.
- **Responsive Design**: Fully responsive layout for all devices.
- **Authentication Flows**:
  - **Login**: Secure login with Email/Password and OTP.
  - **Register**: User registration with form validation.
  - **Email Verification**: Handles email link verification.
- **Dashboard**: Protected dashboard route.
- **State Management**: Context key API for auth state.
- **Feedback**: Sonner toasts for success/error messages.

## Tech Stack

- **React**: UI Library.
- **Vite**: Build tool.
- **Tailwind CSS**: Styling.
- **Shadcn UI**: Component library.
- **Axios**: HTTP client.
- **React Router DOM**: Routing.
- **Sonner**: Toast notifications.

## Project Structure

- `src/components`: Reusable UI components (Shadcn).
- `src/pages`: Application pages (Login, Register, Home, etc).
- `src/context`: Authentication context provider.
- `src/apiIntercepter.js`: Axios configuration with interceptors for token refresh and CSRF.

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm run lint`: Lint code.
