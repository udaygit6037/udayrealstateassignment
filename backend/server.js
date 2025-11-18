// server.js (or index.js - your main application file)

import 'dotenv/config'; // ESM way to load dotenv at the start
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// --- IMPORTS ---
import connectDB from './lib/db.js';
import auth from './middleware/auth.js';

// Controllers
import * as projectController from './controllers/projectController.js';
import * as subscriberController from './controllers/subscriberController.js';
import * as contactController from './controllers/contactController.js';
import * as authController from './controllers/authController.js';

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",  // Vite's default port
    credentials: true
}));
app.use(express.json());

// --- Public Routes ---

// Projects
app.get('/api/projects', projectController.getProjects);
app.get('/api/projects/:id', projectController.getProject);

// Subscribers
app.post('/api/subscribe', subscriberController.subscribe);

// Contact
app.post('/api/contact', contactController.submitContact);

// Auth
app.post('/api/admin/login', authController.loginAdmin);

// --- Protected Routes (Admin Only) ---

// Projects
app.post('/api/projects', auth, projectController.createProject);
app.put('/api/projects/:id', auth, projectController.updateProject);
app.delete('/api/projects/:id', auth, projectController.deleteProject);

// Subscribers
app.get('/api/subscribers', auth, subscriberController.getSubscribers);
app.delete('/api/subscribers/:id', auth, subscriberController.deleteSubscriber);

// Contacts
app.get('/api/contacts', auth, contactController.getContacts);
app.get('/api/contacts/:id', auth, contactController.getContact);
app.delete('/api/contacts/:id', auth, contactController.deleteContact);

// Auth verification
app.get('/api/admin/verify', auth, authController.verifyToken);

// Test route to check database connection and collections
app.get('/api/test/db', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                connected: false,
                error: 'Database not connected',
                readyState: mongoose.connection.readyState
            });
        }
        
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        // Get counts for each collection
        const counts = {};
        for (const name of collectionNames) {
            try {
                counts[name] = await db.collection(name).countDocuments();
            } catch (err) {
                counts[name] = 'error: ' + err.message;
            }
        }
        
        return res.json({
            connected: true,
            database: db.databaseName,
            collections: collectionNames,
            counts: counts,
            message: 'Database connection is working'
        });
    } catch (err) {
        return res.status(500).json({ 
            error: 'Database test failed', 
            message: err.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});