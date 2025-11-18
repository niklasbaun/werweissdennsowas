import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

// --- Firebase Config (Using the environment variables) ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
let app, auth;
if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
}

// --- 1. Login Component ---
const Login = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        setError('');
        if(!auth) return;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Instead of navigate('/home'), we tell the parent App to switch views
            onNavigate('/QuestionsPage');
        } catch (err) {
            setError(err.message);
            console.error(err.code, err.message);
        }
    }

    return (
        <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">FocusApp Login</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Email address</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="name@example.com"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="••••••••"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    onClick={onLogin}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all"
                >
                    Login
                </button>
            </form>

            <p className="text-sm text-slate-400 text-center mt-6">
                No account yet? {' '}
                {/* Replaced NavLink with a simple button that changes state */}
                <button
                    onClick={() => onNavigate('/SignupPage')}
                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}

// --- 2. Signup Component ---
const Signup = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Added Name field
    const [error, setError] = useState('');

    const onSignup = async (e) => {
        e.preventDefault();
        setError('');
        if(!auth) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Optional: Update their display name
            if(name) {
                await updateProfile(user, { displayName: name });
            }

            onNavigate('/QuestionsPage'); // Go to home after signup
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Display Name</label>
                    <input
                        type="text"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Email address</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    onClick={onSignup}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-all"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-sm text-slate-400 text-center mt-6">
                Already have an account? {' '}
                <button
                    onClick={() => onNavigate('/LoginPage')}
                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );
}

// --- 3. Home Component (Dummy) ---
const Home = ({ onNavigate }) => (
    <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome Home!</h1>
        <p className="mb-8 text-slate-400">You are successfully logged in.</p>
        <button
            onClick={() => onNavigate('login')}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
            Log Out (Demo)
        </button>
    </div>
);

// --- 4. Main App Component ---
export default function App() {
    // This state replaces the Router
    const [currentView, setCurrentView] = useState('login'); // Options: 'login', 'signup', 'home'

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {currentView === 'login' && <Login onNavigate={setCurrentView} />}
            {currentView === 'signup' && <Signup onNavigate={setCurrentView} />}
            {currentView === 'home' && <Home onNavigate={setCurrentView} />}
        </div>
    );
}