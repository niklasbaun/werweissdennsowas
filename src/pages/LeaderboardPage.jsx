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
        <div className="max-w-md mx-auto w-full p-6 fade-in">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Top Players
            </h2>

            {loading ? (
                <div className="text-slate-500 text-center">Loading...</div>
            ) : (
                <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                    {/* 3. Add Back Button */}
                    <button
                        onClick={() => navigate('/question')}
                        className="mb-6 text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        &larr; zurück zu den Fragen
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        Top Spieler
                    </h2>

                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-xs text-slate-400 uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Rang</th>
                            <th className="px-6 py-4">Spieler</th>
                            <th className="px-6 py-4 text-right">Score</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                        {users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    {index === 0 && "🥇"}
                                    {index === 1 && "🥈"}
                                    {index === 2 && "🥉"}
                                    {index > 2 && <span className="text-slate-500 font-mono">#{index + 1}</span>}
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
    );
}