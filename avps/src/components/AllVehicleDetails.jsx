import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const VehicleDetails = (props) => {
  const { getAllRegistrations } = useFirebase();
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      const data = await getAllRegistrations();
      setVehicleData(data);
    };

    fetchVehicleData();
  }, [getAllRegistrations]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-50 pb-5">{props.heading}</h1>
      <div className="flex-grow justify-center items-center overflow-x-auto rounded-xl">
        <table className="min-w-full bg-gray-800 border border-gray-900 ">
          <thead>
            <tr className="bg-gray-500 text-gray-50 uppercase text-lg leading-normal">
              <th className="py-4 px-6 text-left">Owner ID</th>
              <th className="py-4 px-6 text-left">Owner</th>
              <th className="py-4 px-6 text-left">Vehicle Number</th>
              <th className="py-4 px-6 text-left">Entry Time</th>
              <th className="py-4 px-6 text-left">Exit Time</th>
              <th className="py-4 px-6 text-left">Type</th>
            </tr>
          </thead>
          <tbody className="text-gray-50 text-lg font-light">
            {vehicleData.map((vehicle, index) => (
              <tr key={index} className="border-b border-gray-900 hover:bg-gray-600 hover:text-white">
                <td className="py-4 px-6 text-left whitespace-nowrap">{index || '0'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{vehicle.name || 'Unknown Owner'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{vehicle.vehicleNumber || 'Unknown Number'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{vehicle.entryTime || 'N/A'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{vehicle.exitTime || 'N/A'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{vehicle.position || 'Unknown Type'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleDetails;
