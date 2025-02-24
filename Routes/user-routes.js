const express = require("express");
const UserController = require("../Controller/user-controller");
const AuthMiddleware = require("../Middlewares/Auth-Middleware");

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/register", UserController.registerNewUser);
    this.router.get("/login", UserController.loginUser);
    this.router.get(
      "/profile",
      new AuthMiddleware().auth_check,
      UserController.profileAccess
    );
    this.router.get(
      "/profile/admin",
      new AuthMiddleware().auth_check, // Ensure auth_check is called first
      new AuthMiddleware().check_if_admin,
      UserController.profileAccess
    );
  }
}

module.exports = UserRouter;
