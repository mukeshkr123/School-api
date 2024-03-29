const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
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
    academicYears: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
    academicTerms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerm",
      },
    ],
    yearGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "YearGroup",
      },
    ],
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classLevel",
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    studens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// verify password
adminSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
