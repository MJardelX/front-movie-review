import React from 'react';

const FormContainer = (props) => {
    return (
        <div className='fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center' >
            {props.children}
        </div>
    );
}

export default FormContainer;
