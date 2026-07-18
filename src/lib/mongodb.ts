// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI");
// }

// console.log("MONGODB_URI =", process.env.MONGODB_URI);

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

// export async function connectDB() {
//   // 1. If we already have a live, open connection, use it immediately
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection;
//   }
//   mongoose.connection.on("connected", () => {
//     // console.log("Mongoose connected");
//   });

//   mongoose.connection.on("error", (err) => {
//     // console.log("Mongoose error:", err);
//   });

//   mongoose.connection.on("disconnected", () => {
//     // console.log("Mongoose disconnected");
//   });

//   // 2. If there's no promise, or the connection was dropped (State 0), spin up a new connection
//   if (!cached.promise || mongoose.connection.readyState === 0) {
//     // console.log("Connecting to MongoDB...");
//     // console.log("Mongo URI:", MONGODB_URI);
//   try {
//     cached.conn = await cached.promise;
//   }
//   catch (error) {
//     cached.promise = null; // Clear out the broken promise so the next API hit tries fresh
//     throw error;
//   }

//   console.log("MongoDB Connected. State:", mongoose.connection.readyState);

//   return cached.conn;
// }

// export default connectDB;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

console.log("MONGODB_URI =", MONGODB_URI);

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Create a new connection if needed
  if (!cached.promise || mongoose.connection.readyState === 0) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "rgis",
      family: 4,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      autoIndex: true,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  console.log("MongoDB Connected. State:", mongoose.connection.readyState);

  return cached.conn;
}

export default connectDB;
