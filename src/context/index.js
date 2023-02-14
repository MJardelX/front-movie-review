import React from 'react';
import AuthProvider from './AuthProvider';
import MoviesProvider from './MoviesProvider';
import NotificationPovider from './Notification';
import SearchProvider from './SearchProvider';
import ThemeProvider from './ThemeProvider';

const ContextProviders = (props) => {
    return (
        <NotificationPovider>
            <AuthProvider>
                <SearchProvider>
                    <MoviesProvider>
                        <ThemeProvider>{props.children}</ThemeProvider>
                    </MoviesProvider>
                </SearchProvider>
            </AuthProvider>
        </NotificationPovider>
    );
}

export default ContextProviders;
