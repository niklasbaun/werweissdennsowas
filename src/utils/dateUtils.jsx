const getTodayID = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
};

const todayDateString = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
});