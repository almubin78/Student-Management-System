import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../../hooks/useAxiosSecure";

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handlePhoneNumberBlur = async () => {
        try {
            const response = await axiosInstance.get("/students/all");
            // const response = await axios.get("http://localhost:5000/students/all");
            const students = response.data;
            // console.log(students);
            const student = students.find(
                (stu) => stu.phoneNumber === parseInt(phoneNumber, 10)
            );

            if (student) {
                setSelectedStudent(student); // Save the matched student
                setError(""); // Clear error if phone number is valid
            } else {
                setSelectedStudent(null); // Clear previously selected student
                setError("Phone number not found in database.");
            }
        } catch (err) {
            console.error("Error fetching student data:", err);
            setError("An error occurred while validating the phone number.");
        }
    };
    // console.log(selectedStudent,'==this is selected');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!selectedStudent) {
            setError("Please enter a valid phone number first.");
            return;
        }
    
        if (password === selectedStudent.password) {
            const res = await axiosInstance.post('/students/createStudent', selectedStudent);
            localStorage.setItem("authToken", res.data.token); // Store token
            localStorage.setItem("userRole", selectedStudent.roll); // Store role
    
            if (selectedStudent.roll === "admin") {
                navigate("/admin");
            } else if (selectedStudent.roll === "student") {
                navigate("/student");
            } else {
                setError("Invalid user role.");
            }
        } else {
            setError("Invalid credentials.");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login to Your Account
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="phoneNumber"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onBlur={handlePhoneNumberBlur}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                        >
                            {passwordVisible ? (

                                <p className="text-yellow-200 opacity-75 bg-black px-2 py-1 rounded">Hide Password</p>
                            ) : (
                                <p className="text-yellow-200 opacity-75 bg-black px-2 py-1 rounded">Show pass</p>

                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
