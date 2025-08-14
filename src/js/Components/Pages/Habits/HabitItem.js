import React from "react";
import "./_habitItem.scss";

const HabitItem = ({ habit, onEdit, onDelete }) => {
    return (
        <li className="habit-item">
            <h3>{habit.title}</h3>
            <div className="habit-item__buttons">
                <button className="edit" onClick={() => onEdit(habit)}>Edit</button>
                <button className="delete" onClick={() => onDelete(habit.id)}>Delete</button>
            </div>
        </li>
    );
};

export default HabitItem;
