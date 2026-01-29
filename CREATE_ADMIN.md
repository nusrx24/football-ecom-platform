# How to Create an Admin User

## Method 1: Using MongoDB Compass or MongoDB Shell (Recommended)

### Option A: MongoDB Compass (GUI)
1. Open **MongoDB Compass**
2. Connect to `mongodb://127.0.0.1:27017`
3. Navigate to database: `football-ecom`
4. Open collection: `users`
5. Find your user account or create a new one
6. Click **Edit** on the user document
7. Change the `role` field from `"user"` to `"admin"`
8. Click **Update**

### Option B: MongoDB Shell
```bash
# Open MongoDB shell
mongosh

# Switch to the database
use football-ecom

# Update existing user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

# Or create new admin user directly
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$xyz...",  // You'll need to register first to get hashed password
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Method 2: Register Then Promote (Easiest)

### Step-by-Step:

1. **Register a new account** at `http://localhost:3000/register`
   - Name: Admin User
   - Email: admin@example.com
   - Password: yourpassword123

2. **Open MongoDB Compass** or shell

3. **Find the user** in the `users` collection

4. **Change role** from `"user"` to `"admin"`

5. **Login at Admin Dashboard** `http://localhost:3001/login`
   - Use the same email/password
   - Admin dashboard will now grant access

## Method 3: Create Admin Registration Script

Create a file `server/scripts/createAdmin.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/football-ecom');
    
    const email = 'admin@example.com';
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ User promoted to admin:', email);
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        name: 'Admin User',
        email: email,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created:', email);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createAdmin();
```

Run it:
```bash
cd server
node scripts/createAdmin.js
```

## Verification

1. **Login to Admin Dashboard**: `http://localhost:3001/login`
2. **Use admin credentials**
3. You should see the admin dashboard with product management

## Troubleshooting

### "Access denied. Admin privileges required"
- User role is still set to `"user"` in database
- Check MongoDB and update the role field

### Can't login at all
- Password might be incorrect
- Try resetting by creating new admin user

### Admin panel shows blank
- Check browser console for errors
- Make sure backend is running on port 5000
- Verify REACT_APP_API_URL in `.env` file

## Quick Test

After creating admin user:

1. Go to `http://localhost:3001/login`
2. Login with admin credentials
3. You should see: **⚙️ Admin Dashboard**
4. Create a test product to verify everything works

## Security Notes

⚠️ **Important for Production:**
- Never commit admin credentials to git
- Use strong passwords for admin accounts
- Change default admin passwords immediately
- Limit admin user creation to database access only
- Consider implementing 2FA for admin accounts
