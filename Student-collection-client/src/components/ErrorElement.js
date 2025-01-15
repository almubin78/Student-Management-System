import React from 'react';
import { Link } from 'react-router-dom';

const ErrorElement = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Spinner */}
            This page Is under ..............
                            <p>developing</p>
            <div className="relative animate-[spin_5s_linear_infinite] rounded-full h-64 w-64 border-t-4 border-blue-500 border-opacity-75 mb-8">
                {/* Centered Text */}
                
                <div className="absolute inset-0 flex items-center justify-center">

                    <div>
                        <h3 className="text-gray-600 text-lg font-medium animate-pulse">
                            ....
                        </h3>
                    </div>
                </div>
            </div>



            <Link to='/' className="text-center px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg text-sm md:text-lg animate-bounce">
                go back to HOME page
            </Link>
        </div>
    );
};

export default ErrorElement;