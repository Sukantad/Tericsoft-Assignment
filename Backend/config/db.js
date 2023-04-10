
const dotenv =require('dotenv') ;
const mongoose = require('mongoose')
dotenv.config();
const url=process.env.DATABASE_URL
const ConnectionFn = async () => {
    await mongoose.connect(url);
    console.log("Db connected")
}


module.exports = ConnectionFn;