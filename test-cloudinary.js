require("dotenv").config();
const Cloudinary = require("./Configs/clodinary-config"); // Adjust path

async function testUpload() {
  const cloudinary = new Cloudinary();
  const result = await cloudinary.uploadImage("./test-image.jpg"); // Replace with a real image path

  console.log("Upload Result:", result);
}

testUpload();
