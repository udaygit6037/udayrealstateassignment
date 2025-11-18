import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import Project from "./models/Project.js";
import { uploadLocalImageToCloudinary } from "./lib/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve local file paths
function resolveImage(relativePath) {
  return path.join(__dirname, relativePath);
}

// Import images AS LOCAL PATHS (not URLs)
const img1 = resolveImage("./assets/images/pexels-fauxels-3182834.svg");
const img2 = resolveImage("./assets/images/pexels-fauxels-3182834.svg");
const img3 = resolveImage("./assets/images/pexels-fauxels-3182834.svg");
const img4 = resolveImage("./assets/images/pexels-brett-sayles-2881232-3.svg");
const img5 = resolveImage("./assets/images/pexels-fauxels-3182834.svg");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/REALTRUST";

const sampleProjects = [
  {
    title: "Luxury Downtown Apartment Complex",
    description:
      "Modern 3-bedroom apartments with premium amenities in the heart of the city.",
    imageUrl: img1,
  },
  {
    title: "Suburban Family Homes",
    description:
      "Spacious 4-bedroom family homes with large backyards, perfect for families.",
    imageUrl: img2,
  },
  {
    title: "Modern Office Spaces",
    description:
      "Contemporary office buildings designed for productivity and collaboration.",
    imageUrl: img3,
  },
  {
    title: "Beachfront Condominiums",
    description:
      "Stunning ocean-view condos with direct beach access and resort amenities.",
    imageUrl: img4,
  },
  {
    title: "Eco-Friendly Residential Community",
    description:
      "Sustainable living with solar panels, rainwater harvesting, and green spaces.",
    imageUrl: img5,
  },
];

async function seed() {
  try {
    // Cloudinary check
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("❌ Missing Cloudinary credentials in .env");
      process.exit(1);
    }

    // Connect DB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    console.log("\n📤 Uploading images to Cloudinary...\n");

    const projectsToInsert = [];

    for (const project of sampleProjects) {
      // Skip duplicates
      const exists = await Project.findOne({ title: project.title });
      if (exists) {
        console.log(`⚠️  Project "${project.title}" already exists — skipping`);
        continue;
      }

      try {
        console.log(`Uploading image for: ${project.title}`);
        const cloudUrl = await uploadLocalImageToCloudinary(project.imageUrl);
        console.log(`✔ Uploaded → ${cloudUrl}\n`);

        projectsToInsert.push({
          ...project,
          imageUrl: cloudUrl,
        });
      } catch (err) {
        console.error(`❌ Image upload failed for ${project.title}:`, err.message);
      }
    }

    // Insert into DB
    if (projectsToInsert.length > 0) {
      await Project.insertMany(projectsToInsert);
      console.log(`\n🎉 Seeded ${projectsToInsert.length} projects!`);
    } else {
      console.log("⚠️ No new projects added.");
    }

    // Close DB
    await mongoose.connection.close();
    console.log("✅ Database closed");
  } catch (err) {
    console.error("❌ Error seeding:", err);
    process.exit(1);
  }
}

seed();
