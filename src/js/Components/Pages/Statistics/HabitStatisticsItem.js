import React from "react";
import "./_habitStatisticsItem.scss";

const HabitStatisticsItem = ({ habit, daysInMonth, records, year, month }) => {
    const dayStatuses = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return records.some(r => r.date === dateString && r.done);
    });

    const segments = [];
    let start = 0;
    while (start < dayStatuses.length) {
        const status = dayStatuses[start];
        let end = start;
        while (end + 1 < dayStatuses.length && dayStatuses[end + 1] === status) {
            end++;
        }
        segments.push({ status, length: end - start + 1 });
        start = end + 1;
    }

    const percentage = Math.round((dayStatuses.filter(Boolean).length / daysInMonth) * 100);

    return (
        <div className="habit-statistics-item">
            <div className="habit-header">
                <h3>{habit.title}</h3>
                <span className="habit-percentage">{percentage}%</span>
            </div>
            <div className="habit-progress">
                {segments.map((seg, idx) => (
                    <div
                        key={idx}
                        className={`segment ${seg.status ? "completed-segment" : "empty-segment"}`}
                        style={{ flex: seg.length }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitStatisticsItem;
