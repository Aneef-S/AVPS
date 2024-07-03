// Navbar.jsx

import { useState } from 'react';
//import logo from '../assets/react.svg'; // Replace with your logo path
import { Link } from 'react-router-dom';
import logoImg from '../imgs/av.png'
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logoImg} alt="Logo" className="h-8 mr-2" />
                    <span className="text-white font-bold text-lg">AVPS</span>
                </div>
                <div className="hidden md:flex space-x-4 items-center">

                    <Link to="/Home">
                        <div className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</div>
                    </Link>

                    <Link to="/Registration">
                        <div className="text-white hover:bg-gray-700 px-3 py-2 rounded">Register User</div>
                    </Link>

                    <Link to="https://github.com/anandnair10/AVPS">
                        <div className="text-white hover:bg-gray-700 px-3 py-2 rounded">Services</div>
                    </Link>

                    <Link to="/">
                        <div className="text-white hover:bg-gray-700 px-3 py-2 rounded">Logout</div>
                    </Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2">
                    <a href="/Home" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a>
                    <a href="/Registration" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Register User</a>
                    <a href="/services" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Services</a>
                    <a href="/" className="block text-white hover:bg-gray-700 px-3 py-2 rounded">Logout</a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
