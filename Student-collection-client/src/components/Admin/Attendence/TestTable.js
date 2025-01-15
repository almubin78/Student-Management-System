import React, { useState, useEffect } from "react";
import axiosInstance from "../../../hooks/useAxiosSecure";

const TestTable = () => {
  const [students, setStudents] = useState([]);

  // Fetch the test.json file
  // useEffect(() => {
  //   fetch("/test.json")
  //     .then((res) => res.json())
  //     .then((data) => setStudents(data))
  //     .catch((error) =>
  //       console.error("Error fetching test.json:", error)
  //     );
  // }, []);
  axiosInstance.get('')
  .then(data=>console.log(data))

  // Check if it's the first day of the month and update primaryDue
  useEffect(() => {
    const today = new Date();
    if (today.getDate() === 1) {
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          primaryDue: student.primaryDue + 500,
        }))
      );
    }
  }, []);

  // Handle attendance submission
  const handleAttendanceSubmit = (code, attendance) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.code === code
          ? { ...student, Attendance: [...student.Attendance, attendance] }
          : student
      )
    );
    console.log("Attendance submitted for student code:", code);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Students Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Image</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Code</th>
              <th className="px-4 py-2 border border-gray-300">Gender</th>
              <th className="px-4 py-2 border border-gray-300">Primary Due</th>
              <th className="px-4 py-2 border border-gray-300">Attendance</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.code} className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={student.imgLink}
                    alt="no img found"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">{student.studentName}</td> */}
                <td className="border border-gray-300 px-4 py-2">{student.code}</td>
                <td className="border border-gray-300 px-4 py-2">{student.Gender}</td>
                <td className="border border-gray-300 px-4 py-2">
                  ৳ {student.primaryDue}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    className="border border-gray-300 px-2 py-1 rounded"
                    onChange={(e) =>
                      handleAttendanceSubmit(student.code, e.target.value)
                    }
                  >
                    <option value="">Select Attendance</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() =>
                      console.log(`Submitted attendance for ${student.studentName}`)
                    }
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestTable;
