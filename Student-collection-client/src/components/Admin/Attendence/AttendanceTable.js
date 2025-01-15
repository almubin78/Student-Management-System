import React, { useEffect, useState } from "react";
import axiosInstance from "../../../hooks/useAxiosSecure";

const AttendanceTable = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
console.log(studentsData,attendanceData,filteredData,presentStudents,'studentsData,attendanceData,filteredData,presentStudents');
  useEffect(() => {
    const fetchAttendance = async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      try {
        const res = await axiosInstance.get(`/attendance/records?date=${currentDate}`);
        const { students, attendance } = res.data;

        setStudentsData(students);

        const present = attendance
          .filter((record) => record.status === "Present")
          .map((record) => record.studentId);

        setPresentStudents(
          students.filter((student) => present.includes(student.code))
        );

        setFilteredData(
          students.filter((student) => !present.includes(student.code))
        );
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = studentsData.filter((student) =>
      student.studentName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusChange = (studentId, status) => {
    if (status === "Present") {
      const updatedStudent = filteredData.find((student) => student.code === studentId);
      setFilteredData(filteredData.filter((student) => student.code !== studentId));
      setPresentStudents([...presentStudents, updatedStudent]);
    } else {
      const updatedStudent = presentStudents.find((student) => student.code === studentId);
      setPresentStudents(presentStudents.filter((student) => student.code !== studentId));
      setFilteredData([...filteredData, updatedStudent]);
    }

    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSave = async () => {
    const attendancePayload = Object.entries(attendanceData).map(([studentId, status]) => ({
      studentId,
      date: new Date().toISOString().split("T")[0],
      status,
    }));

    try {
      await axiosInstance.post("/attendance/save", attendancePayload);
      alert("Attendance saved successfully!");
      setAttendanceData({});
    } catch (error) {
      console.error("Error saving attendance in post('/attendance/save':)", error.response.data.error);
    }

  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-700">Attendance Records</h2>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by Student Name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Present Students */}
      <h3 className="text-lg font-semibold text-gray-600">Present Students</h3>
      <table className="w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {presentStudents.map((student) => (
            <tr key={student.code}>
              <td className="p-2 border text-center">
                <img
                  src={student.imgLink || "https://via.placeholder.com/50"}
                  alt={student.studentName}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 border">{student.studentName}</td>
              <td className="p-2 border text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleStatusChange(student.code, "Absent")}
                >
                  Mark Absent
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button moved here */}
      <div className="mt-4 text-right">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Save Attendance
        </button>
      </div>


      {/* Students */}
      <h3 className="text-lg font-semibold text-gray-600 mt-6">Students</h3>
      <table className="w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student) => (
            <tr key={student.code}>
              <td className="p-2 border text-center">
                <img
                  src={student.imgLink || "https://via.placeholder.com/50"}
                  alt={student.studentName}
                  className="w-10 h-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 border">{student.studentName}</td>
              <td className="p-2 border text-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleStatusChange(student.code, "Present")}
                >
                  Mark Present
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Button */}
      <div className="mt-4 text-right">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;

