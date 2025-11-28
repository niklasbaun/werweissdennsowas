import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // FIXED: Import Firestore functions
import { useNavigate } from 'react-router-dom'; // FIXED: Import hook
import { auth, db, ARTIFACT_ID } from '../hooks/firebaseConfig.js'; // FIXED: Import db and ID

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSignup = async (e) => {
        e.preventDefault();
        setError('');
        if (!auth) return;

        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Update Auth Profile
            if (name) {
                await updateProfile(user, { displayName: name });
            }

            // 3. FIXED: Create User Document in Firestore (Required for Leaderboard/Score)
            await setDoc(doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'users', user.uid), {
                displayName: name || user.email.split('@')[0],
                email: user.email,
                score: 0,
                createdAt: new Date().toISOString()
            });

            navigate('/question'); // FIXED: Navigate to correct route
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="w-full max-w-sm bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Accout erstellen</h2>

            {/* 1. Move onSignup to onSubmit here */}
            <form className="space-y-4" onSubmit={onSignup}>
                <div>
                    <label className="block text-slate-400 text-sm mb-1">Anzeige Name</label>
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
                    <label className="block text-slate-400 text-sm mb-1">Passwort</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                {/* 2. Change type to submit and remove onClick */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-all active:scale-95"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-sm text-slate-400 text-center mt-6">
                Du hast schon einen Account? {' '}
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );
}

export default SignupPage;