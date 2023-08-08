import { Schema, model } from "mongoose";

const programSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
      default: "4 years",
    },

    // Created automatically
    // CSFTY
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // We will push the teachers that are in charge of the programm

    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],

    // We will push the subjects that are in the program when the program is created
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Program = model("Program", programSchema);
