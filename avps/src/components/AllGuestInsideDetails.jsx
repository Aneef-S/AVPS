import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const AllGuestInsideDetails = (props) => {
  const { getGuestsDetails } = useFirebase();
  const [guestData, setGuestData] = useState([]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const data = await getGuestsDetails();
        setGuestData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching guest details:', error);
      }
    };

    fetchGuestData();
  }, [getGuestsDetails]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-50 pb-5">{props.heading}</h1>
      <div className="flex-grow justify-center items-center overflow-x-auto rounded-xl">
        <table className="min-w-full bg-gray-800 border border-gray-900">
          <thead>
            <tr className="bg-gray-500 text-gray-50 uppercase text-lg leading-normal">
              <th className="py-4 px-6 text-left">Owner ID</th>
              <th className="py-4 px-6 text-left">Owner</th>
              <th className="py-4 px-6 text-left">Vehicle Number</th>
              <th className="py-4 px-6 text-left">Entry Time</th>
              <th className="py-4 px-6 text-left">Exit Time</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Number</th>
              <th className="py-4 px-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-50 text-lg font-light">
            {guestData.map((guest, index) => (
              <tr key={index} className="border-b border-gray-900 hover:bg-gray-600 hover:text-white">
                <td className="py-4 px-6 text-left whitespace-nowrap">{index + 1 || '0'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{guest.name || 'Unknown Owner'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{guest.vehicleNumber || 'Unknown Number'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{formatDate(guest.entryTime)}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{formatDate(guest.exitTime)}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{guest.position || 'Guest'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{guest.phone || 'N/A'}</td>
                <td className="py-4 px-6 text-left whitespace-nowrap">{guest.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllGuestInsideDetails;
