// import axios from 'axios';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgHostKey = process.env.REACT_APP_ImgBB_API_KEY;
    const navigate = useNavigate()

    // const [isAgreed, setIsAgreed] = useState(false);

    const handleAddStudent = async (data) => {

        if (data.myImage[0]) {
            const formData = new FormData();
            formData.append("image", data.myImage[0]);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
                method: "POST",
                body: formData,
            });
            const imgData = await response.json();
            if (imgData.success) {
                console.log("Image uploaded successfully:", imgData.data.url);
                const newStudent = {
                    name: data.studentName,
                    phoneNumber: data.studentNumber,
                    password: data.password,
                    class: data.class,
                    guardianName: data.guardianName,
                    guardianNumber: data.guardianNumber,
                    studentImg: imgData.data.url,
                    studentType: data.studentType,
                    demoEmail: `${data.studentName}.${data.class}@scitech.com`
                }

                await axios.post('http://localhost:5000/v1/student/register', newStudent)
                    .then(data => {
                        if (data.data.payload) {
                            Swal.fire({
                                title: "The Internet?",
                                text: `Congratulation ${data.data.payload.studentName}, Your Registration Successfully Completed!!`,
                                icon: "question"
                            });
                            navigate('/login')
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                console.log("Form data:", newStudent);
            } else {
                console.log("Image upload failed");
            }
        }
    };
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const handleClassSelect = (e) => setSelectedClass(e.target.value);
    const handleSelectBatch = (e) => setSelectedBatch(e.target.value);

    return (
        <div className="max-w-lg mx-auto  shadow-lg rounded-lg p-8 mt-10 bg-slate-500">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Register</h2>
            <p className="text-center text-white mt-4">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-yellow-600 hover:underline"
                >
                    Login
                </Link>
            </p>
            <form onSubmit={handleSubmit(handleAddStudent)} className="space-y-4">

                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">নাম</label>
                    <input
                        type="text"
                        {...register("studentName", { required: "Name is required" })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                    {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="Password"
                        {...register("password")}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Password"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">অভিভাবকের নাম</label>
                    <input
                        type="text"
                        {...register("guardianName")}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Guardian name"
                    />
                    {errors.guardianName && <p className="text-red-500 text-sm">{errors.guardianName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">অভিভাবকের ফোন নাম্বার</label>
                    <input
                        type="text"
                        {...register("guardianNumber", { required: 'Phone Number Must' })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone Number"
                    />
                    {errors.guardianNumber && <p className="text-red-500 text-sm">{errors.guardianNumber.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">তোমার ফোন নাম্বার <span className='text-yellow-900' style={{ fontSize: '10px' }}>(যদি থাকে)</span></label>

                    <input
                        type="text"
                        {...register("studentNumber")}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone Number"
                    />
                    {errors.studentNumber && <p className="text-red-500 text-sm">{errors.studentNumber.message}</p>}
                </div>

                {/* Class Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Class</label>
                    <select
                        {...register("class", { required: "Class selection is required" })}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleClassSelect}
                    >
                        <option value="">Select Class</option>
                        <option value="eight">Class Eight</option>
                        <option value="nine">Class Nine</option>
                        <option value="ten">Class Ten</option>
                        <option value="hsc">HSC</option>
                        <option value="ssc">SSC Batch</option>
                    </select>
                    {errors.class && <p className="text-red-500 text-sm">{errors.class.message}</p>}
                </div>
                {/* Based on Selected Class Show Some Message */}
                {selectedClass === "eight" && (
                    <div className="mt-4 border px-3 py-2 rounded">
                        <div className="text-md mx-auto">Subject(s)</div>
                        <hr />
                        <li className="text-green-600 text-sm mt-3">বিজ্ঞান</li>

                        <li className="text-yellow-600">গনিত</li>
                        <li className="text-green-600 text-sm">Digital Technology <span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(প্রাকটিক্যাল সহ)</span></li>
                        <li className="text-yellow-600">English Grammar<span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px', }}>(basic)</span></li>

                    </div>
                )}
                {selectedClass === "nine" && (
                    <div className="mt-4 border px-3 py-2 rounded text-xl">
                        <div className="text-md mx-auto">Subjects</div>
                        <hr />
                        <li className="text-green-600 text-sm mt-3 font-bold">Physics</li>
                        <li className="text-green-600 text-sm  font-bold">Digital Technology  <span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(প্রাকটিক্যাল সহ)</span></li>

                        <li className="text-green-600 text-sm  font-bold">Math: Make It Easy <span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(Bonus)</span></li>

                    </div>
                )}
                {selectedClass === "ten" && (
                    <div className="mt-4 border px-3 py-2 rounded">
                        <div className="text-md mx-auto">Subjects</div>
                        <hr />
                        <li className="text-green-600 text-sm mt-3">Physics</li>
                        <li className="text-green-600 text-sm">Digital Technology <span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(প্রাকটিক্যাল সহ)</span></li>

                    </div>
                )}
                {selectedClass === "hsc" && (
                    <div className="mt-4 border px-3 py-2 rounded">
                        <div className="text-md mx-auto">Subjects</div>
                        <hr />
                        <li className="text-green-600 text-sm mt-3">Physics</li>
                        <li className="text-green-600 text-sm">ICT <span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(প্রাকটিক্যাল সহ)</span></li>

                    </div>
                )}
                {selectedClass === "ssc" && (
                    <div className="mt-4 border px-3 py-2 rounded">
                        <div className="text-md mx-auto">Subjects</div>
                        <hr />
                        <li className="text-green-600 text-sm mt-3">Physics</li>
                        <li className="text-green-600 text-sm">Digital Technology<span style={{ fontSize: '10px', color: 'pink', marginLeft: '20px' }}>(প্রাকটিক্যাল সহ)</span></li>

                    </div>
                )}

                {/* Batch Selection Based on Class */}
                {selectedClass && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ব্যাচ নির্ধারণ কর</label>
                        <select
                            {...register("studentType")}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleSelectBatch}
                        >
                            <option value="">Select Batch</option>
                            <option value="basic">Basic To Mid-Level</option>
                            <option value="normal">General to Advance</option>
                        </select>
                    </div>
                )}

                {/* Conditional Content for Batch Type */}
                {selectedBatch === "basic" && (
                    <div className="mt-4 border px-3 py-2 rounded" style={{ fontSize: '12px' }}>
                        <p className="text-green-600">প্রতিদিন ২/৩ ঘন্টা প্রাকটিস Must !!</p>
                        <p className="text-yellow-600">মাসিক ফিঃ ৫৫০</p>
                    </div>
                )}
                {selectedBatch === "normal" && (
                    <div className="mt-4 border px-3 py-2 rounded" style={{ fontSize: '12px' }}>
                        <p className="text-green-600">Basic Knowledge Must</p>
                        <p className="text-yellow-600">মাসিক ফিঃ ৫০০</p>
                    </div>
                )}

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    <div className="flex items-center">
                        <input
                            type="file"
                            {...register("myImage", { required: "Image is required" })}
                            className="file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700
                        cursor-pointer
                        w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {errors.myImage && <p className="text-red-500 text-sm mt-1">{errors.myImage.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full py-3 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-600 text-white hover:bg-blue-700"
                >
                    Register
                </button>

                {/* Terms and Conditions Checkbox */}
                {/* <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mr-2"
                        onChange={(e) => setIsAgreed(e.target.checked)} // Update state on change
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the Terms and Conditions
                    </label>
                </div> */}

                {/* Submit Button */}

                {/* <button
                    type="submit"
                    className={`w-full py-3 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isAgreed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    disabled={!isAgreed} // Disable if not agreed
                >
                    Register
                </button> */}

            </form>
        </div>
    );
};

export default Register;
