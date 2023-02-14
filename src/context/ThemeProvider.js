import React, { createContext, useEffect } from 'react'


export const ThemeContext = createContext();
const defaultTheme = 'light';
const dartkTheme = 'dark'


const getTheme = () => localStorage.getItem('theme');
const updateTheme = (theme, themeToRemove) => {
    if (themeToRemove) {
        document.documentElement.classList.remove(themeToRemove);
    }
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
}

const ThemeProvider = (props) => {
    const toggleTheme = () => {
        let oldTheme = getTheme();
        const newTheme = oldTheme === defaultTheme ? dartkTheme : defaultTheme;
        updateTheme(newTheme, oldTheme);
    }

    useEffect(() => {
        let theme = getTheme();
        if(!theme) {
            updateTheme(defaultTheme);
        }else{
            updateTheme(theme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme: 'Testing', "toggleTheme": toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
