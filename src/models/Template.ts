import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    category: String,

    file: String,

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);
