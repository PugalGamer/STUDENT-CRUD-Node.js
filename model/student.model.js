const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
