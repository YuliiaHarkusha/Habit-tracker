import React from 'react';
import './_trackerItem.scss';

const pad = (n) => (n < 10 ? "0" + n : n);
const getLocalDateStr = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const TrackerItem = ({ habit, selectedDate, onToggle }) => {
    const dateStr = getLocalDateStr(selectedDate);
    const done = habit.records?.some(r => r.date === dateStr && r.done);

    const handleClick = () => {
        onToggle(habit.id, selectedDate);
    };

    return (
        <div
            className={`tracker-item ${done ? 'done' : 'pending'}`}
            onClick={handleClick}>
            <span>{habit.title}</span>
            <strong>{done ? '✅' : '⬜'}</strong>
        </div>
    );
};

export default TrackerItem;
