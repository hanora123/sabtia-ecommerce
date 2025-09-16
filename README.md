# Sabtiah - E-commerce Platform

This is a full-stack e-commerce platform built with a Next.js frontend and a Node.js backend.

## Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/) for accessible UI components

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [PostgreSQL](https://www.postgresql.org/)

## Folder Structure

The project is organized as a monorepo with two main packages:

```
/
├── backend/      # Node.js Express backend
└── sabtia/       # Next.js frontend
```

## Getting Started

To get the project up and running, you'll need to install the dependencies for both the frontend and backend.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm)
- [PostgreSQL](https://www.postgresql.org/download/) running on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sabtiah-project
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../sabtia
    npm install
    ```

4.  **Set up environment variables:**
    You will need to create `.env` files for both the backend and frontend.

    - In the `backend` directory, create a `.env` file and add your database connection details:
      ```
      DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
      ```
    - In the `sabtia` directory, create a `.env.local` file if you need to add any client-side environment variables.

5.  **Set up the database:**
    The `backend/scripts` directory contains SQL files to initialize the database.
    - `01-create-tables.sql`: Creates the necessary tables.
    - `02-seed-data.sql`: Seeds the database with initial data.
      You can run these scripts using a PostgreSQL client like `psql`.

## Running the Application

You need to run both the backend and frontend servers.

1.  **Run the backend server:**

    ```bash
    cd backend
    node index.js
    ```

    The backend server will start, typically on a port like 3001.

2.  **Run the frontend development server:**
    ```bash
    cd ../sabtia
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
