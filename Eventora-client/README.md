# Eventora Decor - Client Side

This is the frontend application for **Eventora Decor**, built with the latest **React 19** ecosystem. It focuses on delivering a high-performance, visually stunning, and responsive user experience.

---

## 🎨 Design System & UI
- **Framework:** Tailwind CSS v4 + DaisyUI 5
- **Animations:** Framer Motion (Page transitions, Hover effects, Staggered lists).
- **Components:** Custom Bento Grids, Glassmorphism Cards, Modern Data Tables.
- **Responsiveness:** Fully adaptive layouts for Mobile, Tablet, and Desktop.

---

## 📦 Dependencies & Packages

| Package | Purpose |
| :--- | :--- |
| `react-router` (v7) | Next-gen client-side routing. |
| `@tanstack/react-query` | Powerful server state management & caching. |
| `axios` | HTTP client with interceptor support. |
| `firebase` | Authentication provider. |
| `react-hook-form` | Efficient form validation and handling. |
| `recharts` | Data visualization for Admin dashboard. |
| `react-leaflet` | Interactive maps for branch locations. |
| `swiper` | Touch-enabled sliders for testimonials & galleries. |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of `Eventora-client` and add the following keys:

```env
# Backend API Link
VITE_API_URL=http://localhost:5000 
# (Or your deployed server URL)

# Firebase Configuration
VITE_apiKey=your_api_key
VITE_authDomain=your_project_id.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_bucket_url
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key

```
---

## 🏃‍♂️ Run Locally

1.Install dependencies:

```bash
npm install
```
2.Start development server:
```bash
npm run dev
```
3.Build for production:
```bash
npm run build
```
## 🧩 Key Functionalities Implemented

- **Private & Role-Based Routes:** Secure routing for Admin, Decorator, and Users.
- **Real-time Validations:** Forms utilizing Regex for passwords and required fields.
- **Optimistic UI:** Loading spinners and skeleton screens for better UX.
- **Dark/Light Mode:** System-wide theme toggle with persistent state.