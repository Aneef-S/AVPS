import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import App from "../App";

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
    const handleRegistrationForm = async (vehicleNumber,name,phone,position,email) => {
        return await addDoc(collection(firestore, 'registration'), {
            vehicleNumber,
            name,
            phone,
            position,
            email
        })
    };

    const signInUserWithEmailAndPass = async (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    return (
        <FirebaseContext.Provider value={{
            signInUserWithEmailAndPass,
            handleRegistrationForm
            }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

