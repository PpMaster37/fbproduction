import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1/productiondb");
        console.log('DATABASE CONNECTED');
    } catch (error){
        console.log(error);
    }
}

export default connectDB;