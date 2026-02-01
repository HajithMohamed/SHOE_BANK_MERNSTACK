const cloudinary = require("../Config/cloudinary-config");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    throw error;
  }
};

module.exports = uploadToCloudinary;
