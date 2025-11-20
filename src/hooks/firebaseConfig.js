import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyB5PRG014hVmefXPV0hP5uSC9OouzGXA1Y",
    authDomain: "werweiss-d8c5b.firebaseapp.com",
    projectId: "werweiss-d8c5b",
    storageBucket: "werweiss-d8c5b.firebasestorage.app",
    messagingSenderId: "927198517601",
    appId: "1:927198517601:web:3eb03b18c7bbdac3afcd20",
    measurementId: "G-M2ZFLG77HG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// FIXED: Added 'export' here
export const ARTIFACT_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app';

export default app;