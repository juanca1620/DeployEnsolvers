# Notes App Documentation

## Overview
This is a full-stack Note Taking application that allows users to create, edit, archive, and categorize notes.

## Technologies Used

### Backend
- **Java 21**: Core programming language.
- **Spring Boot**: Framework for creating the REST API.
- **Spring Data JPA**: For database interactions.
- **PostgreSQL**: Relational database management system.
- **Docker**: For containerization.

### Frontend
- **React**: Library for building the user interface.
- **TypeScript**: Statically typed superset of JavaScript.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **React Hook Form & Zod**: For form handling and validation.

### Infrastructure
- **Docker Compose**: Orchestration of Frontend, Backend, and Database containers.

---

## Prerequisites
To run this application, you must have the following installed on your machine:

- **Docker Desktop**: Ensure it is installed and running.

---

## How to Run the Application

The application is fully containerized and includes a helper script to get you started up quickly.

### 1. Start the Application
Open your terminal in the root directory of the project and run:

```bash
sh scripts/startAplication.sh
```

**What happens next?**

1.  It builds the Backend JAR file.
2.  It builds the Frontend static assets (injecting the API URL).
3.  It spins up the PostgreSQL database, Backend, and Frontend containers.

### 2. Access the Application

Once the script finishes and the containers are running:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Database**: Port `5000` (mapped locally).

### 3. Login
Use the registered credentials to access your notes.

default credentials:
- **Username**: `user`
- **Password**: `1234`

---

## Troubleshooting

- **"Docker is not running"**: manually open Docker Desktop and wait for the engine to start.
- **Port Conflicts**: Ensure ports `3000`, `8080`, and `5000` are free on your machine.
