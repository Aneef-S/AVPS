import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc,where, getDocs, doc, setDoc, updateDoc,query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2i0nfAdK6_W3nDl7CvXw5oEGiORXvJq4",
    authDomain: "avps-7141c.firebaseapp.com",
    projectId: "avps-7141c",
    storageBucket: "avps-7141c.appspot.com",
    messagingSenderId: "284058549924",
    appId: "1:284058549924:web:5e581d56df2cda06d4b031",
    measurementId: "G-LCTY6YH5PB"
};

const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const FirebaseProvider = (props) => {
    const handleRegistrationForm = async (vehicleNumber, name, phone, position, email) => {
        return await addDoc(collection(firestore, 'registration'), {
            vehicleNumber,
            name,
            phone,
            position,
            email
        });
    };

    const addOrUpdateEntryDetails = async (vehicleNumber) => {
        vehicleNumber = vehicleNumber.toUpperCase();
        // Check if vehicleNumber is in registrations
        const registrationsRef = collection(firestore, 'registration');
        const querySnapshot = await getDocs(registrationsRef);
        const registrationData = querySnapshot.docs.map(doc => doc.data());
        const registration = registrationData.find(registration => registration.vehicleNumber.toLowerCase() === vehicleNumber.toLowerCase());

        if (registration) {
            // Vehicle number found in registrations, check if it exists in entryDetails
            const entryDetailsRef = collection(firestore, 'entryDetails');
            const entryDetailsQuery = await getDocs(entryDetailsRef);
            const entryDetailsData = entryDetailsQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const entryDetails = entryDetailsData.find(entry => entry.vehicleNumber.toLowerCase() === vehicleNumber.toLowerCase());

            if (entryDetails) {
                // Update entryTime in entryDetails
                const entryDocRef = doc(firestore, 'entryDetails', entryDetails.id);
                await updateDoc(entryDocRef, {
                    entryTime: new Date(),
                });
            } else {
                // Add new entry in entryDetails (shouldn't happen based on your requirement)
                console.log(`Vehicle ${vehicleNumber} already has an entry in entryDetails.`);
                return;
            }
        } else {
            // Vehicle number not found in registrations, add new entry in entryDetails
            const entryDetailsRef = collection(firestore, 'entryDetails');
            await addDoc(entryDetailsRef, {
                vehicleNumber,
                entryTime: new Date(),
                position: 'Guest'
            });
        }
    };
    

    const signInUserWithEmailAndPass = async (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const getVehicleNumbers = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'registration'));
        const vehicleNumbers = querySnapshot.docs.map(doc => doc.data().vehicleNumber.toLowerCase());
        return vehicleNumbers;
    };

    const getAllRegistrations = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'registration'));
        const registrations = querySnapshot.docs.map(doc => doc.data());
        return registrations;
    };

    const getEntryDetailsWithRegistrations = async () => {
        try {
            const registrationsQuerySnapshot = await getDocs(collection(firestore, 'registration'));
            const registrationData = registrationsQuerySnapshot.docs.map(doc => doc.data());
    
            const entryDetailsQuerySnapshot = await getDocs(collection(firestore, 'entryDetails'));
            const entryDetails = entryDetailsQuerySnapshot.docs.map(doc => ({
                ...doc.data(),
                entryTime: doc.data().entryTime.toDate() // Convert Firebase timestamp to JavaScript Date object
            }));
    
            // Merge entryDetails with registrations based on vehicleNumber
            const vehicleNumbersSet = new Set(entryDetails.map(entry => entry.vehicleNumber.toLowerCase()));
            const combinedData = registrationData.filter(registration => vehicleNumbersSet.has(registration.vehicleNumber.toLowerCase()))
                .map(registration => ({
                    ...registration,
                    entryTime: entryDetails.find(entry => entry.vehicleNumber.toLowerCase() === registration.vehicleNumber.toLowerCase()).entryTime
                }));
    
            return combinedData;
        } catch (error) {
            console.error("Error fetching entry details with registrations:", error);
            return []; // Return empty array in case of error
        }
    };


    const getGuestsDetails = async () => {
        try {
            // Fetch guest entries from entryDetails
            const guestsQuery = query(collection(firestore, 'entryDetails'), where('position', '==', 'Guest'));
            const querySnapshot = await getDocs(guestsQuery);
            const guestDetails = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                entryTime: doc.data().entryTime.toDate() // Convert Firebase timestamp to JavaScript Date object
            }));
    
            // Fetch all registrations
            const registrationsQuerySnapshot = await getDocs(collection(firestore, 'registration'));
            const registrationData = registrationsQuerySnapshot.docs.map(doc => doc.data());
    
            // Merge guest entries with corresponding registration details
            const combinedGuestDetails = guestDetails.map(guest => {
                const registration = registrationData.find(reg => reg.vehicleNumber.toLowerCase() === guest.vehicleNumber.toLowerCase());
                return {
                    ...guest,
                    ...registration // Merge registration details if available
                };
            });
    
            return combinedGuestDetails;
        } catch (error) {
            console.error("Error fetching guest details:", error);
            return []; // Return empty array in case of error
        }
    };
    

    return (
        <FirebaseContext.Provider value={{
            handleRegistrationForm,
            signInUserWithEmailAndPass,
            addOrUpdateEntryDetails,
            getVehicleNumbers,
            getAllRegistrations,
            getEntryDetailsWithRegistrations,
            getGuestsDetails
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;
