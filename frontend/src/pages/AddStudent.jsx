import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/useStudents";
function AddStudent() {
  const navigate = useNavigate();
const { addStudent } = useStudents();
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    age: "",
    dob: "",
    city: "",
    className: "",
    result: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  addStudent({
    ...formData,
    age: Number(formData.age),
    result: Number(formData.result),
  });

  alert("Student added successfully!");

  navigate("/students");
};

  return (
    <div className="add-student-page">

      <div className="page-header">
        <div>
          <h1>Add Student</h1>
          <p>Add a new student to the system</p>
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
                placeholder="Enter student name"
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
                placeholder="Enter father name"
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
                placeholder="Enter age"
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
                placeholder="Enter city"
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
                placeholder="Enter result"
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
              Add Student
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStudent;