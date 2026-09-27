# NexShop — Authentication & Product CRUD Platform

A full-stack e-commerce application built with **Node.js, Express, MongoDB, React (Vite), and express-validator**. Implements secure JWT authentication with **short-lived Access Tokens and long-lived Refresh Tokens (httpOnly cookies)**, full Product CRUD operations, field-level input validation, and a sleek modern frontend UI.

---

## 🌟 Key Features

- **JWT Authentication Architecture**:
  - Short-lived Access Tokens (`15m`) sent in JSON response / headers.
  - Long-lived Refresh Tokens (`7d`) stored in **httpOnly, secure cookies**.
  - Server-side Refresh Token persistence in MongoDB for active session tracking & revocation on logout.
  - Silent token refresh interceptor on frontend (Auto-refreshes access tokens upon `401 TOKEN_EXPIRED`).
- **Express Validator Input Validation**:
  - Request body, params, and query validation on every endpoint.
  - Field-level `400 Bad Request` error formatting detailing exact validation failures (`name`, `email`, `password`, `confirmPassword`, `price`, `stock`, `isMongoId`).
- **Product CRUD APIs**:
  - `POST /api/products`: Create new products (Protected).
  - `GET /api/products`: Public listing with search, category filters, and pagination.
  - `GET /api/products/:id`: Public endpoint for single product lookup.
  - `PUT /api/products/:id`: Update existing product (Protected, existence verified first).
  - `DELETE /api/products/:id`: Delete product (Protected, existence verified first).
- **Responsive Dark Mode UI**:
  - Built with React, Vite, Lucide Icons, and Vanilla CSS Glassmorphism styling.
  - Real-time stock status badges (`In Stock`, `Low Stock`, `Out of Stock`).
  - Interactive Auth Modal, Product Add/Edit Modal, Delete Confirmation, and Security Spec Inspection Modal.

---

## 📁 Project Folder Structure

```text
E-commerceSite/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & Memory Server fallback
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (Register, Login, Refresh, Logout, Me)
│   │   └── productController.js  # Product CRUD logic with existence checks
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token authentication middleware
│   │   └── validateMiddleware.js # express-validator 400 error formatter
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt pre-save & refresh tokens array
│   │   └── Product.js            # Product schema with validations
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   └── productRoutes.js      # Product CRUD endpoints
│   ├── validators/
│   │   ├── authValidator.js      # Auth rules (name, email, password, confirmPassword)
│   │   └── productValidator.js   # Product rules (name, price, stock, category, isMongoId)
│   ├── app.js                    # Express app configuration & global error handlers
│   ├── server.js                 # Server entrypoint
│   ├── seed.js                   # Database seed script for initial testing
│   ├── .env.example              # Sample environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx     # Login & Register modal with field errors
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetailModal.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   ├── SecurityChecklistModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios client with JWT refresh token interceptor
│   │   ├── App.jsx               # Main state container
│   │   ├── main.jsx
│   │   └── index.css             # Glassmorphism design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── README.md
└── package.json                  # Root npm workspace commands
```

---

## 🛠️ Setup & Installation Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (Optional: The application automatically starts an in-memory MongoDB fallback if local MongoDB is not running!)

### 1. Clone & Install Dependencies

```bash
# Navigate to project root
cd E-commerceSite

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory (or edit existing `.env`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
ACCESS_TOKEN_SECRET=super_secret_access_token_key_321654987
REFRESH_TOKEN_SECRET=super_secret_refresh_token_key_987654321
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Seed Initial Demo Data (Optional)

```bash
cd backend
npm run seed
```
*Creates a demo user (`admin@sheryians.com` / `Password123!`) and 6 sample products.*

### 4. Running the Application

In separate terminal windows:

**Start Backend API Server (Port 5000):**
```bash
cd backend
npm run dev
```

**Start Frontend Development Server (Port 5173):**
```bash
cd frontend
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 📡 API Endpoints Reference

### Authentication APIs (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user. Hashes password with bcrypt. Does **not** return tokens. |
| `POST` | `/api/auth/login` | Public | Authenticates user. Returns `accessToken` in JSON and sets `refreshToken` in httpOnly cookie. |
| `POST` | `/api/auth/refresh-token` | Public* | Reads refresh token, verifies against DB record, and issues new access token. |
| `POST` | `/api/auth/logout` | Authenticated | Deletes refresh token from DB record and clears cookie. |
| `GET` | `/api/auth/me` | Authenticated | Returns profile of currently authenticated user. |

### Product CRUD APIs (`/api/products`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/products` | Authenticated | Create a new product resource. |
| `GET` | `/api/products` | Public | List products (Supports `search`, `category`, and `page`/`limit` pagination). |
| `GET` | `/api/products/:id` | Public | Get product details by ID (Validates `:id` format). |
| `PUT` | `/api/products/:id` | Authenticated | Update product (Confirms `:id` exists first). |
| `DELETE` | `/api/products/:id` | Authenticated | Delete product (Confirms `:id` exists first). |

---

## 🔐 Security Checklist & Verification

1. **Password Security**: Passwords hashed using `bcryptjs` with 10 salt rounds before persisting to DB. Passwords are deleted from JSON responses via `toJSON` schema method.
2. **JWT Secret Protection**: Secrets loaded exclusively from environment variables.
3. **httpOnly Refresh Cookie**: Sent with `httpOnly: true`, `sameSite: 'lax'`, preventing client-side JavaScript theft.
4. **Server-Side Token Revocation**: Refresh tokens saved to `user.refreshTokens` array in MongoDB; invalidated immediately upon logout or token reuse.
5. **Field-Level Validation**: Handled by `express-validator` middleware rejecting invalid requests with structured field-level 400 responses.
