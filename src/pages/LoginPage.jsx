import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // FIXED: Import hook
import { auth } from '../hooks/firebaseConfig.js';

const LoginPage = () => { // FIXED: Removed onNavigate prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!auth) {
            setError("Firebase not initialized");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/question');
        } catch (err) {
            setError(err.message);
            console.error(err.code, err.message);
        }
    }

    return (
        <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Wer weiß denn so was?</h2>

            <form className="space-y-4">
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Email addresse</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-slate-400 text-sm mb-1">Passwort</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    onClick={onLogin}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all active:scale-95"
                >
                    Login
                </button>
            </form>

            <p className="text-sm text-slate-400 text-center mt-6">
                Noch keinen Account? {' '}
                <button
                    onClick={() => navigate('/signup')}
                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}

export default LoginPage;