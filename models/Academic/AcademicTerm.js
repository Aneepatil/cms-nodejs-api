import { Schema, model } from "mongoose";

const AcademicTermSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      // required: true,
      default:"3 months"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export const AcademicTerm = model("AcademicTerm", AcademicTermSchema);
