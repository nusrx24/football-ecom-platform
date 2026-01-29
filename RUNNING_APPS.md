# 🚀 Running the Separated Admin & Client Apps

## Architecture Overview

You now have **3 separate applications**:

1. **Backend Server** (Port 5000) - Shared API
2. **Customer App** (Port 3000) - Public shopping site
3. **Admin Dashboard** (Port 3001) - Admin management panel

---

## 📋 Step-by-Step Startup Guide

### Step 1: Start Backend Server

```bash
# Terminal 1
cd server
npm run dev
```

✅ **Expected output:**
```
Server running on port 5000
Connected to MongoDB
```

### Step 2: Start Customer App

```bash
# Terminal 2
cd client
npm start
```

✅ **Opens:** `http://localhost:3000` (Customer store)

### Step 3: Start Admin Dashboard

```bash
# Terminal 3
cd admin-client
npm start
```

✅ **Opens:** `http://localhost:3001` (Admin panel)

---

## 👤 Creating Your First Admin User

### Quick Method (Recommended):

1. **Register a regular user first:**
   - Go to: `http://localhost:3000/register`
   - Create account: `admin@example.com` / `password123`

2. **Run the admin creation script:**
   ```bash
   cd server
   node scripts/createAdmin.js
   ```
   
   Or manually update in MongoDB:
   ```bash
   mongosh
   use football-ecom
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Login to admin dashboard:**
   - Go to: `http://localhost:3001/login`
   - Use: `admin@example.com` / `password123`

---

## 🎯 Application URLs

| App | URL | Purpose |
|-----|-----|---------|
| **Backend API** | `http://localhost:5000/api` | Shared API for both apps |
| **Customer Store** | `http://localhost:3000` | Public shopping interface |
| **Admin Dashboard** | `http://localhost:3001` | Product & order management |

---

## ✨ What Each App Does

### 🛍️ Customer App (`localhost:3000`)
- Browse products
- Add to cart & wishlist
- User registration & login
- Checkout & order tracking
- User profile management

### ⚙️ Admin Dashboard (`localhost:3001`)
- **Admin-only access** (blocks regular users)
- Create/Edit/Delete products
- View all orders
- Update order status
- Product inventory management

---

## 🔧 Troubleshooting

### Issue: "Access denied. Admin privileges required"

**Solution:** Your user doesn't have admin role

```bash
# Check user role in MongoDB
mongosh
use football-ecom
db.users.find({ email: "your-email@example.com" })

# Update to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Issue: Port already in use

**Solutions:**
```bash
# Kill process on port 3000/3001
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env file
# admin-client/.env
PORT=3002
```

### Issue: Cannot connect to API

**Check:**
1. Backend is running on port 5000
2. `.env` files have correct `REACT_APP_API_URL=http://localhost:5000/api`
3. No CORS errors in browser console

---

## 📁 Project Structure

```
football-ecom-platform/
├── server/              # Backend API (Port 5000)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── scripts/
│       └── createAdmin.js
├── client/              # Customer App (Port 3000)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
└── admin-client/        # Admin Dashboard (Port 3001)
    ├── src/
    │   ├── components/
    │   │   ├── AdminPanel.js
    │   │   ├── AdminOrders.js
    │   │   ├── AdminNavbar.js
    │   │   └── Login.js
    │   ├── context/
    │   ├── services/
    │   └── App.js
    ├── .env             # PORT=3001
    └── package.json
```

---

## 🔐 Default Admin Credentials

After running `createAdmin.js`:

```
Email: admin@example.com
Password: admin123
```

⚠️ **Change these immediately after first login!**

---

## 🚀 Production Deployment

### Separate Deployments:

1. **Backend:** Deploy to Heroku/Railway/Render
2. **Customer App:** Deploy to Vercel/Netlify
3. **Admin Dashboard:** Deploy to Vercel/Netlify (separate project)

### Environment Variables:

**Client (.env):**
```
REACT_APP_API_URL=https://your-api.herokuapp.com/api
```

**Admin Client (.env):**
```
PORT=3001
REACT_APP_API_URL=https://your-api.herokuapp.com/api
```

**Server (.env):**
```
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
PORT=5000
```

---

## ✅ Quick Start Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Customer app running on port 3000
- [ ] Admin dashboard running on port 3001
- [ ] Admin user created with `role: "admin"`
- [ ] Can login to admin dashboard
- [ ] Can create products in admin panel
- [ ] Can view products on customer site

---

## 📚 Additional Documentation

- [CREATE_ADMIN.md](CREATE_ADMIN.md) - Detailed admin user creation
- [API_REFERENCE.md](API_REFERENCE.md) - API endpoints
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing procedures

---

## 🆘 Need Help?

Common commands:

```bash
# Reset everything
cd server && npm run dev
cd client && npm start
cd admin-client && npm start

# Clear port 3000/3001
npx kill-port 3000
npx kill-port 3001

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

**Now you have completely separated admin and customer applications! 🎉**
