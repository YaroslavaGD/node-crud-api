# Node.js CRUD API

> A simple, framework-free CRUD API built using Node.js and TypeScript. Designed to demonstrate clean architecture principles and low-level control using only the native HTTP module.

---

## Overview

This project implements a fully functional RESTful API for managing user data using in-memory storage. It adheres strictly to the [RS School Node.js CRUD task requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) and is built without Express or any third-party web framework.

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

### 3. Change .env file

```env
PORT=3000

### 4. Run the application
Development mode (hot reload using ts-node-dev)

```bash
npm run start:dev