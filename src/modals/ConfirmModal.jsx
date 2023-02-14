import React from 'react';
import { ImSpinner4 } from 'react-icons/im';
import ModalContainer from './ModalContainer';

const ConfirmModal = ({ visible, onConfirm, onCancel, busy, title, subtitle}) => {


    const commonClass = "px-3 py-1 text-white rounded hover:opacity-80"
    return (
        <ModalContainer visible={visible} ignoreContainer>

            <div className='dark:bg-primary bg-white p-5 rounded'>
                <h1 className='text-red-400 font-semibold text-lg'>{title}</h1>
                <p className='text-secondary dark:text-white text-sm'>{subtitle}</p>

                <div className="flex items-center space-x-3 mt-5 justify-end">

                    {busy ?
                        <div className='dark:text-white text-primary flex items-center space-x-2 animate-pulse'>
                            <ImSpinner4 className='animate-spin' />
                            <span >Please wait...</span>    
                        </div>
                        : (<>
                            <button type='button' onClick={onConfirm} className={commonClass + " bg-red-500"}>Confirm</button>
                            <button type='button' onClick={onCancel} className={commonClass + " bg-blue-500"}>Cancel</button>
                        </>)}


                </div>
            </div>
        </ModalContainer>
    );
}

export default ConfirmModal;
