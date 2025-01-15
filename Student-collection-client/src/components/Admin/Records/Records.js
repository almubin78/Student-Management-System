import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../hooks/useAxiosSecure';

const Records = () => {
  const [recordStudentsData, setRecordStudentsData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axiosInstance.get('/records/get-record');
        const {records,allStudents} = res.data; 
        setRecordStudentsData(records.map(student=>student));
      } catch (error) {
        console.error('Error fetching attendance records:', error.response?.data?.error);
      }
    };

    fetchAttendance();
  }, []);

  const calculateTotalResult = (examResult) => {
    return Object.values(examResult).reduce((total, score) => total + score, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Records</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recordStudentsData.map((student) => {
          const januaryData = student.month.january;
          const totalResult = calculateTotalResult(januaryData.examResult);
          const totalDays = student.previousStatus.totalDays;
          const totalPresent = student.previousStatus.totalPresent;
          const totalAbsent = totalDays - totalPresent;

          return (
            <div
              key={student._id}
              className="card border p-4 shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => console.log(`Fetch full data for student code: ${student.studentCode}`)}
            >
              <h3 className="text-xl font-bold mb-2">Student Code: {student.studentCode}</h3>
              <p className="mb-1">Total Exam Result (January): {totalResult}</p>
              <p className="mb-1">Total Present: {totalPresent}</p>
              <p className="mb-1">Total Absent: {totalAbsent}</p>
              <p>Total Days: {totalDays}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Records;
