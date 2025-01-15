import React from 'react';


const StudentFooter = () => {
    return (
        <footer className="bg-blue-600 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo/Brand Name */}
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold">Science and Technology</h1>
                    <p className="text-sm">Empowering students for a better future</p>
                </div>

                {/* Quick Links */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-medium underline">Quick Links</h2>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <a href="/student" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/student/profile" className="hover:underline">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="/student/settings" className="hover:underline">
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="/student/exercise" className="hover:underline">
                                Exercises
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-lg underline font-medium">Follow Me</h2>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            {/* <FacebookIcon className="w-6 h-6 hover:text-blue-300" /> */}
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            {/* <TwitterIcon className="w-6 h-6 hover:text-blue-300" /> */}
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            {/* <LinkedInIcon className="w-6 h-6 hover:text-blue-300" /> */}
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            {/* <InstagramIcon className="w-6 h-6 hover:text-blue-300" /> */}
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm mt-6">
                © {new Date().getFullYear()} Science and Technology. All rights reserved.
            </div>
        </footer>
    );
};

export default StudentFooter;
