export const addHabit = async (habits, habit, saveFn) => {
    const newHabit = { ...habit, id: Date.now(), records: [] };
    const updated = [...habits, newHabit];
    await saveFn(updated);
};

export const updateHabit = async (habits, updatedHabit, saveFn) => {
    const updated = habits.map(h => (h.id === updatedHabit.id ? updatedHabit : h));
    await saveFn(updated);
};

export const deleteHabit = async (habits, id, saveFn) => {
    const updated = habits.filter(h => h.id !== id);
    await saveFn(updated);
};

export const toggleHabitForDate = async (habits, habitId, date, saveFn) => {
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    const updated = habits.map(h => {
        if (h.id !== habitId) return h;
        const records = Array.isArray(h.records) ? [...h.records] : [];
        const idx = records.findIndex(r => r.date === dateStr);
        if (idx > -1) {
            records[idx] = { ...records[idx], done: !records[idx].done };
        } else {
            records.push({ date: dateStr, done: true });
        }
        return { ...h, records };
    });
    await saveFn(updated);
};
