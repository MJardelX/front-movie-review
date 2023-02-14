import React from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';

const NextAndPrevBtn = ({onNextClick, onPrevClick, className}) => {


    const getClasses = () =>{
        return "flex justify-end items-center space-x-3 mt-6 p-0  ";
    }

    return (
        <div className={getClasses()+ className}>
            <div className="hover:border-b dark:hover:border-b-white hover:border-b-primary">
                <button onClick={onPrevClick} type='button' className='text-primary dark:text-white  flex items-center'>
                    <FcPrevious />
                    Prev
                </button>
            </div>

            <div className="hover:border-b dark:hover:border-b-white hover:border-b-primary p-0">
                <button onClick={onNextClick} type='button' className='text-primary dark:text-white  flex items-center'>
                    Next
                    <FcNext className='text-white' />
                </button>

            </div>
        </div>
    );
}

export default NextAndPrevBtn;

