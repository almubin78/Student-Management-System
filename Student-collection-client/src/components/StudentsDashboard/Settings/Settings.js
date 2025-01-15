import React, { useState } from 'react';

const Settings = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Preview the uploaded image
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mocked logic: Send updated data to the server
        const updatedData = {
            phoneNumber,
            password,
            image,
        };

        console.log('Updated Data:', updatedData);
        alert('Settings updated successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Account Settings</h2>

            <form onSubmit={handleSubmit}>
                {/* Change Phone Number */}
                <div className="mb-4">
                    <label
                        htmlFor="phoneNumber"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Change Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter new phone number"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Change Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Change Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Change Profile Image */}
                <div className="mb-4">
                    <label
                        htmlFor="image"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Update Profile Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    {previewImage && (
                        <div className="mt-4">
                            <img
                                src={previewImage}
                                alt="Profile Preview"
                                className="w-24 h-24 rounded-full border"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
