import React from 'react';
import TrackerItem from './TrackerItem';

const TrackerList = ({ habits, selectedDate, onToggle }) => {
    if (!habits.length) return <p>No habits found.</p>;

    return (
        <div className="tracker-list">
            {habits.map(habit => (
                <TrackerItem
                    key={habit.id}
                    habit={habit}
                    selectedDate={selectedDate}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TrackerList;
