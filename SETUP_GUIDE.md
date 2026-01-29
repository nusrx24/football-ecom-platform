# Football E-Commerce Platform - Separate Admin & Client

## 🎯 Architecture Overview

This project now has **two separate React applications**:

### 1. **Client App** (`/client`) - Customer Storefront
- Product browsing and search
- Shopping cart and wishlist
- User authentication and profile
- Order placement and tracking
- Runs on **port 3000**

### 2. **Admin App** (`/admin-client`) - Admin Dashboard  
- Product management (CRUD operations)
- Order management and status updates
- Admin-only authentication
- Runs on **port 3001**

### 3. **Backend API** (`/server`)
- Shared Node.js/Express API
- MongoDB database
- JWT authentication
- Runs on **port 5000**

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or connection string

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start the Customer App
```bash
cd client
npm install
npm start
# Opens http://localhost:3000
```

### 3. Start the Admin Dashboard
```bash
cd admin-client
npm install
npm start
# Opens http://localhost:3001
```

---

## 👥 User Roles & Access

### Customer Users
- **Registration**: Open to anyone via customer app
- **Access**: Can browse products, make purchases, view orders
- **Login URL**: http://localhost:3000/login

### Admin Users
- **Creation**: Must be created directly in MongoDB with `role: 'admin'`
- **Access**: Full product/order management
- **Login URL**: http://localhost:3001/login
- **Restriction**: Only admin users can log into admin dashboard

---

## 📁 Project Structure

```
football-ecom-platform/
├── server/                 # Backend API (Express + MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── client/                 # Customer Frontend (React)
│   ├── src/
│   │   ├── components/    # ProductList, Cart, Navbar, etc.
│   │   ├── pages/         # Home, Checkout, Wishlist
│   │   ├── context/       # Cart, Auth, Wishlist contexts
│   │   └── services/      # API calls
│   └── package.json
│
└── admin-client/           # Admin Frontend (React)
    ├── src/
    │   ├── components/    # AdminPanel, AdminOrders, Login
    │   ├── context/       # Auth context (admin-only)
    │   └── services/      # API calls
    └── package.json
```

---

## 🔐 Creating an Admin User

Since there's no public admin registration, create admin users via MongoDB:

### Option 1: Using MongoDB Compass or Shell
```javascript
use football-ecom

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Option 2: Update Existing User
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Option 3: Register via Customer App, Then Upgrade
1. Register a normal account at http://localhost:3000/register
2. In MongoDB, change the user's role to `"admin"`
3. Now login at http://localhost:3001/login

---

## 🛠️ Environment Configuration

### Server (`.env`)
```env
MONGO_URI=mongodb://127.0.0.1:27017/football-ecom
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Client (`.env`)
```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000/api
```

### Admin Client (`.env`)
```env
PORT=3001
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 Key Differences Between Apps

| Feature | Customer App | Admin App |
|---------|-------------|-----------|
| **Port** | 3000 | 3001 |
| **Theme** | E-commerce focused | Dashboard focused |
| **Navigation** | Shop, Cart, Wishlist | Products, Orders |
| **Authentication** | Open registration | Admin role required |
| **Features** | Browse, Buy, Track | Manage Products/Orders |

---

## 📋 Available Scripts

### Backend
```bash
npm run dev    # Start with nodemon (hot reload)
npm start      # Production start
```

### Frontend (Both Apps)
```bash
npm start      # Development server
npm build      # Production build
npm test       # Run tests
```

---

## 🔄 API Endpoints (Shared)

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login (returns JWT + user)

### Products
- `GET /api/products` - List all products (public)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `GET /api/orders` - List orders (admin sees all, users see own)
- `POST /api/orders` - Create order (authenticated users)
- `PUT /api/orders/:id/status` - Update order status (admin only)

---

## 🚢 Deployment Strategy

### Option 1: Same Domain with Paths
- **Customer**: `https://yourstore.com`
- **Admin**: `https://yourstore.com/admin`
- Configure routing and build paths accordingly

### Option 2: Subdomains (Recommended)
- **Customer**: `https://shop.yourstore.com`
- **Admin**: `https://admin.yourstore.com`
- **API**: `https://api.yourstore.com`

### Option 3: Separate Domains
- **Customer**: `https://yourstore.com`
- **Admin**: `https://admin-yourstore.com`
- **API**: `https://api-yourstore.com`

---

## 🛡️ Security Notes

1. **Admin Access**: Never expose admin credentials publicly
2. **JWT Tokens**: Stored in localStorage, expires in 7 days
3. **CORS**: Currently allows all origins (update for production)
4. **Password Hashing**: Uses bcryptjs with 10 salt rounds
5. **Role Checking**: Admin routes protected by middleware

---

## 📝 Next Steps

- [ ] Add analytics dashboard for admin
- [ ] Implement real-time order notifications
- [ ] Add product image upload functionality
- [ ] Create customer email notifications
- [ ] Add order invoice generation
- [ ] Implement advanced filtering and search

---

## 🐛 Troubleshooting

### Admin Can't Login
- Verify user has `role: "admin"` in MongoDB
- Check JWT token and localStorage
- Ensure admin-client is running on port 3001

### CORS Errors
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env files
- Ensure CORS is enabled in server.js

### MongoDB Connection Issues
- Check MongoDB is running: `mongod --version`
- Verify connection string in server/.env
- Default: `mongodb://127.0.0.1:27017/football-ecom`

---

## 📧 Support

For issues or questions, check the individual README files in `/client` and `/admin-client` folders.

**Enjoy your separated admin and customer applications! ⚽🎉**
