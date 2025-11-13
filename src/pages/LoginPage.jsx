import React, { useState } from 'react';
// We import our new custom hook!
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Auth View Component
 * The "LoginPage" screen
 */
export default function LoginPage() {
    const [name, setName] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Get the login function from the AuthContext
    // No more passing `onLogin` as a prop!
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && !isLoggingIn) {
            setIsLoggingIn(true);
            // We don't need to set loading(false), as the component
            // will unmount on successful login.
            await login(name.trim());
        }
    };

    return (
        <div className="text-center space-y-6 p-6 fade-in">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">Answer the question</h2>
                <p className="text-slate-400">Answer the daily question, stay on your streak, and see how others voted.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Choose a Display Name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors text-center font-semibold"
                    disabled={isLoggingIn}
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? 'Joining...' : 'Start Playing'}
                </button>
            </form>
        </div>
    );
}