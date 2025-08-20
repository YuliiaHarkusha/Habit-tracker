import React, { useState } from "react";
import { useHabitsContext } from "../Hooks/HabitsContext";
import "./_home.scss";

const Home = () => {
    const { habits, loading, error, toggleHabitForDate } = useHabitsContext();
    const [currentDate] = useState(new Date());
    const pad = (n) => (n < 10 ? "0" + n : n);
    const getLocalDateStr = (date) =>
        `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    const dateStr = getLocalDateStr(currentDate);
    if (loading) return <p className="loading">Loading habits...</p>;
    if (error) return <p className="error">Error loading habits: {error}</p>;
    if (!habits.length) return <p className="empty">No habits added yet.</p>;
    return (
        <div className="home">
            <h1 className="home__title">Your Habits for Today</h1>
            <ul className="home__list">
                {habits.map((habit) => {
                    const done = habit.records?.some(
                        (r) => r.date === dateStr && r.done);
                    return (
                        <li key={habit.id} className="home__item">
                            <button
                                type="button"
                                className={`habit-btn ${done ? "done" : ""}`}
                                onClick={() => toggleHabitForDate(habit.id, currentDate)}
                                aria-pressed={done}>
                                <span className="habit-title">{habit.title}</span>
                                <span className="habit-status">{done ? "☑️" : "⬜"}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default Home;