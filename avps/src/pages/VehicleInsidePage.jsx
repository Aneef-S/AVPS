import React from 'react';
import Navbar from '../components/Navbar';
import VehicleDetails from '../components/AllVehicleInside';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const VehicleInsidePage = () => {
    const location = useLocation();

    React.useEffect(() => {
        console.log(location.state);
    }, [location]);

    const heading = location.state?.heading || 'Vehicle Details';

    return (
        <div>
            <Navbar  />
            
            <VehicleDetails heading={location.state}/>
            <Footer />
        </div>
    );
};

export default VehicleInsidePage
