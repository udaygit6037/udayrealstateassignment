// seed-admin.js (or similar name)

import 'dotenv/config'; // ✨ RECOMMENDED ESM WAY: Loads environment variables immediately

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Note: Ensure your model file is named Admin.js and uses export default
import Admin from './models/Admin.js'; 

const { genSalt, hash } = bcrypt;

// Use MONGODB_URI or MONGO_URI for better compatibility
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/REALTRUST';

async function seed() {
  try {
    // Note: Mongoose 6+ connects without the need for options object
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to DB');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('❌ Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
      process.exit(1);
    }

    // Check if admin exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('⚠️ Admin already exists, exiting.');
      process.exit(0);
    }

    // Hash password
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    // Create admin
    const admin = new Admin({ email, passwordHash });
    await admin.save();

    console.log('🎉 Admin created:', email);
    process.exit(0);

  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seed();