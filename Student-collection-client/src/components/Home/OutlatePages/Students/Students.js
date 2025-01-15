import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Loading/Loading';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/v1/student/all');
            setStudents(response.data.payload);
        } catch (error) {
            console.error('Error fetching students:', error.message);
        } finally {
            setIsLoading(false); // Set loading to false after the request
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Registered Students</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {students.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {students.map((student, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                    {/* Student Image */}
                                    <img
                                        src={student.studentImg}
                                        alt={student.studentName}
                                        className="h-40 w-40 mx-auto rounded-full object-cover mb-4"
                                    />
                                    {/* Student Info */}
                                    <div className="text-center">
                                        <h3 className="text-xl font-semibold text-gray-800">{student.studentName}</h3>
                                        <p className="text-gray-600">Class: {student.class}</p>
                                        <p className="text-gray-600">Guardian: {student.guardianName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <p className='text-red-300'>
                            No student found!! 
                        </p>
                    }

                </>
            )}
        </div>
    );
};

export default Students;
