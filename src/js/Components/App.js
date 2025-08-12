import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header";
import Home from "./Pages/Home";
import HabitsPage from "./Pages/Habits/HabitsPage";
import TrackerPage from "./Pages/Tracker/TrackerPage";

import { HabitsProvider } from "./Pages/Habits/HabitsContext";

const App = () => {
    return (
        <HabitsProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/tracker" element={<TrackerPage />} />
            </Routes>
        </HabitsProvider>
    );
};

export default App;