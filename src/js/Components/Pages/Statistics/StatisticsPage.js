import React, { useMemo, useState } from "react";
import { useHabitsContext } from "../../Hooks/HabitsContext";
import HabitStatisticsItem from "./HabitStatisticsItem";
import MonthSelector from "./MonthSelector";
import "./_statisticsPage.scss";

const StatisticsPage = () => {
    const { habits, loading, error } = useHabitsContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    if (loading) return <p>Loading habits...</p>;
    if (error) return <p>Error loading habits: {error}</p>;
    if (!habits || !habits.length) return <p>No habits added yet.</p>;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = useMemo(
        () => new Date(year, month + 1, 0).getDate(),
        [year, month]
    );
    const habitsWithMonthRecords = useMemo(() => {
        return habits.map((habit) => {
            const recordsInMonth = (habit.records ?? []).filter((r) => {
                const d = new Date(r.date);
                return d.getFullYear() === year && d.getMonth() === month;
            });
            return { habit, recordsInMonth };
        });
    }, [habits, year, month]);
    return (
        <div className="statistics-page">
            <h1>Habit Statistics</h1>
            <MonthSelector currentDate={currentDate} onChangeMonth={setCurrentDate} />
            <ul className="statistics-list">
                {habitsWithMonthRecords.map(({ habit, recordsInMonth }) => (
                    <li key={habit.id}>
                        <HabitStatisticsItem
                            habit={habit}
                            daysInMonth={daysInMonth}
                            records={recordsInMonth}
                            year={year}
                            month={month}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default StatisticsPage;
