const mongoose = require('mongoose')

class Image {
    constructor() {
        const ImageSchema = mongoose.Schema({
            url : {
                type: String,
                required: [true, 'Image URL is required'],
                unique: true,
            },
            publicId : {
                type: String,
                required: [true, 'Image ID in Cloudinary is required'],
            },
            uploadedBy:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User ID is required'],
            }
        },{timestamps: true})
        this.model = mongoose.model('Image', ImageSchema)
    }
}

module.exports = new Image().model