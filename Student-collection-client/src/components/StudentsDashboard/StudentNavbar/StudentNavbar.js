import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpenIcon, CrossIcon, HomeIcon1, LogOutIcon, OpenIcon, ProfileIcon, SettingsIcon } from '../../icons/icon';

const StudentNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    // const handleLogout = () => {
        
    //     navigate('/')

    // };
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/');
    };
    

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">

                {/* Logo & Mobile Menu Icon */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    {/* Mobile Menu Icon */}
                    <div className="md:hidden" onClick={toggleMenu}>
                        {isOpen ? (
                            <CrossIcon className="w-6 h-6 text-red-600 cursor-pointer" />
                        ) : (
                            <OpenIcon className="w-6 h-6 text-white cursor-pointer" />
                        )}
                    </div>
                </div>

                {/* Links */}
                <div
                    className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${
                        isOpen ? 'flex' : 'hidden'
                    } mt-4 md:mt-0`}
                >
                    {/* Home */}
                    <NavLink
                        to="/student"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? 'bg-aqua text-pink-900 bt-2' : 'hover:bg-blue-500'
                            }`
                        }
                    >
                        <HomeIcon1 />
                        মুলপাতা
                    </NavLink>

                    {/* Profile */}
                    <NavLink
                        to="/student/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? 'bg-aqua text-pink-900' : 'hover:bg-blue-500'
                            }`
                        }
                    >
                        <ProfileIcon/>
                        আমার তথ্য
                    </NavLink>

                    {/* Exercise */}
                    <NavLink
                        to="/student/exercise"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? 'bg-aqua text-pink-900' : 'hover:bg-blue-500'
                            }`
                        }
                    >
                        <BookOpenIcon />
                        পড়াশুনা
                    </NavLink>

                    {/* Settings */}
                    <NavLink
                        to="/student/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-md ${
                                isActive ? 'bg-aqua text-pink-900' : 'hover:bg-blue-500'
                            }`
                        }
                    >
                        <SettingsIcon />
                        সেটিংস
                    </NavLink>
                </div>

                {/* Logout */}
                <div className="mt-4 md:mt-0">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-md hover:bg-blue-700"
                    >
                        <LogOutIcon />
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
