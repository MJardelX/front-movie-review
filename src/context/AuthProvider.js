import React, { createContext, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIsAuth, signInUser } from '../api/auth';
import { useNotification } from '../hooks';

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ''
}
const AuthProvider = (props) => {

    const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
    const { updateNotification } = useNotification();
    const navigate = useNavigate();


    const handleLogin = async (email, password) => {
        setAuthInfo(prev => {
            return {
                ...prev,
                isPending: true
            }
        })

        const response = await signInUser({
            email, password
        });

        if (response.error) {
            updateNotification("error", response.error);

            return setAuthInfo(prev => {
                return {
                    ...prev,
                    isPending: false,
                    error: response.error
                }
            })
        }

        navigate('/', {replace: true})

        setAuthInfo(prev => {
            return {
                profile: response.user,
                isPending: false,
                error: "",
                isLoggedIn: true
            }
        })

        localStorage.setItem('auth-token', response.user.token)
    }


    const isAuth = useCallback(async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;

        setAuthInfo(prev => {
            return {
                ...prev,
                isPending: true
            }
        })

        const response = await getIsAuth(token);

        if (response.error) {

            updateNotification("error", response.error);
            return setAuthInfo(prev => {
                return {
                    ...prev,
                    isPending: false,
                    error: response.error
                }
            })
        }

        setAuthInfo(prev => {
            return {
                profile: response.user,
                isPending: false,
                error: "",
                isLoggedIn: true
            }
        })
    }, [updateNotification])


    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setAuthInfo(defaultAuthInfo);
        // navigate('/auth/signin')
    }

    useEffect(() => {
        isAuth();
    }, [isAuth])

    // , handleLogout
    return (
        <AuthContext.Provider value={{
            authInfo, handleLogin, isAuth, handleLogout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
