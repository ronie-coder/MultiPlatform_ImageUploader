const mongoose = require("mongoose");

class User {
  constructor() {
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "User Name is required"],
        unique: true,
        trim: true,
        maxLength: [50, "User name cannot exceed 50 characters"],
      },
      email: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
      password: {
        type: String,
        required: [true, "User Password is required"],
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    });

    this.model = mongoose.model("User", userSchema);
  }
}

module.exports = new User().model;
