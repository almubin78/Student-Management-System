import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './useAxiosSecure';

const useFetchStudentsData = () => {
    const [NineStudentsData, setNineStudents] = useState([]);
    // const [hscStudentsBatch1, setHscStudentsBatch1] = useState([]);
    // const [eightStudentsBatch2, setEightStudentsBatch2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [nineStudentsResponse] = await Promise.all([
                // const [classEightBatch1Response, classElevenBatch1Response, classEightBatch2Response] = await Promise.all([
                    axiosInstance.get('/students/all'),
                    // axios.get('PrivateServer.HscStudents.json'),
                    // axios.get('PrivateServer.PreviousStudents.json')
                ]);
                setNineStudents(nineStudentsResponse.data);
                // setHscStudentsBatch1(classElevenBatch1Response.data);
                // setEightStudentsBatch2(classEightBatch2Response.data);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(NineStudentsData);
    return { NineStudentsData,  loading, error };
};

export default useFetchStudentsData;
