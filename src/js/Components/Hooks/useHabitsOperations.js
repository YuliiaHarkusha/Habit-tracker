import { saveHabitsForUser } from "./useHabits";
export const useHabitsActions = (userId, habits, setHabits) => {
    const addHabit = async (habit) => {
        const newHabit = { ...habit, id: Date.now() + Math.random(), records: [] };
        const updated = [...habits, newHabit];
        setHabits(updated);
        try {
            await saveHabitsForUser(userId, updated);
        } catch (err) {
            console.error('Error adding habit:', err);
        }
    };
    const updateHabit = async (habit) => {
        const updated = habits.map(h => h.id === habit.id ? { ...h, ...habit } : h);
        setHabits(updated);
        try {
            await saveHabitsForUser(userId, updated);
        } catch (err) {
            console.error('Error updating habit:', err);
        }
    };
    const deleteHabit = async (habitId) => {
        const updated = habits.filter(h => h.id !== habitId);
        setHabits(updated);
        try {
            await saveHabitsForUser(userId, updated);
        } catch (err) {
            console.error('Error deleting habit:', err);
        }
    };
    const toggleHabitForDate = async (habitId, date) => {
        const dateStr = date instanceof Date ? date.toISOString().slice(0, 10) : date;
        const updated = habits.map(h => {
            if (h.id !== habitId) return h;
            const records = [...(h.records || [])];
            const idx = records.findIndex(r => r.date === dateStr);
            if (idx >= 0) {
                records[idx].done = !records[idx].done;
            } else {
                records.push({ date: dateStr, done: true });
            }
            return { ...h, records };
        });
        setHabits(updated);
        try {
            await saveHabitsForUser(userId, updated);
        } catch (err) {
            console.error('Error toggling habit:', err);
        }
    };
    return { addHabit, updateHabit, deleteHabit, toggleHabitForDate };
};