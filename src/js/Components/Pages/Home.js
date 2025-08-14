import React, { useState } from "react";
import { useHabitsContext } from "../Hooks/HabitsContext";
import "./_home.scss";

const Home = () => {
    const { habits, loading, error, toggleHabitForDate } = useHabitsContext();
    const [currentDate] = useState(new Date());

    if (loading) return <p className="loading">Loading habits...</p>;
    if (error) return <p className="error">Error loading habits: {error}</p>;
    if (!habits.length) return <p className="empty">No habits added yet.</p>;

    const dateStr = currentDate.toISOString().split('T')[0];

    return (
        <div className="home">
            <h1 className="home__title">Your Habits for Today</h1>
            <ul className="home__list">
                {habits.map(habit => {
                    const done = habit.records?.some(r => r.date === dateStr && r.done);
                    return (
                        <li
                            key={habit.id}
                            onClick={() => toggleHabitForDate(habit.id, currentDate)}
                            className={`home__item ${done ? "done" : ""}`}
                        >
                            {habit.title} {done ? '☑️' : '⬜'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
