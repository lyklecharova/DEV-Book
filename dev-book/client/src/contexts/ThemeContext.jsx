import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const initialTheme = localStorage.getItem("theme") || "Light";
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute(
            "data-theme",
            theme === "Light" ? "Dark" : "Light"
        );
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "Light" ? "Dark" : "Light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
