import React, { useState } from "react";
import { useHabitsContext } from "../Hooks/HabitsContext";

const Home = () => {
    const { habits, loading, error, toggleHabitForDate } = useHabitsContext();
    const [currentDate] = useState(new Date()); // поточна дата, фіксована

    if (loading) return <p>Loading habits...</p>;
    if (error) return <p>Error loading habits: {error}</p>;
    if (!habits.length) return <p>No habits added yet.</p>;

    const dateStr = currentDate.toISOString().split('T')[0];

    return (
        <div>
            <h1>Your Habits for Today</h1>
            <ul>
                {habits.map(habit => {
                    const done = habit.records?.some(r => r.date === dateStr && r.done);
                    return (
                        <li
                            key={habit.id}
                            onClick={() => toggleHabitForDate(habit.id, currentDate)}
                            style={{
                                cursor: "pointer",
                                textDecoration: done ? "line-through" : "none",
                                color: done ? "green" : "black",
                                userSelect: "none"
                            }}
                        >
                            {habit.title} {done ? '✅' : '⬜'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;
