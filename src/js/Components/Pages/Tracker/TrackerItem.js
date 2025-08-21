import React from 'react';
import './_trackerItem.scss';

const getLocalDateStr = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const TrackerItem = ({ habit, selectedDate, onToggle }) => {
    const dateStr = getLocalDateStr(selectedDate);
    const done = habit.records?.some(r => r.date === dateStr && r.done);

    const handleClick = () => {
        onToggle(habit.id, dateStr);
    };

    return (
        <div
            className={`tracker-item ${done ? 'done' : ''}`}
            onClick={handleClick}>
            <span>{habit.title}</span>
            <strong>{done ? '✅' : '⬜'}</strong>
        </div>
    );
};

export default TrackerItem;
