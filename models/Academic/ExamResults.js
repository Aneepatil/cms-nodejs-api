import { Schema, model } from "mongoose";

//exam result schema
const examResultSchema = new Schema(
  {
    studentID: {
      type:String,
      required: true,
    },
    exam: {
      type: String,
      ref: "Exam",
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    answeredQuestions:[
      {
        type:Object
      }
    ],
    //failed/Passed
    status: {
      type: String,
      required: true,
      enum: ["Fail", "Pass"],
      default: "Fail",
    },
    //Excellent/Good/Poor
    remarks: {
      type: String,
      required: true,
      enum: ["Excellent", "Very Good","Good", "Poor","Fair"],
      default: "Poor",
    },
    // position: {
    //   type: Number,
    //   required: true,
    // },

    // subject: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Subject",
    // },
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
      required: true,
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ExamResult = model("ExamResult", examResultSchema);
