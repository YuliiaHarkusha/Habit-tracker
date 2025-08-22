import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home";
import HabitsPage from "./Pages/Habits/HabitsPage";
import TrackerPage from "./Pages/Tracker/TrackerPage";
import { HabitsProvider } from "./Hooks/HabitsContext";
import StatisticsPage from "./Pages/Statistics/StatisticsPage";
import Footer from "./Footer/Footer";

const App = () => {
    return (
        <HabitsProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/tracker" element={<TrackerPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
            <Footer />
        </HabitsProvider>
    );
};

export default App;