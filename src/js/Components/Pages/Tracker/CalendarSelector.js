import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import './_calendarSelector.scss';

const CalendarSelector = ({ value, onChange, habits }) => {
    const doneDates = useMemo(() => {
        const dates = new Set();
        habits.forEach(habit => {
            habit.records?.forEach(r => {
                if (r.done) dates.add(r.date);
            });
        });
        return dates;
    }, [habits]);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            if (doneDates.has(dateStr)) return 'calendar-done';
        }
        return null;
    };

    return (
        <Calendar
            value={value}
            onChange={onChange}
            tileClassName={tileClassName}
        />
    );
};

export default CalendarSelector;