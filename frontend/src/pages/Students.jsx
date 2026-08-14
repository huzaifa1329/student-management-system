import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/useStudents";
import "./Students.css";

function Students() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
    const { students, deleteStudent } = useStudents();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.id.toLowerCase().includes(search.toLowerCase()) ||
    student.city.toLowerCase().includes(search.toLowerCase()) ||
    student.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-page">

      <div className="page-header">

        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>

        <button onClick={() => navigate("/add-student")} className="add-student-btn">
          + Add Student
        </button>

      </div>


      <div className="students-card">

        <div className="students-card-header">

          <div>
            <h2>All Students</h2>
            <p>{filteredStudents.length} students found</p>
          </div>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>City</th>
                <th>Class</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>


           <tbody>

  {filteredStudents.length > 0 ? (

    filteredStudents.map((student) => (

      <tr key={student.id}>

        <td>{student.id}</td>

        <td>{student.name}</td>

        <td>{student.fatherName}</td>

        <td>{student.age}</td>

        <td>{student.dob}</td>

        <td>{student.city}</td>

        <td>{student.className}</td>

        <td>{student.result}%</td>

        <td>

          <button
            className="edit-btn"
            onClick={() => navigate(`/edit-student/${student.id}`)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteStudent(student.id)}
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  ) : (

    <tr>
      <td colSpan="9" className="students-empty">
        No students found.
      </td>
    </tr>

  )}

</tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Students;