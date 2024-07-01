import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoginRegister = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-800">
            <h1 className="text-5xl font-bold font-mono text-white ">Welcome to Our Platform!</h1>
            <div className="relative w-96 h-96 border border-white backdrop-blur-lg bg-transparent rounded-lg flex items-center shadow-md mt-20">
                <div className="w-full p-10">
                    <form action="">
                        <h1 className="text-2xl font-bold text-center text-gray-100 mb-8">Login</h1>
                        <div className="relative border border-white rounded-full w-full h-12 mb-6">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                required 
                                className="w-full h-full bg-transparent border-none outline-none rounded-full text-base text-white pl-5 pr-10"
                            />
                            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-white" />
                        </div>
                        <div className="relative border border-white rounded-full w-full h-12 mb-6">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                required 
                                className="w-full h-full bg-transparent border-none outline-none rounded-full text-base text-white pl-5 pr-10"
                            />
                            <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-white" />
                        </div>
                        <Link to='/Home'>
                            <button 
                                type="submit" 
                                className="w-full h-11 bg-white border border-gray-100 rounded-full shadow-lg text-base font-bold text-black hover:bg-gray-200"
                            >
                                Login
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
