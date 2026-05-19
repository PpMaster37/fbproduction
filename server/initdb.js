import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('DATABASE CONNECTED');
    } catch (error){
        console.log(error);
    }
}

export default connectDB;