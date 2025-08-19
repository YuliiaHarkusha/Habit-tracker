import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import './_calendarSelector.scss';

const pad = (n) => (n < 10 ? "0" + n : n);
const getLocalDateStr = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

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
            const dateStr = getLocalDateStr(date);
            if (doneDates.has(dateStr)) return 'calendar-done';}
        return null;
    };

    return (
        <Calendar
            value={value}
            onChange={onChange}
            tileClassName={tileClassName}/>
    );
};

export default CalendarSelector;
