import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import Home from "./Pages/Home";
import HabitsPage from "./Pages/Habits/HabitsPage";
import TrackerPage from "./Pages/Tracker/TrackerPage";
import StatisticsPage from "./Pages/Statistics/StatisticsPage";

import { AuthProvider } from "./Context/AuthContext";
import { HabitsProvider } from "./Hooks/HabitsContext";

const App = () => {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
};

export default App;
