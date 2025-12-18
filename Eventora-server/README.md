# Eventora Decor - Backend API

The robust backend server powering the Eventora platform. Built with **Node.js** and **Express 5**, ensuring security, scalability, and speed.

---

## 🛡️ Security & Architecture
- **JWT Verification:** Custom Middleware (`verifyFBToken`) validates Firebase ID tokens for every protected route.
- **Role-Based Access Control (RBAC):** Middleware to verify Admin or Decorator privileges before granting access to sensitive APIs.
- **Secure Environment:** Uses `dotenv` to manage secrets and credentials securely.

---

## 🔌 API Endpoints Overview

### Authentication & Users
- `POST /auth/user` - Create or update user in MongoDB upon login.
- `GET /users` - Retrieve all users (Admin only, secure).
- `PATCH /users/role/:id` - Promote/Demote user roles (Admin only).

### Services (CRUD)
- `GET /services` - Fetch services with Pagination, Search, and Filters.
- `POST /services` - Add new service (Admin only).
- `PATCH /services/:id` - Update service details.
- `DELETE /services/:id` - Remove a service.

### Bookings & Payments
- `POST /bookings` - Create a new booking request.
- `POST /create-checkout-session` - Initialize Stripe payment session with discount logic.
- `PATCH /bookings/:id` - Update status or assign decorator.

### Decorator Management
- `POST /decorator-requests` - Submit application to join the team.
- `PATCH /decorator-requests/:id` - Approve/Reject application and auto-update user role.

---

## ⚙️ Environment Variables

Create a `.env` file in the root of `Eventora-server`:

```env
# Database Credentials
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Stripe Secret
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Firebase Admin SDK (Service Account)
# Must be a minified one-line JSON string
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'

# Server Port
PORT=5000
```
## 🚀 Run Locally

1.Install dependencies:

```bash
npm install
```
2.Start the server (using Nodemon for dev):
```bash
node index.js
```
(Or add a dev script in package.json: "dev": "nodemon index.js")

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5 (Modern routing)
- **Database:** MongoDB (Native Driver for maximum control)
- **Auth:** Firebase Admin SDK
- **Payment:** Stripe API