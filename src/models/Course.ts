import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: String,

    category: String,

    instructor: String,

    duration: String,

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    image: String,

    price: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "Published",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
