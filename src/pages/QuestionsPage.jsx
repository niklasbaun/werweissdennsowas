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

        const qRef = doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'questions', todayID);
        const unsubQ = onSnapshot(qRef, (snap) => {
            if (snap.exists()) setQuestion(snap.data());
            else setQuestion(null);
            setLoading(false);
        });

        const aRef = doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers', `${todayID}_${currentUser.uid}`);
        const unsubA = onSnapshot(aRef, (snap) => {
            setMyAnswer(snap.exists() ? snap.data() : null);
        });

        const answersRef = collection(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers');
        const qStats = query(answersRef, where('questionId', '==', todayID));
        const unsubS = onSnapshot(qStats, (snap) => {
            const counts = { a: 0, b: 0, c: 0, d: 0 };
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

        await setDoc(doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'answers', `${todayID}_${currentUser.uid}`), {
            userId: currentUser.uid,
            questionId: todayID,
            selectedOption: key,
            isCorrect,
            timestamp: serverTimestamp()
        });

        if (isCorrect) {
            await updateDoc(doc(db, 'artifacts', ARTIFACT_ID, 'public', 'data', 'users', currentUser.uid), {
                score: increment(10)
            });
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

    // --- LAYOUT WRAPPER (Centers horizontally, pushes content up vertically) ---
    const Layout = ({ children }) => (
        <div className="min-h-screen w-full flex items-center pt-12 px-4 fade-in pb-10 justify-center bg-slate-950">
            <div className="w-full max-w-lg">
                {children}
            </div>
        </div>
    );


    if (!question) return (
        <Layout>
            <div className="text-center text-slate-400 p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-2">Heutige Frage fehlt</h2>
                <p>Versuche es morgen nochmal!</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-slate-700 rounded-lg text-sm text-blue-300 hover:text-white hover:bg-slate-600 transition-all">Neu laden</button>
            </div>
        </Layout>
    );

    // VIEW: Results (User has voted)
    if (myAnswer) {
        const { isCorrect } = myAnswer;

        return (
            <Layout>
                {/* 1. Top Status Card */}
                <div className={`text-center p-8 rounded-2xl border-2 mb-8 shadow-2xl transform transition-all ${
                    isCorrect
                        ? 'bg-gradient-to-br from-emerald-900/40 to-slate-900 border-emerald-500/50 shadow-emerald-900/20'
                        : 'bg-gradient-to-br from-rose-900/40 to-slate-900 border-rose-500/50 shadow-rose-900/20'
                }`}>
                    <div className="text-5xl mb-4 animate-bounce">{isCorrect ? "🎉" : "❌"}</div>
                    <h2 className={`text-3xl font-extrabold tracking-tight ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? "Richtig!" : "Falsch!"}
                    </h2>
                    <p className="text-slate-300 mt-2 font-medium text-lg">
                        {isCorrect ? "+10 Punkte erhalten" : "Viel Glück beim nächsten Mal!"}
                    </p>
                </div>

                {/* 2. List of Options with Stats */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Community Abstimmung</h3>

                    {Object.entries(question.options).map(([key, text]) => {
                        const count = stats?.counts[key] || 0;
                        const percent = stats?.total ? Math.round((count / stats.total) * 100) : 0;

                        // Logic
                        const isCorrectKey = key === question.correctAnswer;
                        const isSelected = myAnswer.selectedOption === key;

                        let cardStyle = "bg-slate-800 border-slate-700 text-slate-400 opacity-80"; // Default dimmed
                        let barColor = "bg-slate-600";
                        let ring = "";

                        if (isCorrectKey) {
                            cardStyle = "bg-emerald-900/20 border-emerald-500 text-emerald-100 opacity-100";
                            barColor = "bg-emerald-500";
                            ring = "ring-1 ring-emerald-500 shadow-lg shadow-emerald-900/20";
                        } else if (isSelected && !isCorrectKey) {
                            cardStyle = "bg-rose-900/20 border-rose-500 text-rose-100 opacity-100";
                            barColor = "bg-rose-500";
                            ring = "ring-1 ring-rose-500 shadow-lg shadow-rose-900/20";
                        }

                        return (
                            <div key={key} className={`relative p-4 rounded-xl border transition-all duration-300 ${cardStyle} ${ring}`}>
                                {/* Header: Answer Text + Percentage */}
                                <div className="flex justify-between items-center gap-4 mb-3 relative z-10">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Badge */}
                                        <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm uppercase shadow-sm ${
                                            isCorrectKey ? 'bg-emerald-500 text-black' :
                                                (isSelected ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-400')
                                        }`}>
                                        {key}
                                    </span>
                                        {/* Text with truncation protection */}
                                        <span className={`font-medium text-lg leading-snug break-words ${isCorrectKey ? 'text-white' : ''}`}>{text}</span>
                                    </div>
                                    <span className="flex-shrink-0 font-mono font-bold text-lg">{percent}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2.5 w-full bg-slate-900/50 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full transition-all duration-1000 ${barColor}`}
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>

                                {/* Status Labels */}
                                {isCorrectKey && (
                                    <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-emerald-400 uppercase tracking-wide">
                                        Antwort
                                    </div>
                                )}
                                {isSelected && !isCorrectKey && (
                                    <div className="absolute -top-3 right-4 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-rose-400 uppercase tracking-wide">
                                        Deine Wahl
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* 3. Explanation Box */}
                <div className="mt-8 bg-blue-950/20 rounded-2xl border border-blue-500/20 overflow-hidden shadow-lg">
                    <div className="bg-blue-900/20 px-6 py-3 border-b border-blue-500/10 flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest">Erklärung</h3>
                    </div>
                    <div className="p-6 text-blue-100/90 leading-relaxed text-sm md:text-base">
                        {question.explanation}
                    </div>
                </div>

                {/* 4. Navigation Buttons */}
                <div className="mt-8 flex justify-center pb-10">
                    <button
                        onClick={() => navigate('/leaderboard')}
                        className="group relative px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all border border-slate-600 hover:border-slate-500 hover:shadow-lg hover:-translate-y-0.5"
                    >
                    <span className="flex items-center gap-2">
                        Leaderboard ansehen
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    </button>
                </div>
            </Layout>
        );
    }

    // VIEW: Voting
    return (
        <Layout>
            <div className="mb-8 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                    Frage des Tages
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{question.questionText}</h1>
            </div>

            <div className="space-y-4">
                {Object.entries(question.options).map(([key, text]) => (
                    <button
                        key={key}
                        onClick={() => handleVote(key)}
                        className="w-full text-left p-5 mb-4 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-750 hover:border-blue-500/50 hover:shadow-blue-900/20 hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden"
                    >

                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 relative z-10">
                            <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 text-slate-400 font-bold group-hover:text-blue-400 group-hover:bg-slate-800 border border-slate-700 group-hover:border-blue-500/30 uppercase transition-colors">
                                {key}
                            </span>
                            <span className="text-slate-200 font-medium text-lg leading-snug">{text}</span>
                        </div>
                    </button>
                ))}
            </div>
        </Layout>
    );
}