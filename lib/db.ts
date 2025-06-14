import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let chached = global.mongoose;
if (!chached) {
    chached = global.mongoose = { conn: null, promise: null };
};

export async function connectionToDatabase() {
    if (chached.conn) {
        return chached.conn;
    }

    if (!chached.promise) {
        const opts={
            bufferCommands: true, 
            maxPoolSize: 10,
        }
        chached.promise = mongoose.connect(MONGODB_URI,opts).then(() => mongoose.connection);
    }

    try {
        chached.conn = await chached.promise;
        
    } catch (error:Object | any) {
        chached.promise = null;
        throw new Error("Failed to connect to the database",error);
    }

    return chached.conn;
}
