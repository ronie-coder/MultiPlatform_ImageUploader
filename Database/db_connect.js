const mongoose = require('mongoose')

// Connect to MongoDB
const  connectToMongo =async ()=>{
    try {
    
        await mongoose.connect('mongodb://localhost:27017/book');
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('mongodb connection failed: ' ,error);
        process.exit(1)
    }
}



module.exports = connectToMongo
