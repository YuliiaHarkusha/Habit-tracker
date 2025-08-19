import React from "react";
import "./_monthSelector.scss";

const MonthSelector = ({ currentDate, onChangeMonth }) => {
    const prevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        onChangeMonth(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        onChangeMonth(newDate);
    };

    const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="month-selector">
            <button onClick={prevMonth}>{"<"}</button>
            <span>{monthName} {year}</span>
            <button onClick={nextMonth}>{">"}</button>
        </div>
    );
};

export default MonthSelector;
