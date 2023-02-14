import React from 'react';

const ModalContainer = ({ children, visible, onClose, ignoreContainer }) => {

    const handleClick = (e) => {

        if (e.target?.id === "modal-container") onClose && onClose();
    }

    const renderChildren = () => {

        if(ignoreContainer) return children;

        return (
            <div className="dark:bg-secondary bg-white rounded w-[45rem] h-[40rem] 
            overflow-auto p-2 relative custom-scroll-bar">
                {children}
            </div>
        )

    }


    if (!visible) return null;

    return (
        <div onClick={handleClick}
            id="modal-container"
            className='fixed inset-0 dark:bg-white bg-primary 
        dark:bg-opacity-10 bg-opacity-50 backdrop-blur-sm
        flex items-center justify-center'>


            {renderChildren()}
        </div>
    );
}

export default ModalContainer;
