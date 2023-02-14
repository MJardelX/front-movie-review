import React from 'react';

const AppInfoBox = ({title, subtitle}) => {
    return (
        <div className='dark:bg-secondary bg-white shadow dark:shadow p-5 rounded mt-5'>
            <h1 className='font-semibold text-xl mb-2 text-primary dark:text-white'>{title}</h1>
            <p className='text-xl text-primary dark:text-white'>{subtitle}</p>
        </div>
    );
}

export default AppInfoBox;
