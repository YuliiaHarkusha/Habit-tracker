import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let storedId = localStorage.getItem("userId");
        if (!storedId) {
            storedId = "user_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
            localStorage.setItem("userId", storedId);
        }
        setUser({ id: storedId, name: "Demo User" });
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
