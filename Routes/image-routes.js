const express = require("express");
const ImageController = require("../Controller/image-controller");
const AuthMiddleware = require("../Middlewares/Auth-Middleware");
const UploadMiddleWare = require("../Middlewares/UploadImage-Middleware");
class ImageRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/upload",
      new AuthMiddleware().auth_check,
      new AuthMiddleware().check_if_admin,
      UploadMiddleWare.upload.single("image"),
      new ImageController().uploadImage_to_db
    );
  }
}

module.exports = ImageRouter;
