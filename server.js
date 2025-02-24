require("dotenv").config();
const express = require("express");
const connectToDb = require("./Database/db_connect");
const UserRouter = require("./Routes/user-routes");
const ImageRouter = require("./Routes/image-routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectDatabase();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
  }

  initializeRoutes() {
    this.app.use("/api/users", new UserRouter().router);
    this.app.use("/api/images", new ImageRouter().router);
  }

  connectDatabase() {
    connectToDb();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
