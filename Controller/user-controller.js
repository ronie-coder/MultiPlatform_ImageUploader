const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
var jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  async registerNewUser(req, res) {
    const { username, email, password } = req.body;
    try {
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      //create access token
      const access_token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        "ronieapp",
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ message: "User logged in successfully", access_token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  async profileAccess(req, res) {
    res.status(200).json({
      message: "Access granted",
      decoded_details: req.decoded_details,
    });
  }
}

module.exports = new UserController();
