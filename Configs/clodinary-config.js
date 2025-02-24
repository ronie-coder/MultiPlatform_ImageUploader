const cloudinary = require('cloudinary').v2

class Cloudinary{
    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        console.log("✅ Cloudinary configured successfully");
    }
    async uploadImage(filePath){
        try {
            const uploadResult = await cloudinary.uploader.upload(filePath)
            
            return {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = Cloudinary























