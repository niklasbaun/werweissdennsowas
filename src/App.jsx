import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/question" element={<QuestionsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
