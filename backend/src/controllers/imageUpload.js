import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

// Handle user uploads
export const userUploads = async (req, res) => {
  try {
    const files = req.files; // Files are automatically uploaded to Cloudinary by multer

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    // Extract URLs from the files
    const imagesUrls = files.map(file => file.path); 

    res.status(200).json({
      images: imagesUrls,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Export multer middleware for routes
export const uploadMiddleware = upload.array("images", 10);
