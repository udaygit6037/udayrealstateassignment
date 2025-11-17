// config/db.js (ES Module)

import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables or a local fallback.
 */
const connectDB = async () => {
    // Check for both common environment variable names




    try {
        // Mongoose 6+ discourages passing the options object as useNewUrlParser and 
        // useUnifiedTopology are true by default and deprecated.
        await mongoose.connect(`${process.env.MONGODB_URI}/REALTRUST`);
        
        console.log('✅ MongoDB connection successful!');
    } catch (err) {
        // Log the full error message and exit the application
        console.error('❌ MongoDB connection FAILED:', err.message);
        process.exit(1); 
    }
};

export default connectDB;