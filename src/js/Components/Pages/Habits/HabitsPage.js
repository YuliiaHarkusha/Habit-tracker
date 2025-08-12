import React, { useState } from "react";
import { useHabitsContext } from "./HabitsContext";
import HabitList from "./HabitList";
import HabitForm from "./HabitForm";

const HabitsPage = () => {
    const { habits, addHabit, updateHabit, deleteHabit } = useHabitsContext();
    const [editingHabit, setEditingHabit] = useState(null);

    const handleSave = async (habit) => {
        if (habit.id) await updateHabit(habit);
        else await addHabit(habit);
        setEditingHabit(null);
    };

    return (
        <div>
            <h1>Your Habits</h1>
            <HabitForm habit={editingHabit} onSave={handleSave} onCancel={() => setEditingHabit(null)} />
            <HabitList habits={habits} onEdit={setEditingHabit} onDelete={deleteHabit} />
        </div>
    );
};

export default HabitsPage;