import { useState, useEffect } from 'react';
import { fetchBinData, putBinData } from '../Utils/habitsApi';
import { findHabitsPath, getAtPath, setAtPath } from '../Utils/habitRecordUtils';
import { addHabit, updateHabit, deleteHabit, toggleHabitForDate } from './useHabitsOperations';

export function useHabits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHabits = async () => {
        setLoading(true);
        try {
            const data = await fetchBinData();
            const topRecord = data.record ?? {};
            const path = findHabitsPath(topRecord);
            setHabits(getAtPath(topRecord, path) || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const saveHabits = async (newHabits) => {
        setLoading(true);
        try {
            const data = await fetchBinData();
            const latestRecord = data.record ?? {};
            const path = findHabitsPath(latestRecord);
            const updatedRecord = setAtPath(latestRecord, path, newHabits);

            await putBinData(updatedRecord);

            setHabits(newHabits);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const wrappedAddHabit = (habit) => addHabit(habits, habit, saveHabits);
    const wrappedUpdateHabit = (updatedHabit) => updateHabit(habits, updatedHabit, saveHabits);
    const wrappedDeleteHabit = (id) => deleteHabit(habits, id, saveHabits);
    const wrappedToggleHabitForDate = (habitId, date) => toggleHabitForDate(habits, habitId, date, saveHabits);

    useEffect(() => {
        fetchHabits();
    }, []);

    return {
        habits,
        loading,
        error,
        fetchHabits,
        saveHabits,
        addHabit: wrappedAddHabit,
        updateHabit: wrappedUpdateHabit,
        deleteHabit: wrappedDeleteHabit,
        toggleHabitForDate: wrappedToggleHabitForDate,
    };
}
