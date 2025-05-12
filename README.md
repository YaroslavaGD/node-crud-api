# Node.js CRUD API

> A simple, framework-free CRUD API built using Node.js and TypeScript. Designed to demonstrate clean architecture principles and low-level control using only the native HTTP module.

---

## Overview

This project implements a functional RESTful API for managing user data using in-memory storage. It adheres strictly to the [RS School Node.js CRUD task requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) and is built without Express or any third-party web framework.

---

## Technologies

- **Node.js** (v22.x.x LTS)
- **TypeScript**
- **UUID** (for unique user IDs)
- **Webpack** (for production bundling)
- **ts-node-dev** (for hot-reload development)
- **ESLint** + **Prettier** (for code quality)

---

## 📁 Project Structure
```
├── src/
│ ├── controllers/ # Request handling logic
│ ├── services/ # Business logic and data manipulation
│ ├── routes/ # Routing requests by URL/method
│ ├── utils/ # Helpers and response formatting
│ ├── models/ # TypeScript interfaces
│ └── index.ts # Entry point for the server
├── dist/ # Production bundle
├── .env # Environment variables
├── .eslintrc.jso
├── tsconfig.json
├── prettierrc.json
├── package.json
├── webpack.config.js
└── README.md
```
---

## Getting Started

### 1. Clone the repo

```bash
git https://github.com/YaroslavaGD/node-crud-api.git
cd node-crud-api
git checkout dev

### 2. Install dependencies

```bash
npm install
```
### 3. Change .env file

```env
PORT=3000
```
### 4. Run the application

#### Development mode (hot reload using `ts-node-dev`)

```bash
npm run start:dev
```

#### Production mode (using bundled Webpack build)

```bash
npm run build
npm run start:prod
```

---

---

## 📦 Available Scripts

| Script              | Description                                      |
|---------------------|--------------------------------------------------|
| `start:dev`         | Run the app in development mode with hot reload |
| `build`             | Build the project using Webpack                 |
| `start:prod`        | Run the bundled production build                |
| `lint`              | Run ESLint with autofix                        |
| `format`            | Format code using Prettier                     |

---

## 📘 API Endpoints

All endpoints follow the base URL: `http://localhost:{PORT}/api/users`

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| GET    | `/api/users`        | Get all users         |
| GET    | `/api/users/:id`    | Get user by ID        |
| POST   | `/api/users`        | Create new user       |
| PUT    | `/api/users/:id`    | Update existing user  |
| DELETE | `/api/users/:id`    | Delete user by ID     |

### 📥 Request body (for POST/PUT)

```json
{
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

---

## ✅ Validation Rules

- All fields (`username`, `age`, `hobbies`) are **required**
- `id` must be a **valid UUID**
- Proper status codes are returned:
  - `200 OK` / `201 Created` / `204 No Content`
  - `400 Bad Request` for invalid input
  - `404 Not Found` if user doesn't exist
  - `500 Internal Server Error` for unexpected issues

---

## 🔮 Planned Enhancements

- [ ] Switch from in-memory DB to persistent DB (e.g. PostgreSQL)
- [ ] Add logging and request middleware
- [ ] Implement full API test coverage
- [ ] Add clustering and load balancing using Node.js `Cluster` API

---

## 👤 Author

**YaroslavaGD**  
[github.com/YaroslavaGD](https://github.com/YaroslavaGD)

---

## 📄 License

This project is licensed under the **ISC License** — free for personal and commercial use.