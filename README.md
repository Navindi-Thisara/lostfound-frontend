# 🎒 Lost and Found System - Frontend

This is the **frontend** of the **Lost and Found Application for an Educational Institute**. It allows students and staff to report, manage, and track lost and found items through a user-friendly web interface.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT-based authentication)
- 🧾 Add, Edit, and Delete Lost & Found Items
- 🔍 Item Search and Filtering
- 🧑‍💼 Role-Based Dashboard
- 🎨 Responsive UI with Tailwind CSS
- 🌐 REST API integration using Axios

---

## 📁 Project Structure

## public/
Static public assets (e.g., favicon.ico, index.html)

## src/
Source code directory

## api/
Axios instance and API call logic

## components/
Reusable UI components (e.g., forms, buttons)

## pages/
Page-level components like SignIn, SignUp, Dashboard, etc.

## routes/
Route configuration and ProtectedRoute logic

## types/
Custom TypeScript interfaces and types

## utils/
Utility/helper functions (e.g., delete handler)

## App.tsx
Main application component that defines routes

## main.tsx
Application entry point that renders <App />

## tailwind.config.js
Tailwind CSS configuration

## tsconfig.json
TypeScript configuration

## package.json
Project dependencies and scripts

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**
- **Vite** (or CRA if you're not using Vite)

---

## 🔧 Getting Started

### 1. Clone the Repository

git clone https://github.com/Navindi-Thisara/lostfound-frontend.git
cd lostfound-frontend

### 2. Install Dependencies

npm install

### 3. Set API Base URL
Check src/api/axios.ts and ensure the backend base URL is correct:

baseURL: 'http://localhost:8080/lostfound/api'

### 4. Start the Development Server

npm start

Frontend runs by default on http://localhost:3000

## 🔐 Authentication

- JWT token is stored in localStorage.

- Axios automatically adds the token to Authorization headers via interceptors.

## 📦 Available Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm start`     | Start development server   |
| `npm run build` | Build for production       |
| `npm run lint`  | Run linter (if configured) |

## 📸 Screenshots
![Screenshot (1040)](https://github.com/user-attachments/assets/18d13fab-d0e9-4b1a-91b9-b56e0b55883a)
![Screenshot (1041)](https://github.com/user-attachments/assets/917bc6e6-94da-42f3-b315-9379f4aa5ead)

## 🤝 Contributing

1. Fork the repo

2. Create a branch (git checkout -b feature/new-ui)

3. Commit changes (git commit -m "Add new UI component")

4. Push (git push origin feature/new-ui)

5. Open a Pull Request

## 📜 License
MIT License © Navindi-Thisara


