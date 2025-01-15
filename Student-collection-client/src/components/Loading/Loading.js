import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Spinner */}
            <div className="relative animate-[spin_3s_linear_infinite] rounded-full h-64 w-64 border-t-4 border-blue-500 border-opacity-75 mb-8">
                {/* Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center">

                    <div>
                        <h3 className="text-gray-600 text-lg font-medium animate-pulse">
                            Please wait...
                        </h3>
                    </div>
                </div>
            </div>



            <p className="text-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg text-sm md:text-lg animate-bounce">
                Science and Technology
            </p>
        </div>
    );
};

export default Loading;
