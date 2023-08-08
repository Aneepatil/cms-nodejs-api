import { Schema, model } from "mongoose";
import CryptoJS from "crypto-js";

const adminSchema = new Schema(
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
    role: {
      type: String,
      default: "admin",
    },
    academicTerms: [{
      type: Schema.Types.ObjectId,
      ref: "AcademicTerm",
    }],
    programs: [{
      type: Schema.Types.ObjectId,
      ref: "Program",
    }],
    academicYears: [{
      type: Schema.Types.ObjectId,
      ref: "AcademicYear",
    }],
    yearGroups: [{
      type: Schema.Types.ObjectId,
      ref: "YearGroup",
    }],
    classLevels: [{
      type: Schema.Types.ObjectId,
      ref: "ClassLevel",
    }],
    teachers: [{
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    }],
    students: [{
      type: Schema.Types.ObjectId,
      ref: "Student",
    }],
  },
  { timestamps: true }
);


export const Admin = model("Admin", adminSchema);
