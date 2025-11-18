// config/db.js (ES Module)

import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables or a local fallback.
 */
const connectDB = async () => {
    const uri =
        process.env.MONGODB_URI ||
        process.env.MONGO_URI ||
        'mongodb://127.0.0.1:27017/REALTRUST';

    try {
        console.log('🔌 Connecting to MongoDB...');
        console.log('📍 Database URI:', uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials in logs
        
        await mongoose.connect(uri);
        console.log('✅ MongoDB connection successful!');
        console.log('📊 Database:', mongoose.connection.db.databaseName);
        console.log('🔗 Connection state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    } catch (err) {
        console.error('❌ MongoDB connection FAILED:', err.message);
        console.error('Full error:', err);
        process.exit(1);
    }
};

export default connectDB;