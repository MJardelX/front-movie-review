import React from 'react';

const Submit = (props) => {
    return (
        <input 
            type= {props.type || "submit"}
            onClick={props.onClick}
            className=' w-full rounded 
            
                dark:text-white text-primary
                dark:bg-primary bg-light-subtle 
                dark:hover:bg-white hover:bg-primary
                dark:hover:text-primary hover:text-white
                 
                transition font-semibold text-lg cursor-pointer p-1 h-10' 
            value={props.value} />
    );
}

export default Submit;
