import React from 'react';
import { ImTree } from 'react-icons/im'

const GenresSelector = ({ onClick, badge }) => {

    const renderBadge = () => {
        if (!badge) return null;
        return (
            <span className='dark:bg-dark-subtle bg-light-subtle text-white
            absolute top-0 right-0 w-5 h-5 rounded-full 
            flex justify-center items-center translate-x-3 -translate-y-1 text-sm '>
                {badge <= 9 ? badge : "9+"}
            </span>
        )
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className='relative flex items-center space-x-2 py-1 px-3
                         dark:text-white text-primary
                         dark:bg-primary bg-light-subtle 
                         dark:hover:bg-white hover:bg-primary
                         dark:hover:text-primary hover:text-white
                           rounded font-semibold'   >
            <ImTree />
            <span>Select Genres</span>
            {renderBadge()}
        </button>
    );
}

export default GenresSelector;
