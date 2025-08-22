import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const generateUserId = () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        let storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
            storedUserId = generateUserId();
            localStorage.setItem("userId", storedUserId);
        }
        setUser({ id: storedUserId, name: "Demo User" });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
