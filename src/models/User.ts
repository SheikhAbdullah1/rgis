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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // role: {
    //   type: String,
    //   default: "Member",
    //   enum: ["Admin", "Reviewer", "Member"],
    // },
    role: {
      type: String,
      enum: [
        "Admin",
        "Member",
        "User",
      ],
      default: "User",
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
    savedGrants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FundingOpportunity", // ✅ Relational mapping is correct
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Reuse transformation function for both JSON and Object outputs
const dynamicTransform = (_: any, ret: any) => {
  delete ret.password;
  delete ret.resetToken;
  delete ret.resetTokenExpiry;
  return ret;
};

//  Security Lock for normal JSON delivery (API responses)
UserSchema.set("toJSON", { transform: dynamicTransform });

//  Security Lock for internal objects (Server side processing/spread operators)
UserSchema.set("toObject", { transform: dynamicTransform });

export default mongoose.models.User || mongoose.model("User", UserSchema);