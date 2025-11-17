import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default model('Admin', AdminSchema);
