import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }, // cloudinary URL or local path
    },
    { timestamps: true }
);

export default model("Project", projectSchema);
