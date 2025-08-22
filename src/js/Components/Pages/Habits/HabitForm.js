import React, { useState, useEffect } from 'react';
import "./_habitForm.scss";

const HabitForm = ({ habit, onSave, onCancel }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(habit?.title || '');
    }, [habit]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;

        const newHabit = habit
            ? { ...habit, title: trimmed }
            : { title: trimmed };

        onSave(newHabit);
        setTitle('');
    };
    const handleCancel = () => {
        setTitle('');
        if (onCancel) onCancel();
    };
    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter habit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            <div className="habit-form__buttons">
                <button type="submit" className="save">Save</button>
                <button type="button" className="cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default HabitForm;