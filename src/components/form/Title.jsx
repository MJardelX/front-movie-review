import React from 'react';

const Title = (props) => {
    return (
       
        <h1 className='text-xl dark:text-white text-secondary font-semibold text-center'>{props.children}</h1>

    );
}

export default Title;
