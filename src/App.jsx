import './styles/App.css'
import QuestionsPage from "./pages/QuestionsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <DataProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/question" element={<QuestionsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </DataProvider>
  )
}

export default App
