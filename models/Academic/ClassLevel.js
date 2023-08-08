import { Schema, model } from "mongoose";

const ClassLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // Student will be added to the class level when they are registered
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

export const ClassLevel = model("ClassLevel", ClassLevelSchema);
