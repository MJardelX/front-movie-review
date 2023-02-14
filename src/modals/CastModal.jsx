import React from 'react';
import { IoIosClose } from 'react-icons/io'
import ModalContainer from './ModalContainer';
import { AiOutlineCheck } from "react-icons/ai"

const CastModal = ({ casts = [], visible, onClose, onRemoveClick }) => {
    return (
        <ModalContainer ignoreContainer visible={visible} onClose={onClose}>

            <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] 
            overflow-auto p-2 relative custom-scroll-bar">

                {casts.map(({ profile, roleAs, leadActor },index) => {
                    const { name, avatar, id } = profile;

                    //console.log(id+index)
                    return (
                        <div
                            key={id+""+index}
                            className='flex items-center space-x-3 justify-between 
                                     dark:hover:bg-dark-subtle hover:bg-light-subtle 
                                       dark:bg-secondary bg-white 
                                       drop-shadow-md
                                       rounded p-1 transition'>

                            <img src={avatar} alt={name} className="w-16 h-16 rounded object-cover aspect-square" />

                            <div className='w-full flex flex-col justify-between'>
                                <div>
                                    <p className=' font-semibold dark:text-white text-primary'>{name}</p>
                                    <p className=' text-sm font-semibold dark:text-dark-subtle text-light-subtle'>{roleAs}</p>
                                </div>
                                {leadActor && <AiOutlineCheck className='dark:text-white text-primary' />}
                            </div>

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

export default CastModal;
