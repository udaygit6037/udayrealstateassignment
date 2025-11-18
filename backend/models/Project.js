import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        imageUrl: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default model("Project", projectSchema);
