const ImageModel = require("../Models/image");
const Cloudinary_config = require("../Configs/clodinary-config.js");

class ImageController {
  async uploadImage_to_db(req, res) {
    console.log(req.file)
    try {
      //check if file is missing
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file selected",
        });
      }
      const { url, publicId } =await new Cloudinary_config().uploadImage(
        req.file.path
      );
      
      //upload image details to mongodb
      const newImage = await ImageModel.create({
        url: url,
        publicId: publicId,
        uploadedBy: req.decoded_details.id,
      });
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        image: newImage,
      });
    } catch (error) {
      //upload to cloudinary
      console.error(error);
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  }
}
module.exports = ImageController;
