// scripts/create-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User').default;

// Generate secure password
function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@capitalmarkethub.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@capitalmarkethub.com');
      console.log('Role:', existingAdmin.role);
      return;
    }

    // Generate secure password
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Create admin user
    const adminUser = new User({
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@capitalmarkethub.com',
      password: hashedPassword,
      role: 'admin',
      balance: {
        totalBalance: 0,
        BTC: 0,
        depositBalance: 0,
        referralBalance: 0
      },
      dailyTradeLeft: 999, // Unlimited for admin
      currency: 'USD',
      country: 'System'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@capitalmarkethub.com');
    console.log('🔑 Password:', plainPassword);
    console.log('👤 Role: admin');
    console.log('📅 Created at:', new Date().toISOString());

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
createAdminUser();