const express = require("express");

const router = express.Router();

const {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

router.post("/students", addStudent);

router.get("/students", getStudents);

router.get("/students/:id", getStudent);

router.put("/students/:id", updateStudent);

router.delete("/students/:id", deleteStudent);

module.exports = router;