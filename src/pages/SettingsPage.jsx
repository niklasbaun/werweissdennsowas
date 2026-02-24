import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../hooks/firebaseConfig.js';
import {
    updateEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import { LocalNotifications} from '@capacitor/local-notifications'

export default function SettingsPage() {
    const emailRef = useRef();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [notifsEnabled, setNotifsEnabled] = useState(false); // Placeholder state for notifications
    const [notifTime, setNotifTime] = useState('08:00'); // Placeholder state for notification time

    const navigate = useNavigate();

    useEffect(() => {
        const savedToggle = localStorage.getItem('dailyquiz_notifs') === 'true';
        const savedTime = localStorage.getItem('dailyquiz_notif_time') || '08:00';
        setNotifsEnabled(savedToggle);
        setNotifTime(savedTime);
    }, []);

    // 4. NEW: SCHEDULING LOGIC
    const scheduleDailyNotification = async (timeString) => {
        // Always cancel existing notifications first to avoid duplicates
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

        const [hours, minutes] = timeString.split(':').map(Number);

        await LocalNotifications.schedule({
            notifications: [
                {
                    title: "Zeit für die Daily Quiz! 🧠",
                    body: "Die heutige Frage wartet auf dich.",
                    id: 1,
                    // The "on" property makes it repeat daily at this exact hour/minute
                    schedule: {
                        on: { hour: hours, minute: minutes },
                        allowWhileIdle: true // Ensures it fires even if the phone is asleep
                    }
                }
            ]
        });
    };

    // 5. NEW: HANDLE TOGGLE CLICK
    const handleToggleNotifs = async () => {
        const newState = !notifsEnabled;
        setError('');

        if (newState) {
            // Ask for Permission (Required for Android 13+ and iOS)
            const permStatus = await LocalNotifications.requestPermissions();

            if (permStatus.display === 'granted') {
                setNotifsEnabled(true);
                localStorage.setItem('dailyquiz_notifs', 'true');
                await scheduleDailyNotification(notifTime);
                setMessage('Benachrichtigungen aktiviert!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setError('Berechtigung für Benachrichtigungen wurde verweigert.');
                setNotifsEnabled(false);
            }
        } else {
            // Turn off
            setNotifsEnabled(false);
            localStorage.setItem('dailyquiz_notifs', 'false');
            await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
        }
    };

    // 6. NEW: HANDLE TIME CHANGE
    const handleTimeChange = async (e) => {
        const newTime = e.target.value;
        setNotifTime(newTime);
        localStorage.setItem('dailyquiz_notif_time', newTime);

        // Reschedule immediately if notifications are currently turned on
        if (notifsEnabled) {
            await scheduleDailyNotification(newTime);
        }
    };

    // 2. Updated to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const user = auth.currentUser;
        if (!user) return setError('Niemand ist eingeloggt.');

        const currentPwd = currentPasswordRef.current.value;
        const newPwd = newPasswordRef.current.value;
        const confirmPwd = newPasswordConfirmRef.current.value;
        const newEmail = emailRef.current.value;

        // Validation
        if (!currentPwd) {
            return setError('Bitte aktuelles Passwort eingeben, um Änderungen zu speichern.');
        }
        if (newPwd !== confirmPwd) {
            return setError('Die neuen Passwörter stimmen nicht überein.');
        }

        try {
            setLoading(true);

            // Reauthenticate user before changing sensitive data
            const credential = EmailAuthProvider.credential(user.email, currentPwd);
            await reauthenticateWithCredential(user, credential);

            const promises = [];

            // Add email update to queue if changed
            if (newEmail && newEmail !== user.email) {
                promises.push(updateEmail(user, newEmail));
            }

            // Add password update to queue if provided
            if (newPwd) {
                promises.push(updatePassword(user, newPwd));
            }

            // Execute all updates
            await Promise.all(promises);

            setMessage('Profil erfolgreich aktualisiert!');

            // Clear passwords after success
            currentPasswordRef.current.value = '';
            newPasswordRef.current.value = '';
            newPasswordConfirmRef.current.value = '';

        } catch (err) {
            // Translate common Firebase errors
            if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Das aktuelle Passwort ist falsch.');
            } else {
                setError('Fehler beim Updaten: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // --- LAYOUT WRAPPER ---
    const Layout = ({ children }) => (
        <div className="min-h-screen w-full flex flex-col items-center pt-8 px-4 pb-10 bg-slate-950">
            <div className="w-full max-w-lg flex justify-start mb-6">
                <button
                    onClick={() => navigate('/question')}
                    className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/50 hover:bg-slate-800 px-4 py-2 rounded-full border border-slate-700/50"
                >
                    <span>⬅</span> Zurück
                </button>
            </div>
            <div className="w-full max-w-lg">
                {children}
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="mb-6 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Einstellungen</h1>
                <p className="text-slate-400 mt-1">Verwalte dein Profil und Benachrichtigungen.</p>
            </div>

            {/* ERROR / SUCCESS ALERTS */}
            {error && <div className="p-4 mb-6 bg-rose-900/30 border border-rose-500/50 text-rose-300 rounded-xl text-sm font-medium">{error}</div>}
            {message && <div className="p-4 mb-6 bg-emerald-900/30 border border-emerald-500/50 text-emerald-300 rounded-xl text-sm font-medium">{message}</div>}

            {/* PROFILE FORM */}
            <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
                <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Profil Daten</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                        <input
                            type="email"
                            ref={emailRef}
                            defaultValue={auth.currentUser?.email || ''}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Neues Passwort</label>
                        <input
                            type="password"
                            ref={newPasswordRef}
                            placeholder="Leer lassen um es zu behalten"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Neues Passwort bestätigen</label>
                        <input
                            type="password"
                            ref={newPasswordConfirmRef}
                            placeholder="Leer lassen um es zu behalten"
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-700">
                        <label className="block text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Aktuelles Passwort (Erforderlich)</label>
                        <input
                            type="password"
                            ref={currentPasswordRef}
                            required
                            placeholder="Dein aktuelles Passwort"
                            className="w-full bg-slate-900 border border-rose-900/50 rounded-lg p-3 text-white focus:outline-none focus:border-rose-500 transition-all"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
                    >
                        {loading ? 'Wird gespeichert...' : 'Änderungen speichern'}
                    </button>
                </div>
            </form>

            {/* NOTIFICATIONS SECTION  */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                    <span>🔔</span> Benachrichtigungen
                </h2>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-slate-200 font-medium">Tägliche Erinnerung</p>
                        <p className="text-slate-500 text-sm">Erinnere mich an die neue Frage</p>
                    </div>

                    {/* Functional Custom Toggle Switch */}
                    <button
                        type="button"
                        onClick={handleToggleNotifs}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ease-in-out ${notifsEnabled ? 'bg-blue-500' : 'bg-slate-600'}`}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ease-in-out ${notifsEnabled ? 'translate-x-6.5 left-0.5' : 'translate-x-0 left-0.5'}`}></div>
                    </button>
                </div>

                <div className={`transition-opacity duration-300 ${notifsEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Uhrzeit</label>
                    <input
                        type="time"
                        value={notifTime}
                        onChange={handleTimeChange}
                        disabled={!notifsEnabled}
                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-all [color-scheme:dark]"
                    />
                </div>
            </div>

        </Layout>
    );
}