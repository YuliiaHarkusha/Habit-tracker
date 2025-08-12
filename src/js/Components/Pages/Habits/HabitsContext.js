import React, { createContext, useContext } from "react";
import { useHabits } from "./useHabits";

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
    const habitsData = useHabits();

    return (
        <HabitsContext.Provider value={habitsData}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabitsContext = () => useContext(HabitsContext);