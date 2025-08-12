import React, { createContext, useContext } from "react";
import { useHabits } from "./useHabits";

const HabitsContext = createContext(null);

export const HabitsProvider = ({ children }) => {
    const habitsData = useHabits();

    return (
        <HabitsContext.Provider value={habitsData}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabitsContext = () => {
    const context = useContext(HabitsContext);
    if (!context) {
        throw new Error("useHabitsContext must be used within a HabitsProvider");
    }
    return context;
};
