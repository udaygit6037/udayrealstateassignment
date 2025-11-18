import { Schema, model } from "mongoose";

const contactSchema = new Schema(
    {
        fullName: { type: String, required: true, trim: true },
        email: { 
            type: String, 
            required: true, 
            trim: true,
            lowercase: true 
        },
        mobile: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        message: { type: String, trim: true },
    },
    { timestamps: true }
);

export default model("Contact", contactSchema);

