import React from 'react';
import { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { IoMdCloseCircle } from 'react-icons/io';




const defaultInputStyle = " text-lg dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white"
const AppSearchForm = ({placeholder, onSubmit, showResetIcon, onReset, inputClassName = defaultInputStyle}) => {

    const [value, setValue] = useState("");


    const handleReset = () =>{
        
        setValue("")
        onReset();
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        onSubmit(value);
    }

    return (
        <form className='relative' onSubmit={handleOnSubmit}>
            <input
                onChange={({target})=> setValue(target.value)}
                value={value}
                type="text"
                className={"border-2  transition bg-transparent rounded p-1 outline-none " + inputClassName}
                placeholder={placeholder}
            />

           {showResetIcon ? <button  onClick={handleReset} type='button' className='  absolute top-1/2 -translate-y-1/2 right-2 dark:text-white text-primary'>
                <IoMdCloseCircle className='w-5 h-5'/>
            </button>: null}
        </form>
    );
}

export default AppSearchForm;
