const multer = require("multer");
const path = require("path");
const AppError = require("../utils/appError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed", 400), false);
  }
};


module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
