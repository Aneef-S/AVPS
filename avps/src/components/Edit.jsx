import React, { useState } from "react";
//import './registration.css';

const Edit = () => {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = (event) => {
        const data1 = {
            vehicleNumber,
            name,
            phone,
            email,
        };

        const localStorageData = JSON.parse(localStorage.getItem("users_data")) || [];
        const ans = [data1, ...localStorageData];
        localStorage.setItem("users_data", JSON.stringify(ans));
        alert('Registration successful');
        
        setVehicleNumber("");
        setName("");
        setPhone("");   
        setEmail("");
        window.location.reload();
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-100 w-96 h-auto rounded-lg shadow-lg p-10 relative ">
                <h1 className="text-center text-xl font-bold mb-4">Edit Users</h1>
                <form onSubmit={e => { e.preventDefault(); handleRegister(e); }}>
                    <hr className="mb-4 opacity-30" />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        className="w-full h-10 mb-4 rounded-lg pl-3 border-none shadow-md focus:outline-none"
                    />
                    <input
                        type="text"
                        name="rcnum"
                        id="rcnum"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="Vehicle Registration Number"
                        required
                        className="w-full h-10 mb-4 rounded-lg pl-3 border-none shadow-md focus:outline-none"
                    />
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile number"
                        required
                        className="w-full h-10 mb-4 rounded-lg pl-3 border-none shadow-md focus:outline-none"
                    />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full h-10 mb-4 rounded-lg pl-3 border-none shadow-md focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white w-full h-10 rounded-lg mt-4 shadow-md hover:bg-green-400"
                    >
                        CHANGE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
