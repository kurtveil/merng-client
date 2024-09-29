import React from "react";

export const ThemeContext = React.createContext();

export default ({ children }) => {
    const [theme, setTheme] = React.useState('dark')

    const defaultContext = {
        theme,
        setTheme
    };
    return (
        <ThemeContext.Provider value={defaultContext}>
            {children}
        </ThemeContext.Provider>
    );
};