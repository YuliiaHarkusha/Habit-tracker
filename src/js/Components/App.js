import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home";
//import Habits from "./Pages/Habits";      // Приклад інших сторінок
//import Tracker from "./Pages/Tracker";
//import Statistics from "./Pages/Statistics";

const App = () => {
    return (
        <>
            <Header />  {/* Рендериться один раз, над всіма сторінками */}
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
};

export default App;