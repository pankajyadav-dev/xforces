# xForces

![Status](https://img.shields.io/badge/status-active-success.svg)
![Tech](https://img.shields.io/badge/tech-Next.js%20%7C%20TypeScript%20%7C%20Docker%20%7C%20Redis-blueviolet)

**xForces** is a high-performance **Competitive Programming Platform** designed to host coding contests, practice algorithmic problems, and provide real-time code execution.

Built with a modern tech stack, it features a **Next.js** frontend for a seamless user experience and a **Rust-based worker** (or high-speed TypeScript engine) for secure, isolated code compilation and execution.

---

## Architecture

The platform follows a microservices-inspired architecture to separate the web interface from the heavy lifting of code execution.

1.  **Frontend & API (Next.js)**: Handles user authentication, problem management, and contest logic.
2.  **Message Queue (Redis)**: Acts as a buffer between the web server and the execution engine.
3.  **Execution Engine**: A dedicated worker service that pulls jobs from Redis and manages the execution lifecycle.
4.  **Sandbox (Docker & cgroups)**: Ensures that user code runs in a restricted environment with strict memory and CPU limits.

---

## Key Features

- **Real-time Code Execution**: Instant feedback on submissions with detailed verdicts (AC, WA, TLE, MLE).
- **Secure Sandboxing**: Uses Docker containers and Linux `cgroups` to isolate untrusted code.
- **User Dashboard**: Track submissions, ratings, and problem-solving history.

---

## Tech Stack

### Core

- **Frontend**: [Next.js](https://nextjs.org/) (React), TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js Server Actions / API Routes
- **Database**: PostgreSQL (Prisma ORM)

### Execution & Infrastructure

- **Worker Service**: Typescript / [Bun](https://bun.sh/)
- **Containerization**: Docker & Docker Compose
- **Queue & Caching**: Redis

---

## Getting Started

You can set up **xForces** using two different methods depending on your environment.

### Prerequisites

- **Docker & Docker Compose** (Required)
- **Bun & Node.js** (Optional - only for Method 2)

---

> **Note:** Ensure Docker is running before starting the application, as the execution worker requires Docker to spawn secure containers for code evaluation.

### Method 1: Full Docker Setup (Recommended)

This is the fastest way to get the entire platform running without installing local dependencies like Postgres or Redis.

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/pankajyadav-dev/xforces.git](https://github.com/pankajyadav-dev/xforces.git)
    cd xforces
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory and add your credentials (see **Environment Variables** section below).

3.  **Launch the Platform**
    ```bash
    docker-compose up --build
    ```
    _This command builds and starts the Frontend, Worker, Redis, and Postgres services automatically._

---

### Method 2: Hybrid Development (Local + Docker)

Use this if you are actively developing and need Hot Module Replacement (HMR).

1.  **Start Infrastructure Only**

    ```bash
    docker-compose up -d redis postgres
    ```

2.  **Install Dependencies**

    ```bash
    bun install
    ```

3.  **Sync Database**

    ```bash
    bun turbo db:migrate
    ```

4.  **Run Development Servers**
    ```bash
    bun run dev
    ```
    The web app will be available at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the `apps/xforces` & `apps/engine` & `packages/dp` directory:

```env
DATABASE_URL="postgres://user:password@localhost:5432/xforces"
REDIS_URL="redis://localhost:6379"
AUTH_SECRET="your-secret-key"
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-auth-id"
AUTH_GOOGLE_SECRET="your-google-auth-secret"
AUTH_TRUST_HOST=true

```

---

## 👤 Author

**Pankaj Yadav**

- **GitHub**: [@pankajyadav-dev]()
- **LinkedIn**: [Pankaj Yadav]()

---
