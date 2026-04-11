# 📃 - Once upon A Life AI Story Generation Application

## 🌐 Live Demo

- **Backend API**:
- **Frontend**:
- **GitHub Code**: [https://github.com/modasser-nayem/master-backend-setup](https://github.com/modasser-nayem/master-backend-setup)

---

## 📑 Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Roles & Permissions](#roles--permissions)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

---

## 📄 Documentation

- **[📬 API endpoints documentation]()**

---

## 🚀 Features

- 🧾 **User Authentication & Authorization (JWT)**
- 🐳 **Dockerized for Deployment**
- 🧪 **Unit & Integration Testing with Jest & supertest**
- 🔐 **Secure Password Hashing, Rate Limiting & Error Handling**

---

## 🛠️ Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Language         | TypeScript             |
| Frameworks       | Node.js, Express.js    |
| Databases        | MongoDB                |
| Auth             | JWT, Bcrypt            |
| ORM              | Prisma                 |
| Validation       | Zod                    |
| CI/CD            | GitHub Actions         |
| Containerization | Docker, Docker Compose |
| Documentation    | Postman                |
| Notification     | Nodemailer             |
| Subscription     | RevenueCat (Mobile IAP)|
| Testing          | Jest, Supertest        |

---

<p align="right"><a href="#readme-top">back to top</a></p>

## 🧱 Architecture Overview

The backend follows a layered, modular architecture with:

- **Clean code structure**
- **Separation of concerns**
- **Zod-based DTO validation**
- **Role-based middleware**
- **Global error handling**
- **Logger (Winston)**

---

## 👥 Roles & Permissions

| Role | Capabilities |
| ---- | ------------ |
|      |              |
|      |              |
|      |              |

---

## 📬 API Endpoints

> Base URL: `https://example.com/api/v1`

- **API Documentation (postman)**: []()

---

<p align="right"><a href="#readme-top">back to top</a></p>

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/modasser-nayem/master-backend-setup.git
cd master-backend-setup
```

### 2. Environment Variables

Create your environment file:
```bash
cp .env.example .env
```
> **Important:** Fill out all variables in your `.env` file, specifically `DATABASE_URL` (MongoDB) and `REVENUECAT_WEBHOOK_AUTH`.

### 3. Local Setup (Without Docker)

```bash
npm install
npx prisma generate
npm run dev
```

---

## 🐳 Docker Setup

This project is fully dockerized with a professional continuous multi-stage build.

### Running with Docker Compose
To start the API completely containerized:
```bash
docker-compose up --build -d
```
The API will be available at `http://localhost:5000`. You can view live system logs generated seamlessly by the container in the native `./logs` folder mapped to your host.

To shut the server down:
```bash
docker-compose down
```
---

## 🧪 Scripts

```bash
# Run in development mode
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Run in production mode
npm run start

# Format code
npm run format

# Lint code
npm run lint
```

---

## 📦 Deployment & CI/CD

The backend deployment is 100% automated via **GitHub Actions**.

Whenever code is pushed to the `main` branch, the CI/CD pipeline triggers an SSH script that automatically connects to your VPS (Hostinger, EC2, etc.), downloads the newest code, and restarts the Docker environment efficiently using `--build -d`.

### Required GitHub Secrets
To make deployments work seamlessly, add the following to your GitHub repository under **Settings** > **Secrets and variables** > **Actions**:

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `SSH_HOST` | VPS IP address | `192.168.1.1` |
| `SSH_USERNAME` | Root or SSH User | `root` or `ubuntu` |
| `SSH_PRIVATE_KEY` | Raw private SSH key | `-----BEGIN OPENSSH...` |
| `SERVER_PROJECT_PATH` | The location of the project on the VPS | `/var/www/dominicember555-backend` |
| `SSH_PORT` | (Optional) Custom VPS Port | `22` |

---

## 🪪 License

This project is licensed under the MIT License.
