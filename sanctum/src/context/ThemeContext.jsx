import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage first
        const savedMode = localStorage.getItem("sanctum-theme-mode");
        if (savedMode) {
            return savedMode === "dark";
        }
        // Fallback to system preference or default to dark
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.setAttribute("data-mode", "dark");
            localStorage.setItem("sanctum-theme-mode", "dark");
        } else {
            root.setAttribute("data-mode", "light");
            localStorage.setItem("sanctum-theme-mode", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
