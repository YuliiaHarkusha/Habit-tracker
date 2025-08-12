import React from "react";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, onEdit, onDelete }) => {
    if (!habits.length) return <p>No habits yet</p>;

    return (
        <ul className="habit-list">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default HabitList;