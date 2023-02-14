const ViewAllBtn = ({ children, onClick, visible }) => {

    if (!visible) return null;

    return (
        <button onClick={onClick}
            type='button'
            className='dark:text-white text-primary hover:underline transition' >
            {children}
        </button>
    )
}


export default ViewAllBtn;