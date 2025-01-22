import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI).then(res => {
        console.log('DB connected');
    }).catch(err => {
        console.log('failed to connect to the database', err);
    }
    )
}

export default connectDB;