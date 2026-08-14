import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from "../context/useStudents";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { students, updateStudent } = useStudents();

  const student = students.find(
    (student) => student.id === id
  );

const [formData, setFormData] = useState({
  name: student?.name || "",
  fatherName: student?.fatherName || "",
  age: student?.age || "",
  dob: student?.dob || "",
  city: student?.city || "",
  className: student?.className || "",
  result: student?.result || "",
});

  if (!student) {
    return (
      <div className="page-not-found">
        <h2>Student not found</h2>

        <button onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateStudent(id, {
      ...formData,
      age: Number(formData.age),
      result: Number(formData.result),
    });

    alert("Student updated successfully!");

    navigate("/students");
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update student. Please try again.");
  }
};

  return (
    <div className="add-student-page">

      <div className="page-header">

        <div>
          <h1>Edit Student</h1>
          <p>Update student information</p>
        </div>

      </div>


      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Student Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Father Name</label>

              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="100"
                required
              />
            </div>


            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Class</label>

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
              >
                <option value="">Select class</option>
                <option value="BSCS">BSCS</option>
                <option value="BSIT">BSIT</option>
                <option value="BBA">BBA</option>
                <option value="BSSE">BSSE</option>
              </select>
            </div>


            <div className="form-group">
              <label>Result (%)</label>

              <input
                type="number"
                name="result"
                value={formData.result}
                onChange={handleChange}
                min="0"
                max="100"
                required
              />
            </div>

          </div>


          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStudent;