import { useState, useEffect } from "react";
import axiosInstance from "./useAxiosSecure";
import {jwtDecode} from "jwt-decode"; 

const useFetchStudentsData = () => {
    const [studentsData, setStudentsData] = useState(null);
    const [singleStudent, setSingleStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Get token from localStorage
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No token found!");

                // Decode the token to extract 'code'
                const decodedToken = jwtDecode(token);
                console.log(decodedToken,'decode Token');
                const studentCode = decodedToken?.userId;
                if (!studentCode) throw new Error("Invalid token! No student code found.");

                // Fetch multiple endpoints
                const [studentResponse, singleStudentResponse] = await Promise.all([
                    axiosInstance.get(`/students/all`), // Fetch student data
                    axiosInstance.get(`/students/${studentCode}`), // Fetch student results
                    // axiosInstance.get(`/students/${studentCode}/fees`) // Fetch fees if needed
                ]);

                // Set state for fetched data
                console.log(singleStudentResponse,'otherResponse');
                setStudentsData(studentResponse.data);
                setSingleStudent(singleStudentResponse);

            } catch (error) {
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { studentsData, singleStudent, loading, error };
};

export default useFetchStudentsData;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from './useAxiosSecure';

// const useFetchStudentsData = () => {
//     const [NineStudentsData, setNineStudents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [nineStudentsResponse] = await Promise.all([
//                 // const [classEightBatch1Response, classElevenBatch1Response, classEightBatch2Response] = await Promise.all([
//                     axiosInstance.get('/students/all'),
//                     axiosInstance.get('/students/all'),
//                 ]);
//                 setNineStudents(nineStudentsResponse.data);
//             } catch (error) {
//                 setError(error.message || 'Something went wrong');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);
//     console.log(NineStudentsData);
//     return { NineStudentsData,  loading, error };
// };

// export default useFetchStudentsData;
