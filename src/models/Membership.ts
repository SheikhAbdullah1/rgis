import mongoose, { Schema } from "mongoose";

const MembershipSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: String,
    email: String,
    phone: String,
    organization: String,
    membershipType: {
      type: String,
      enum: ["Student", "Researcher", "Institution"],
    },
    amount: Number,
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    status: {
      type: String,
      default: "Pending",
    },
    expiryDate: Date,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Membership ||
  mongoose.model("Membership", MembershipSchema);
