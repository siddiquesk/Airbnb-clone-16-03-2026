// backend/cloudServices/Cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer"); // 👈 add this

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "HouseImages",
    allowed_formats: ["png", "jpg", "jpeg", "webp", "avif"],
    resource_type: "image",
  },
});

// 👈 create upload object
const upload = multer({ storage });

module.exports = {
  cloudinary,
  storage,
  upload, // 👈 export it
};