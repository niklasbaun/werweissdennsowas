import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/question" element={<QuestionsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
