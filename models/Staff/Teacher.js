import { Schema, model } from "mongoose";

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateEployeed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
      drequired: true,
      default: function () {
        return (
          "TEA" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    //  If Withdrawn, Teacher will not be not able to login
    isWitdrawn: {
      type: Boolean,
      default: false,
    },
    //  If Supended, Teacher will be able to login but can not perform the task
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: "Subject",
      // required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    program: {
      type: String,
    },
    // Teacher can teach more than one classlevel
    classLevel: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    examCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      // required: true,
    },
    academicTerm: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Teacher = model("Teacher", TeacherSchema);
