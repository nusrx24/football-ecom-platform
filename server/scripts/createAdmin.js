const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/football-ecom';
    await mongoose.connect(mongoURI);
    console.log('📦 Connected to MongoDB');
    
    // Admin user details - CHANGE THESE!
    const email = 'admin@example.com';
    const password = 'admin123'; // Change this!
    const name = 'Admin User';
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // Update existing user to admin
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('✅ User promoted to admin:', email);
      console.log('📧 Email:', email);
      console.log('🔐 Use your existing password to login');
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email:', email);
      console.log('🔐 Password:', password);
      console.log('⚠️  Please change this password after first login!');
    }
    
    console.log('\n🚀 You can now login at: http://localhost:3001/login');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
