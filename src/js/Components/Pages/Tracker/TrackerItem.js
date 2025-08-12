import React from 'react';
import './_trackerItem.scss';

const TrackerItem = ({ habit, selectedDate, onToggle }) => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const done = habit.records?.some(r => r.date === dateStr && r.done);

    const handleClick = () => {
        onToggle(habit.id, selectedDate);
    };

    return (
        <div
            className={`tracker-item ${done ? 'done' : 'pending'}`}
            onClick={handleClick}
        >
            <span>{habit.title}</span>
            <strong>{done ? '✅' : '⬜'}</strong>
        </div>
    );
};

export default TrackerItem;
