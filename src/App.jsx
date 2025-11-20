import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./hooks/firebaseConfig.js";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import { useEffect, useState } from "react";

function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    // FIXED: Added loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false); // FIXED: Stop loading once we know the status
        });
        return () => unsub();
    }, []);

    return { currentUser, loading };
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading) return <div className="text-white p-10">Loading...</div>; // FIXED: Simple loading UI
    if (!currentUser) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        // FIXED: Removed <AuthProvider> wrapper as it was undefined
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Routes */}
                <Route path="/question" element={
                    <ProtectedRoute>
                        <QuestionsPage />
                    </ProtectedRoute>
                } />

                <Route path="/leaderboard" element={
                    <ProtectedRoute>
                        <LeaderboardPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;