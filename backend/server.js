// server.js (or index.js - your main application file)

import 'dotenv/config'; // ESM way to load dotenv at the start
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- NEW IMPORTS (Note the .js extension for local files) ---
import connectDB from './lib/db.js'; // Default import
import Subscriber from './models/Subscriber.js';
import Project from './models/Project.js';
import Admin from './models/Admin.js';
import auth from './middleware/auth.js';

// Connect to MongoDB
connectDB(); // Execute the connection function

const app = express();
app.use(cors());
app.use(express.json());


// --- Subscriber route ---
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });
        const existing = await Subscriber.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already subscribed' });
        const sub = new Subscriber({ email });
        await sub.save();
        return res.json({ message: 'Subscribed successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// --- Public: GET projects ---
app.get('/api/projects', async (req, res) => {
    try {
        // Note: .default is removed as models are now imported directly
        const projects = await Project.find().sort({ _id: 1 }); 
        return res.json({ projects });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// --- Protected: create project (admin only) ---
app.post('/api/projects', auth, async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });
        const p = new Project({ title, description, imageUrl });
        await p.save();
        return res.json({ project: p });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// --- Admin login ---
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '8h'
        });

        return res.json({ token, admin: { email: admin.email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));