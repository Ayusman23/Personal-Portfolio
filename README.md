# 💼 Ayusman's Personal Portfolio — MERN Stack Edition

A modern, high-performance, and feature-rich **MERN (MongoDB, Express.js, React.js, Node.js)** Full-Stack Developer Portfolio with dynamic content management, real-time message handling, interactive themes, and an authenticated Admin CMS dashboard.

---

## ✨ Features & Highlights

- ⚡ **Full-Stack Architecture**: Built with React (Vite) on the frontend and Express.js + Mongoose on the backend.
- 🎨 **Dynamic Theme Engine**: 5 vibrant accent colors + seamless Dark / Light mode toggle.
- 🛡️ **Admin CMS Dashboard (`/admin/dashboard`)**:
  - Authenticated via JWT.
  - **Inquiries Inbox**: View, filter, mark as read/unread, and manage incoming messages from visitors.
  - **Project Manager**: Add, edit, or delete projects with live URLs, GitHub repos, tags, and images.
  - **Skills & Timeline Manager**: Manage skills, proficiency bars, internships, certificates, and education.
  - **Profile Editor**: Edit bio, contact info, and availability status live without rebuilding code.
- 📂 **Preserved Assets & Certificate Viewer**: In-app modal viewer and download triggers for all internship certificates (`Hal.pdf`, `Cipherbyte.pdf`, `Octanet.pdf`) and CV (`My cv.pdf`).
- 🔍 **Interactive Project Explorer**: Real-time project search and filtering by categories (Full Stack, Web Dev, Event Management, Utility Apps, Landing Page).
- 💬 **Live Contact Form**: Connected directly to MongoDB backend with validation, confetti celebration, and real-time toast alerts.
- 🚀 **Zero-Friction Fallback**: Connects directly to local/remote MongoDB or automatically spins up an in-memory MongoDB fallback instance if a database service isn't active.

---

## 📁 Project Structure

```bash
Personal-Portfolio/
├── backend/
│   ├── config/             # Database connection (MongoDB + Fallback)
│   ├── controllers/        # Express route logic (Auth, Projects, Skills, Contact, etc.)
│   ├── middleware/         # Auth (JWT) & Error handling middleware
│   ├── models/             # Mongoose schemas (User, Project, Skill, Contact, etc.)
│   ├── routes/             # REST API routes (/api/projects, /api/contact, /api/auth...)
│   ├── seeds/              # Auto-seed database script with original portfolio data
│   ├── .env.example        # Environment variables template
│   └── server.js           # Main backend entry point
│
├── frontend/
│   ├── public/
│   │   └── assets/         # Certificates, CV, and project images
│   ├── src/
│   │   ├── components/     # Reusable UI (Sidebar, StyleSwitcher, ProjectCard, Modals, Toast...)
│   │   ├── context/        # React Context (ThemeContext, AuthContext)
│   │   ├── pages/          # Pages (Home, About, Services, Projects, Contact, Admin)
│   │   ├── services/       # Axios API client
│   │   ├── styles/         # Global design system, glassmorphism, and admin styles
│   │   ├── App.jsx         # Routes & Layout
│   │   └── main.jsx        # React entry
│   └── vite.config.js
│
├── package.json            # Root configuration with concurrent execution scripts
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Optional - MongoDB Atlas or local daemon; in-memory fallback will run automatically if MongoDB is not active)

### 2. Install Dependencies

You can install all dependencies (root, backend, and frontend) in one command:

```bash
npm run install:all
```

Or individually:

```bash
# In backend/
cd backend && npm install

# In frontend/
cd frontend && npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend/` directory (or use default values from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=ayusman_mern_portfolio_secret_key_2024_secure
ADMIN_USERNAME=admin
ADMIN_EMAIL=ayusmansamantaray23@gmail.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Run the Full Application

From the root directory, start both the Express backend and React frontend concurrently:

```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🔐 Default Admin Credentials

- **Username**: `admin` (or `ayusmansamantaray23@gmail.com`)
- **Password**: `admin123`

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Server health check | Public |
| `GET` | `/api/profile` | Get personal bio & contact information | Public |
| `PUT` | `/api/profile` | Update profile information | Private (Admin) |
| `GET` | `/api/projects` | List projects (with search & category filter) | Public |
| `POST` | `/api/projects` | Create a new project | Private (Admin) |
| `PUT` | `/api/projects/:id` | Update an existing project | Private (Admin) |
| `DELETE` | `/api/projects/:id` | Delete a project | Private (Admin) |
| `GET` | `/api/skills` | List all skills | Public |
| `POST` | `/api/skills` | Add new skill | Private (Admin) |
| `DELETE` | `/api/skills/:id` | Delete skill | Private (Admin) |
| `GET` | `/api/experiences` | List internship / work experiences | Public |
| `GET` | `/api/education` | List education timeline items | Public |
| `GET` | `/api/services` | List offered services | Public |
| `POST` | `/api/contact` | Submit contact message inquiry | Public |
| `GET` | `/api/contact` | Get all visitor messages | Private (Admin) |
| `PATCH` | `/api/contact/:id` | Toggle read/unread status | Private (Admin) |
| `DELETE` | `/api/contact/:id` | Delete contact message | Private (Admin) |
| `POST` | `/api/auth/login` | Authenticate admin & receive JWT | Public |
| `GET` | `/api/auth/me` | Get current authenticated user | Private (Admin) |
| `POST` | `/api/seed` | Reset & reseed database with default data | Public / Private |

---

## 🧑‍💻 Author

- **Ayusman Samantaray**
- 📧 [ayusmansamantaray23@gmail.com](mailto:ayusmansamantaray23@gmail.com)
- 🐙 [GitHub Profile](https://github.com/Ayusman23)
- 💼 [LinkedIn Profile](https://linkedin.com/in/ayusman-samantaray)
