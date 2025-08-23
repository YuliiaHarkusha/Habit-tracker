import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { fetchHabitsForUser } from "./useHabits";
import { useHabitsActions } from "./useHabitsOperations";

const HabitsContext = createContext(null);
export const HabitsProvider = ({ children }) => {
    const { user } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const init = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);
            try {
                const fetchedHabits = await fetchHabitsForUser(user.id);
                setHabits(fetchedHabits);
            } catch (err) {
                console.error("Error loading habits:", err);
                setError("Failed to load habits");
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [user]);
    const actions = useHabitsActions(user?.id, habits, setHabits);
    return (
        <HabitsContext.Provider value={{ habits, loading, error, ...actions }}>
            {children}
        </HabitsContext.Provider>
    );
};
export const useHabitsContext = () => {
    const context = useContext(HabitsContext);
    if (!context) throw new Error("useHabitsContext must be used within HabitsProvider");
    return context;
};