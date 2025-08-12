import React, { useState } from 'react';

const HabitForm = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSave({ title });
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter habit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div>
                <button type="submit">Save</button>
                <button
                    type="button" // важливо, щоб не сабмітило форму
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
