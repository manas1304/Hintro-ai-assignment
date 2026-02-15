import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB atlas cluster
 * using the URI provided in the environment variables
 */
export default async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connection successful`)
    }catch(err){
        console.error(`Database connection error ${err.message}`);
        process.exit(1);
    }
}