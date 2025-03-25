// lib/dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Extend global to include a Mongoose cache
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    } | undefined;
}

let cache = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cache;


if (!cache) {
    cache = global.mongooseCache = {conn: null, promise: null};
}

async function connectToDB(): Promise<mongoose.Connection> {
    if (cache.conn) {
        // Use the cached connection
        return cache.conn;
    }

    if (!cache.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        };

        cache.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => mongooseInstance.connection);
    }

    try {
        cache.conn = await cache.promise;
    } catch (error) {
        cache.promise = null;
        throw new Error("MongoDB connection failed: " + (error as Error).message);
    }

    return cache.conn;
}

export default connectToDB;
