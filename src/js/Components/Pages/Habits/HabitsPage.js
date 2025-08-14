import React, { useState } from "react";
import { useHabitsContext } from "../../Hooks/HabitsContext";
import HabitList from "./HabitList";
import HabitForm from "./HabitForm";
import "./_habitsPage.scss";

const HabitsPage = () => {
    const { habits, addHabit, updateHabit, deleteHabit } = useHabitsContext();
    const [editingHabit, setEditingHabit] = useState(null);

    const handleSave = async (habit) => {
        if (habit.id) await updateHabit(habit);
        else await addHabit(habit);
        setEditingHabit(null);
    };

    return (
        <div className="habits-page">
            <h1 className="habits__title">Your Habits</h1>
            <HabitForm habit={editingHabit} onSave={handleSave} onCancel={() => setEditingHabit(null)} />
            <HabitList habits={habits} onEdit={setEditingHabit} onDelete={deleteHabit} />
        </div>
    );
};

export default HabitsPage;
