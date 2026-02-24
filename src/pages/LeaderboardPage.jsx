import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, query, onSnapshot, orderBy, limit} from 'firebase/firestore';
import { db, ARTIFACT_ID } from '../hooks/firebaseConfig.js';


export default function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!db) return;

        const usersRef = collection(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'users');
        const q = query(usersRef, orderBy('score', 'desc'), limit(10));

        // FIXED: Added the Error Callback (the 3rd argument)
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const userList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
                setLoading(false);
            },
            (error) => {
                // THIS will show you the real problem in the console
                console.error("🔥 LEADERBOARD ERROR:", error);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center pt-8 px-4 pb-10 bg-slate-950">
            <div className="w-full max-w-lg fade-in">

                {/* --- HEADER: Navigation & Settings --- */}
                <div className="flex justify-between items-center mb-6 w-full">
                    {/* Left: Back Button */}
                    <button
                        onClick={() => navigate('/question')}
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-700/50"
                    >
                        <span>⬅</span> Zurück
                    </button>

                    {/* Right: Settings Button */}
                    <button
                        onClick={() => navigate('/settings')}
                        className="flex items-center justify-center text-lg text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-800 w-10 h-10 rounded-full border border-slate-700/50 shadow-sm"
                        title="Einstellungen"
                    >
                        ⚙️
                    </button>
                </div>

                {/* --- LEADERBOARD CONTENT --- */}
                {loading ? (
                    <div className="text-slate-500 text-center mt-20">Loading...</div>
                ) : (
                    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">

                        {/* Cleaned up the title and added some padding */}
                        <div className="p-6 border-b border-slate-700/50 bg-slate-800/50">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                🏆 Top Spieler
                            </h2>
                        </div>

                        <table className="w-full text-left">
                            <thead className="bg-slate-900/80 text-xs text-slate-400 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Rang</th>
                                <th className="px-6 py-4">Spieler</th>
                                <th className="px-6 py-4 text-right">Score</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-lg">
                                        {index === 0 && "🥇"}
                                        {index === 1 && "🥈"}
                                        {index === 2 && "🥉"}
                                        {index > 2 && <span className="text-slate-500 font-mono text-sm">#{index + 1}</span>}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">
                                        {user.displayName || "Anonymous"}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-400">
                                        {user.score || 0}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-slate-500">Noch keine Spieler</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}