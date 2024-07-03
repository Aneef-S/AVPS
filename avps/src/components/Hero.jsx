import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useFirebase } from "../context/Firebase";

const socket = io("http://localhost:5000");

function Hero() {
  const { getVehicleNumbers, addOrUpdateEntryDetails } = useFirebase();
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [detectedText, setDetectedText] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const fetchVehicleNumbers = async () => {
      try {
        const numbers = await getVehicleNumbers();
        setVehicleNumbers(numbers);
      } catch (error) {
        console.error("Error fetching vehicle numbers:", error);
      }
    };

    fetchVehicleNumbers();
  }, [getVehicleNumbers]);

  useEffect(() => {
    socket.on("text_detected", async (data) => {
      setDetectedText(data.text);
      const temp = vehicleNumbers.includes(data.text); // Check if detected text is in vehicleNumbers
      setIsPresent(temp);
      if (temp) {
        try {
          await addOrUpdateEntryDetails(data.text);
          console.log(`Added or updated entry for vehicleNumber: ${data.text.toUpperCase()}`);
        } catch (error) {
          console.error("Error adding or updating entry:", error);
        }
      }
    });

    return () => {
      socket.off("text_detected");
    };
  }, [vehicleNumbers, addOrUpdateEntryDetails]);

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error verifying:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold mb-10">
              AUTOMATED VEHICLE PASS SYSTEM
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Link to={{ pathname: "/VehicleInside" }} state="Vehicle Inside">
                <div className="bg-blue-200 text-blue-900 p-4 rounded-lg shadow-lg">
                  <p className="text-sm">Vehicles Inside</p>
                  <p className="text-4xl font-bold">123</p>
                </div>
              </Link>
              <Link to={{ pathname: "/VehicleList" }} state="All Registrations">
                <div className="bg-green-200 text-green-900 p-4 rounded-lg shadow-lg">
                  <p className="text-sm">All Registrations</p>
                  <p className="text-4xl font-bold">456</p>
                </div>
              </Link>
              <Link to={{ pathname: "/VehicleList" }} state="Guests Inside">
                <div className="bg-yellow-200 text-yellow-900 p-4 rounded-lg shadow-lg">
                  <p className="text-sm">Guests Inside</p>
                  <p className="text-4xl font-bold">789</p>
                </div>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link to="/Registration">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 text-xl font-bold mb-8">
                  Admit Guest
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link to="/Edit">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 text-xl font-bold mb-8">
                  Edit Users
                </button>
              </Link>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"></div>
          </div>
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="flex justify-center">
              <button
                onClick={handleVerify}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 text-xl font-bold mb-8"
              >
                VERIFY
              </button>
            </div>
            <div className="flex justify-center">
              <p>Detected Text: {detectedText}</p>
            </div>
            <div className="flex justify-center">
              <p>
                {isPresent
                  ? "Text is present in the list."
                  : "Text is not present in the list."}
              </p>
            </div>
            <div>
              <h1>Vehicle Numbers</h1>
              <ul>
                {vehicleNumbers.map((number, index) => (
                  <li key={index}>{number}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
