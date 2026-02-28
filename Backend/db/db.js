const mongoose  = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log("Connected to MongoDB");
    })
}