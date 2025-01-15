import React from 'react';
import AttendanceTable from './AttendanceTable';
import TestTable from './TestTable';

const AttendanceHome = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* <TestTable/> */}
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Attendance Management System
        </h1>
        <AttendanceTable />
      </div>
    </div>
    );
}

export default AttendanceHome;