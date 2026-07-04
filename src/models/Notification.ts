import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    message: String,

    type: {
      type: String,
      enum: ["Proposal", "Membership", "Funding", "System"],
      default: "System",
    },

    read: {
      type: Boolean,
      default: false,
    },

    link: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
