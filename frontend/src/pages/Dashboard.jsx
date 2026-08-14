import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/useStudents";

function Dashboard() {
  const [search, setSearch] = useState("");

const { students, loading, error } = useStudents();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h2>{error}</h2>
      </div>
    );
  }

// Total students
const totalStudents = students.length;

// Total unique classes
const totalClasses = new Set(
  students
    .map((student) => student.className)
    .filter(Boolean)
).size;

// Average result
const averageResult =
  students.length > 0
    ? (
        students.reduce(
          (total, student) =>
            total + Number(student.result || 0),
          0
        ) / students.length
      ).toFixed(1)
    : "0.0";

// Total unique cities
const totalCities = new Set(
  students
    .map((student) => student.city)
    .filter(Boolean)
).size;

// Students by class
const classData = [
  "BSCS",
  "BSIT",
  "BBA",
  "BSSE",
].map((className) => ({
  className,
  students: students.filter(
    (student) => student.className === className
  ).length,
}));

// Result distribution
const resultData = [
  { range: "0-49", students: 0 },
  { range: "50-59", students: 0 },
  { range: "60-69", students: 0 },
  { range: "70-79", students: 0 },
  { range: "80-89", students: 0 },
  { range: "90-100", students: 0 },
];

students.forEach((student) => {
  const result = Number(student.result || 0);

  if (result < 50) {
    resultData[0].students++;
  } else if (result < 60) {
    resultData[1].students++;
  } else if (result < 70) {
    resultData[2].students++;
  } else if (result < 80) {
    resultData[3].students++;
  } else if (result < 90) {
    resultData[4].students++;
  } else {
    resultData[5].students++;
  }
});

  // Search students
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => navigate("/add-student")}
        >
          + Add Student
        </button>

      </div>


      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="stat-card">
          <h3>Classes</h3>
          <p>{totalClasses}</p>
        </div>

        <div className="stat-card">
          <h3>Average Result</h3>
          <p>{averageResult}%</p>
        </div>

        <div className="stat-card">
          <h3>Cities</h3>
          <p>{totalCities}</p>
        </div>

      </div>

{/* Charts */}

<div className="charts-container">

  {/* Students By Class */}

  <div className="chart-card">

    <h2>Students by Class</h2>

    <div className="chart-wrapper">

     <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={classData}
    margin={{
      top: 10,
      right: 5,
      left: -10,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="className"
      tick={{ fontSize: 10 }}
    />

    <YAxis
      allowDecimals={false}
      width={25}
      tick={{ fontSize: 10 }}
    />

    <Tooltip />

    <Bar
      dataKey="students"
      name="Students"
    />
  </BarChart>
</ResponsiveContainer>

    </div>

  </div>


  {/* Result Distribution */}

  <div className="chart-card">

    <h2>Result Distribution</h2>

    <div className="chart-wrapper">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
  data={resultData}
  dataKey="students"
  nameKey="range"
  cx="50%"
  cy="42%"
  outerRadius="60%"
  label={{
    fontSize: 10,
  }}
>
  {resultData.map((entry, index) => (
    <Cell key={`cell-${index}`} />
  ))}
</Pie>

          <Tooltip />

          <Legend
  wrapperStyle={{
    fontSize: "10px",
    width: "100%",
  }} />

        </PieChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

      {/* Students Section */}
      <div className="students-section">

        <div className="section-header">

          <h2>Students</h2>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* Students Table */}
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Class</th>
                <th>Result</th>
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
                    <td>{student.city}</td>
                    <td>{student.className}</td>
                    <td>{student.result}%</td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="7">
                    No students found
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

export default Dashboard;