import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../hooks/firebaseConfig.js';

const SignupPage = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const onSignup = async (e) => {
        e.preventDefault();
        setError('');
        if (!auth) {
            setError("Firebase not initialized");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Optional: Update their display name
            if (name) {
                await updateProfile(user, { displayName: name });
            }

            onNavigate('/QuestionsPage');
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
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Email address</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    onClick={onSignup}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-all active:scale-95"
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

export default SignupPage;