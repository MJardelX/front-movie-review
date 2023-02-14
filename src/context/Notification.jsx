
import React, { createContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';


export const NotificationContext = createContext();

let timeoutId;
const NotificationPovider = (props) => {

    const [notification, setNotification] = useState("");
    const [classes, setClasses] = useState("");


    const updateNotification = useCallback((type, value) => {

        if(timeoutId){
            clearTimeout(timeoutId);
        }


        switch (type) {
            case 'error':
                setClasses('bg-red-500');
                break;
            case "success":
                setClasses('bg-green-500');
                break;
            case "warning":
                setClasses('bg-orange-500');
                break;
            default:
                setClasses('bg-red-500');
                break;
        }

        setNotification(value);

        timeoutId = setTimeout(() => {
            setNotification('')
        }, 3000)
    },[])

    return (
        <NotificationContext.Provider value={{ updateNotification }}>
            {props.children}
            {notification && <div className='fixed left-1/2 -translate-x-1/2 top-24 '>
                <div className={classes + " bounce-custom shadow-md shadow-gray-600 rounded gelatine w-[30rem] "}>
                    <p className=' text-white px-4 py-2 font-semibold text-center'>{notification}</p>
                </div>
            </div>}

            
        </NotificationContext.Provider>
    );
}

export default NotificationPovider;




