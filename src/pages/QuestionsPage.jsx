import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, setDoc, updateDoc, increment, serverTimestamp, collection, query, where } from 'firebase/firestore';
import { db, ARTIFACT_ID, auth } from '../hooks/firebaseConfig.js';

function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return () => unsub();
    }, []);

    return {currentUser};
}

export default function QuestionsPage() {
    const { currentUser } = useAuth();
    const [question, setQuestion] = useState(null);
    const [myAnswer, setMyAnswer] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Get Today's ID
    const todayID = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (!currentUser || !db) return;

        // A. Fetch Question
        const qRef = doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'questions', todayID);
        const unsubQ = onSnapshot(qRef, (snap) => {
            if (snap.exists()) setQuestion(snap.data());
            else setQuestion(null); // No question for today
            setLoading(false);
        });

        // B. Check if I answered
        const aRef = doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers', `${todayID}_${currentUser.uid}`);
        const unsubA = onSnapshot(aRef, (snap) => {
            setMyAnswer(snap.exists() ? snap.data() : null);
        });

        // C. Get Community Stats
        const answersRef = collection(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers');
        const qStats = query(answersRef, where('questionId', '==', todayID));
        const unsubS = onSnapshot(qStats, (snap) => {
            const counts = { a: 0, b: 0, c: 0 };
            snap.docs.forEach(d => {
                const val = d.data().selectedOption;
                if (counts[val] !== undefined) counts[val]++;
            });
            setStats({ counts, total: snap.size });
        });

        return () => { unsubQ(); unsubA(); unsubS(); };
    }, [currentUser]);

    const handleVote = async (key) => {
        if (!question) return;
        const isCorrect = key === question.correctAnswer;

        // 1. Save Answer
        await setDoc(doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers', `${todayID}_${currentUser.uid}`), {
            userId: currentUser.uid,
            questionId: todayID,
            selectedOption: key,
            isCorrect,
            timestamp: serverTimestamp()
        });

        // 2. Update Score (if correct)
        if (isCorrect) {
            await updateDoc(doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'users', currentUser.uid), {
                score: increment(10)
            });
        }
    };

    // --- Renders ---

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

    if (!question) return (
        <div className="text-center text-slate-400 mt-10 p-6 bg-slate-800 rounded-xl">
            <h2 className="text-xl font-bold text-white">Heute keine Frage</h2>
            <p>Versuche es morgen nochmal!</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-sm text-blue-400 hover:underline">Neu laden</button>
        </div>
    );

    // VIEW: Results (User has voted)
    if (myAnswer) {
        const { isCorrect } = myAnswer;
        return (
            <div className="max-w-md mx-auto w-full p-6 fade-in">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate('/leaderboard')}
                        className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                        🏆 Leaderboard &rarr;
                    </button>
                </div>
                {/* Header Result */}
                <div className={`text-center p-6 rounded-2xl border mb-8 ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                    <h2 className={`text-2xl font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? "Correct!" : "Wrong Answer"}
                    </h2>
                    <p className="text-slate-300 mt-1">
                        {isCorrect ? "+10 Points" : `The correct answer was ${question.options[question.correctAnswer]}`}
                    </p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase">Abstimmungen</h3>
                    {Object.entries(question.options).map(([key, text]) => {
                        const count = stats?.counts[key] || 0;
                        const percent = stats?.total ? Math.round((count / stats.total) * 100) : 0;
                        const isCorrectKey = key === question.correctAnswer;

                        return (
                            <div key={key} className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="flex justify-between text-sm text-slate-300 mb-1">
                                    <span>{text}</span>
                                    <span>{percent}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${isCorrectKey ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="mt-6 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20 text-sm text-blue-200">
                    <strong>Erklärung:</strong> {question.explanation}
                </div>
            </div>
        );
    }

    // VIEW: Voting (User has NOT voted)
    return (
        <div className="max-w-md mx-auto w-full p-6 fade-in">

            <div className="mb-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Heutige Frage</span>
                <h1 className="text-2xl font-bold text-white mt-2">{question.questionText}</h1>
            </div>

            <div className="space-y-3">
                {Object.entries(question.options).map(([key, text]) => (
                    <button
                        key={key}
                        onClick={() => handleVote(key)}
                        className="w-full text-left p-4 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-blue-500 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-slate-400 font-bold group-hover:text-blue-400 border border-slate-700 group-hover:border-blue-500/50 uppercase">
                                {key}
                            </span>
                            <span className="text-slate-200 font-medium text-lg">{text}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}