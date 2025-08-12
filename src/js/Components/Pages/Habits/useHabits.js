import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export function useHabits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHabits = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL, {
                headers: { 'X-Master-Key': API_KEY }
            });
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setHabits(data.habits || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchHabits(); }, []);

    const saveHabits = async (newHabits) => {
        try {
            const res = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY,
                },
                body: JSON.stringify({ habits: newHabits }),
            });
            if (!res.ok) throw new Error('Failed to save');
            setHabits(newHabits);
        } catch (err) {
            setError(err.message);
        }
    };

    const addHabit = (habit) => {
        const newHabit = { ...habit, id: Date.now(), records: [] };
        saveHabits([...habits, newHabit]);
    };

    const updateHabit = (updatedHabit) => {
        saveHabits(habits.map(h => h.id === updatedHabit.id ? updatedHabit : h));
    };

    const deleteHabit = (id) => {
        saveHabits(habits.filter(h => h.id !== id));
    };

    const toggleHabitForDate = (habitId, date) => {
        const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        const newHabits = habits.map(h => {
            if (h.id !== habitId) return h;
            const records = h.records || [];
            const index = records.findIndex(r => r.date === dateStr);
            if (index > -1) {
                records[index].done = !records[index].done;
            } else {
                records.push({ date: dateStr, done: true });
            }
            return { ...h, records };
        });
        saveHabits(newHabits);
    };

    return {
        habits,
        loading,
        error,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitForDate
    };
}
