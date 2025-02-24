const multer = require("multer");
const path = require("path");

class UploadMiddleware {
  constructor() {
    this.upload = multer({
      storage: this.configureStorage(),
      fileFilter: this.checkFileFilter,
      limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
    });
  }

  // Storage Configuration
  configureStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save to "uploads/" directory
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
  }

  // File Type Filtering
  checkFileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG format allowed!"));
    }
  }
}


module.exports = new UploadMiddleware();
