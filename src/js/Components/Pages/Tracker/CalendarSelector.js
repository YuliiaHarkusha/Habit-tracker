import React, { useMemo } from 'react';
import Calendar from 'react-calendar';
import './_calendarSelector.scss';

const getLocalDateStr = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const CalendarSelector = ({ value, onChange, habits }) => {
    const doneDates = useMemo(() => {
        const dates = new Set();
        habits.forEach(habit => {
            habit.records?.forEach(r => {
                if (r.done) dates.add(r.date); // зберігаємо рядки YYYY-MM-DD
            });
        });
        return dates;
    }, [habits]);
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = getLocalDateStr(date);
            if (doneDates.has(dateStr)) return 'calendar-done';
        }
        return null;
    };
    return (
        <Calendar
            value={value}
            onChange={onChange}
            tileClassName={tileClassName}
            locale="en-US"
            formatShortWeekday={(locale, date) =>
                date.toLocaleDateString('en-US', { weekday: 'short' })
            }
            formatMonthYear={(locale, date) =>
                date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }
        />
    );
};
export default CalendarSelector;