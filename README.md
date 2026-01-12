# Eventora Decor - Smart Event Styling & Booking Platform

![Eventora Banner](https://i.ibb.co/PGG3V8ST/eventora.png) 

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-v19-blue)

**Eventora Decor** is a comprehensive, full-stack web application designed to revolutionize how clients book luxury event decoration services. It features a robust multi-role ecosystem connecting Clients, Professional Decorators, and Administrators in a seamless, secure, and aesthetically pleasing environment.

---

## 🚀 Live Demo
- **Client URL:** [https://eventora-client-beige.vercel.app](https://eventora-client-beige.vercel.app)
- **Server URL:** [https://eventora-dacor.vercel.app](https://eventora-dacor.vercel.app)

---

## ✨ Key Features (Upgraded)

### 🌟 For Users
- **Immersive Catalog:** Browse decoration packages with advanced filtering (Category, Price, Location) in a responsive 4-column grid.
- **Content Hub:** Read latest event trends and tips via the **Dynamic Blog System**.
- **Secure Booking:** Real-time booking system with Stripe payment integration.
- **Order Tracking:** Visual timeline to track order status (Pending → Planning → Setup → Completed).
- **Interactive UI:** 10+ Homepage sections including FAQ, Testimonials, and Latest News.

### 🎨 For Decorators
- **Workflow Management:** Update project status step-by-step (e.g., On Route, Setup in Progress).
- **Earnings Tracker:** Real-time dashboard showing active projects and total earnings.
- **Portfolio Identity:** Showcase expertise based on specialty (Wedding, Corporate, etc.).

### 🛡️ For Admins
- **CMS Capabilities:** **Write and publish blogs** directly from the dashboard.
- **Role Management:** Promote users to Decorators or Admins; approve/reject "Join Team" requests.
- **Service Management:** CRUD operations for services with live image previews.
- **Analytics:** Visual charts (Recharts) for revenue, user growth, and service popularity.
- **Demo Access:** One-click "Demo Login" feature for quick testing.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Tailwind CSS v4, DaisyUI 5, Framer Motion, TanStack Query, React Hook Form |
| **Backend** | Node.js, Express.js (v5), Firebase Admin SDK |
| **Database** | MongoDB Atlas (Native Driver) |
| **Auth** | Firebase Authentication (Google & Email/Pass) |
| **Payment** | Stripe Payment Gateway |
| **Tools** | Vite, ESLint, Axios, Recharts, React Leaflet |

---

## 📂 Project Structure

This repository is organized as a monorepo containing both client and server applications.

```bash
Eventora-Dacor/
├── Eventora-client/   # Frontend Application (React + Vite)
├── Eventora-server/   # Backend API (Node + Express)
└── README.md          # Project Documentation
```
## 🚀 Getting Started locally

To run this project locally, you need to setup both the client and server terminals.

### Prerequisites
- **Node.js (v18+)**
- **MongoDB URI** 
- **Firebase Configuration Keys**
- **Stripe API Keys**

### 1. Server Setup

```bash
cd Eventora-server
npm install
# Create .env file and add credentials (see server README)
node index.js
```
### 2. Client Setup
```bash
cd Eventora-client
npm install
# Create .env.local file and add keys (see client README)
npm run dev
```
## 🚀 Getting Started locally

You need to create a .env file in the server and .env.local in the client.

### Server (.env):
```bash
DB_USER=your_db_user
DB_PASS=your_db_pass
STRIPE_SECRET_KEY=your_stripe_secret
FIREBASE_SERVICE_ACCOUNT={...json_content...}
```
### Client (.env.local):
```bash
VITE_APIKEY=firebase_api_key
VITE_AUTHDOMAIN=firebase_auth_domain
VITE_PROJECTID=firebase_project_id
VITE_STORAGEBUCKET=firebase_bucket
VITE_MESSAGINGSENDERID=sender_id
VITE_APPID=app_id
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=stripe_public_key
```

## 🤝 Contribution

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License
This project is licensed under the MIT License.

---

### Developed by [Shahriar Kabir]