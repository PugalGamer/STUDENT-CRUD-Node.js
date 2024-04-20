const mongoose = require("mongoose");
const Student = require("../model/student.model.js");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const students = await Student.create(req.body);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findByIdAndUpdate(id, req.body);
    if (!students) {
      return res.status(404).json({ message: "No student found" });
    }
    const updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Student.findById(id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
