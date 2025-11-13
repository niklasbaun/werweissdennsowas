import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInAnonymously,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';
// We import the auth and db instances from our new firebase.js file
import { auth, db, ARTIFACT_ID } from '../hooks/firebaseConfig.js';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
// This component will wrap your entire app.
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for auth check

    // This runs once when the provider mounts
    useEffect(() => {
        if (!auth) {
            setLoading(false);
            console.error("Auth not initialized");
            return;
        }

        // Set up the listener for auth state changes
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false); // Auth check is complete
        });

        // Cleanup the listener when the component unmounts
        return unsubscribe;
    }, []);

    // LoginPage function
    const login = async (name) => {
        if (!auth || !db) return;

        try {
            const userCredential = await signInAnonymously(auth);
            const user = userCredential.user;

            // Ensure the user doc exists in Firestore
            const userRef = doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    displayName: name,
                    score: 0,
                    createdAt: serverTimestamp()
                });
            }
            // onAuthStateChanged will handle setting the currentUser state
        } catch (err) {
            console.error("LoginPage failed:", err);
        }
    };

    // Logout function
    const logout = async () => {
        if (!auth) return;
        await signOut(auth);
        // onAuthStateChanged will handle setting currentUser to null
    };

    // The value to pass to all consuming components
    const value = {
        currentUser,
        loading,
        login,
        logout
    };

    // Render the children (the rest of your app) inside the provider
    // Only render children once the initial auth check is done
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// 3. Create a custom hook to use the context
// This makes it easy for other components to get the auth state
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}