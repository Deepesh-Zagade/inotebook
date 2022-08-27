const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/inotebook?'

const connecttomongo =  ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfuly")
    })
}

module.exports = connecttomongo;
