import mongoose from 'mongoose';

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Database connection error:", err);
        });
}

export default connectToDB;