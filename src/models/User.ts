// import mongoose, { Schema } from "mongoose";

// const UserSchema = new Schema(
//   {
//     name: String,
//     email: {
//       type: String,
//       unique: true,
//     },
//     password: String,
//     role: {
//       type: String,
//       default: "Member",
//       enum: [
//         "Admin",
//         "Reviewer",
//         "Member",
//       ],
//     },
//     resetToken: {
//       type: String,
//     },
    
//     resetTokenExpiry: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default
//   mongoose.models.User ||
//   mongoose.model(
//     "User",
//     UserSchema
//   );


import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Auto lowercase email string to prevent duplicates like Test@test.com
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "Member",
      enum: ["Admin", "Reviewer", "Member"],
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Query alerts security layer: API responses mein password aur tokens ko accidentally load hone se bachane ke liye
UserSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    delete ret.resetToken;
    delete ret.resetTokenExpiry;
    return ret;
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);