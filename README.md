# MERN Authentication System

A complete, production-ready Authentication System built with the MERN stack (MongoDB, Express, React, Node.js), Redis, and Shadcn UI.

## Overview

This project implements a secure and modern authentication flow including:

- **Registration** with Email Verification.
- **Login** with 2FA (OTP).
- **Secure Sessions** using HttpOnly Cookies and Redis.
- **Access & Refresh Tokens** for session management.
- **CSRF Protection**.
- **Rate Limiting**.
- **Modern UI** using Tailwind CSS and Shadcn UI.

## Project Structure

The project is divided into two main directories:

- **[backend](./backend)**: The Node.js/Express API server.
- **[frontend](./frontend)**: The React/Vite client application.

## Quick Start

### Prerequisites

- Node.js installed.
- MongoDB instance running.
- Redis instance running.

### Installation

1.  **Setup Backend**:

    ```bash
    cd backend
    npm install
    # Configure .env (see backend/README.md)
    npm run dev
    ```

2.  **Setup Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
