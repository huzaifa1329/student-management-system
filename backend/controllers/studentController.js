const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const addStudent = async (req, res) => {

    const result = await getDB()
        .collection("students")
        .insertOne(req.body);

    res.json({
        message: "Student Added Successfully",
        result
    });

};

const getStudents = async (req, res) => {

    const students = await getDB()
        .collection("students")
        .find()
        .toArray();

    res.json(students);

};

const getStudent = async (req, res) => {

    const student = await getDB()
        .collection("students")
        .findOne({
            _id: new ObjectId(req.params.id)
        });

    res.json(student);

};

const updateStudent = async (req, res) => {

    const result = await getDB()
        .collection("students")
        .updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: req.body
            }
        );

    res.json({
        message: "Student Updated Successfully",
        result
    });

};

const deleteStudent = async (req, res) => {

    const result = await getDB()
        .collection("students")
        .deleteOne({
            _id: new ObjectId(req.params.id)
        });

    res.json({
        message: "Student Deleted Successfully",
        result
    });

};

module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
};