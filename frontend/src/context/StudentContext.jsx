import { createContext, useEffect, useState } from "react";

import {
  getStudents,
  addStudent as addStudentAPI,
  updateStudent as updateStudentAPI,
  deleteStudent as deleteStudentAPI,
} from "../services/studentService";
import { useNotifications } from "./useNotifications";
const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addNotification } = useNotifications();

  // Fetch students from backend
  const fetchStudents = async () => {
  try {
    const data = await getStudents();

    const formattedStudents = data.map((student) => ({
      ...student,
      mongoId: student._id,
    }));

    setStudents(formattedStudents);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    setError("Failed to load students");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadStudents = async () => {
    await fetchStudents();
  };

  loadStudents();
}, []);

  // Add student
  const addStudent = async (student) => {
    try {
      setError(null);

      // Generate next STU ID
      const nextNumber =
        students.reduce((max, currentStudent) => {
          const number =
            Number(currentStudent.id?.replace("STU", "")) || 0;

          return Math.max(max, number);
        }, 0) + 1;

      const newStudent = {
        ...student,
        id: `STU${String(nextNumber).padStart(3, "0")}`,
      };

      await addStudentAPI(newStudent);

await fetchStudents();

addNotification(
  `Student ${newStudent.name} was added successfully.`,
  "success"
);
    } catch (err) {
      console.error("Failed to add student:", err);
      setError("Failed to add student");
      throw err;
    }
  };

  // Update student
  const updateStudent = async (id, updatedStudent) => {
    try {
      setError(null);

      // Find student using frontend STU ID
      const existingStudent = students.find(
        (student) => student.id === id
      );

      if (!existingStudent) {
        throw new Error("Student not found");
      }

      // Use MongoDB _id for backend update
   await updateStudentAPI(
  existingStudent.mongoId,
  {
    ...updatedStudent,
    id,
  }
);

await fetchStudents();

addNotification(
  `Student ${updatedStudent.name} was updated successfully.`,
  "update"
);
    } catch (err) {
      console.error("Failed to update student:", err);
      setError("Failed to update student");
      throw err;
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      setError(null);

      // Find student using frontend STU ID
      const existingStudent = students.find(
        (student) => student.id === id
      );

      if (!existingStudent) {
        throw new Error("Student not found");
      }

      // Delete using MongoDB _id
      await deleteStudentAPI(existingStudent.mongoId);

      // Get latest data from MongoDB
      await fetchStudents();
      addNotification(
  `Student ${existingStudent.name} was deleted.`,
  "delete"
);
    } catch (err) {
      console.error("Failed to delete student:", err);
      setError("Failed to delete student");
      throw err;
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
        fetchStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export { StudentContext };