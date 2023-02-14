import React from 'react';
import { IoIosClose } from 'react-icons/io'
import ModalContainer from './ModalContainer';

const WritersModal = ({ profiles = [], visible, onClose, onRemoveClick }) => {
    return (
        <ModalContainer ignoreContainer visible={visible} onClose={onClose}>

            <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] 
            overflow-auto p-2 relative custom-scroll-bar">

                {profiles.map(({ id, name, avatar }) => {
                    return (
                        <div
                            key={id}
                            className='flex items-center space-x-3 justify-between 
                            dark:hover:bg-dark-subtle hover:bg-light-subtle 
                            dark:bg-secondary bg-white 
                              drop-shadow-md
                              rounded p-1 transition'>
                            <img src={avatar} alt={name} className="w-16 h-16 rounded object-cover aspect-square" />
                            <p className='w-full font-semibold dark:text-white text-primary'>{name}</p>
                            <button
                                type='button'
                                onClick={() => onRemoveClick(id)}
                            >
                                <IoIosClose size={30} className="dark:text-white text-primary" />
                            </button>
                        </div>
                    )
                })}
            </div>


        </ModalContainer>
    );
}

export default WritersModal;
