import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CrossIcon, OpenIcon } from '../../icons/icon';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(true);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {
                user ? <nav className="bg-blue-600 text-white shadow-md opacity-90">
                    <div className="container mx-auto md:flex justify-between items-center px-4 py-3 md:py-4">




                        {/* Mobile Menu Icon */}
                        <div className="md:hidden mt-3" onClick={toggleMenu}>
                            {isOpen ?
                                <CrossIcon className="w-6 h-6 bold text-red-600 cursor-pointer bg-slate-100 rounded" />

                                : <OpenIcon className="w-6 h-6 text-pink-800 rounded bg-slate-300 cursor-pointer" />}
                        </div>

                        {/* Links */}
                        <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${isOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
                            <div className='flex items-center justify-start'>

                                <span></span>
                                <Link to="/" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    মুলপাতা
                                </Link>
                            </div>
                            <div className='flex items-center justify-start'>

                                <Link to="/courses" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    কোর্স সমূহ
                                </Link>
                            </div>
                            <div className='flex items-center justify-start'>

                                <Link to="/login" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                    Login
                                </Link>
                            </div>



                        </div>

                    </div>
                </nav>
                    :
                    <nav className="bg-blue-600 text-white shadow-md opacity-90">
                        <div className="container mx-auto md:flex justify-between items-center px-4 py-3 md:py-4">

                            {/* Mobile Menu Icon */}
                            <div className="md:hidden mt-3" onClick={toggleMenu}>
                                {isOpen ?
                                    <CrossIcon className="w-6 h-6 bold text-red-600 cursor-pointer bg-slate-100 rounded" />

                                    : <OpenIcon className="w-6 h-6 text-pink-800 rounded bg-slate-300 cursor-pointer" />}
                            </div>

                            {/* Links */}
                            <div className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${isOpen ? 'flex' : 'hidden'} mt-4 md:mt-0`}>
                                <div className='flex items-center justify-start'>

                                    <span></span>
                                    <Link to="/student" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                        Student
                                    </Link>
                                </div>
                                <div className='flex items-center justify-start'>

                                    <Link to="/admin" className="px-4 py-2 hover:bg-blue-500 rounded-md md:ml-4">
                                        Admin
                                    </Link>
                                </div>
                                



                            </div>

                        </div>
                    </nav>
            }
        </>
    );
};

export default Navbar;