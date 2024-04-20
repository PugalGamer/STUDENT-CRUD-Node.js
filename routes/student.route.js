const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
} = require("../controller/student.controller.js");

router.get("/", getStudents);

router.post("/", createStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

router.get("/:id", getStudent);

module.exports = router;
