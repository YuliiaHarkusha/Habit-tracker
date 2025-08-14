import React, { useState, useEffect } from 'react';
import "./_habitForm.scss";

const HabitForm = ({ habit, onSave, onCancel }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (habit) setTitle(habit.title);
        else setTitle('');
    }, [habit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSave({ ...habit, title });
            setTitle('');
        }
    };

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter habit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="habit-form__buttons">
                <button type="submit" className="save">Save</button>
                <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                        setTitle('');
                        if (onCancel) onCancel();
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default HabitForm;
