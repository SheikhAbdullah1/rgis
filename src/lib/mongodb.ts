import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

    export async function connectDB() {
        // 1. If we already have a live, open connection, use it immediately
        if (mongoose.connection.readyState === 1) {
          return mongoose.connection;
        }
        mongoose.connection.on("connected", () => {
          console.log("Mongoose connected");
        });
        
        mongoose.connection.on("error", (err) => {
          console.log("Mongoose error:", err);
        });
        
        mongoose.connection.on("disconnected", () => {
          console.log("Mongoose disconnected");
        });
      
        // 2. If there's no promise, or the connection was dropped (State 0), spin up a new connection
        if (!cached.promise || mongoose.connection.readyState === 0) {
          console.log("Connecting to MongoDB...");
          console.log("Mongo URI:", MONGODB_URI);
      
          cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "rgis",
            serverSelectionTimeoutMS: 5000, // Stops it from hanging endlessly if it fails
            family: 4,
          }).then((mongooseInstance) => mongooseInstance);
        }
      
        try {
          cached.conn = await cached.promise;
        } catch (error) {
          cached.promise = null; // Clear out the broken promise so the next API hit tries fresh
          throw error;
        }
      
        console.log(
          "MongoDB Connected. State:",
          mongoose.connection.readyState
        );
      
        return cached.conn;
      }
    //   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     console.log("Connecting to MongoDB...");

//     cached.promise = mongoose
//       .connect(MONGODB_URI)
//       .then((mongoose) => {
//         console.log(
//           "Mongo Connected:",
//           mongoose.connection.readyState
//         );
//         return mongoose;
//       });
//   }

//   cached.conn = await cached.promise;

//   return cached.conn;