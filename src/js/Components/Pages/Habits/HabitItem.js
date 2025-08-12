import React from "react";

const HabitItem = ({ habit, onEdit, onDelete }) => {
    return (
        <li className="habit-item">
            <h3>{habit.title}</h3>
            <button onClick={() => onEdit(habit)}>Edit</button>
            <button onClick={() => onDelete(habit.id)}>Delete</button>
        </li>
    );
};

export default HabitItem;