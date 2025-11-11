import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- Configuration ---
// These globals are provided by the environment.
const ARTIFACT_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app';
const firebaseConfig = {
    apiKey: "AIzaSyB5PRG014hVmefXPV0hP5uSC9OouzGXA1Y",
    authDomain: "werweiss-d8c5b.firebaseapp.com",
    projectId: "werweiss-d8c5b",
    storageBucket: "werweiss-d8c5b.firebasestorage.app",
    messagingSenderId: "927198517601",
    appId: "1:927198517601:web:3eb03b18c7bbdac3afcd20",
    measurementId: "G-M2ZFLG77HG"
};

// --- Initialize Firebase ---
let app, auth, db;

if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} else {
    console.error("Firebase config not found. App cannot initialize.");
}

// Export the services and appId for other files to use
export { auth, db, ARTIFACT_ID };