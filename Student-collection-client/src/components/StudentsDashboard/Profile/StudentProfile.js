import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const goTo = useNavigate()
    const [student, setStudent] = useState({
        image: 'https://i.ibb.co/ynXnSZN/mottalib.jpg', // Placeholder image
        name: 'John Doe',
        classDetails: 'Class 10 - Section A',
        code: 'ST12345',
        result: 'A+',
        feeStatus: 'Paid',
    });

    const handleSetting = ()=>{
        goTo('/student/settings')
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Student Profile</h2>

            <div className="flex flex-col md:flex-row items-center md:items-start">
                {/* Profile Image */}
                <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                    <img
                        src={student.image}
                        alt="Student"
                        className="w-40 h-40 rounded-full border border-gray-300"
                    />
                </div>

                {/* Profile Details */}
                <div className="w-full md:w-2/3">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Name:</h3>
                        <p className="text-gray-600">{student.name}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Class Details:</h3>
                        <p className="text-gray-600">{student.classDetails}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Student Code:</h3>
                        <p className="text-gray-600">{student.code}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Result:</h3>
                        <p className="text-gray-600">{student.result}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">Fee Status:</h3>
                        <p
                            className={`text-lg font-semibold ${
                                student.feeStatus === 'Paid' ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {student.feeStatus}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="mt-6 text-center">
                <button onClick={handleSetting} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-4">
                    Edit Profile
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StudentProfile;
