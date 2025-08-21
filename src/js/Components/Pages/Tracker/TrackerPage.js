import React, { useState } from "react";
import { useHabitsContext } from "../../Hooks/HabitsContext";
import CalendarSelector from "./CalendarSelector";
import TrackerList from "./TrackerList";
import "./_trackerPage.scss"

const TrackerPage = () => {
    const { habits, loading, error, toggleHabitForDate } = useHabitsContext();
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (loading) return <p>Loading habits...</p>;
    if (error) return <p>Error loading habits: {error}</p>;

    return (
        <div className="tracker-page">
            <h1>Habit Tracker</h1>
            <CalendarSelector
                value={selectedDate}
                onChange={setSelectedDate}
                habits={habits}/>
            <TrackerList
                habits={habits}
                selectedDate={selectedDate}
                onToggle={toggleHabitForDate}/>
        </div>
    );
};

export default TrackerPage;