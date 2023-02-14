import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import AppSearchForm from "../components/form/AppSearchForm";
import { useMovies, useTheme } from "../hooks";


export default function Header({onAddMovieClick, onAddActorClick}) {
    const [showOptions, setShowOptions] = useState(false);
    const {resultMovies, resultNotFound, resetSearch } = useMovies();
    console.log(resultMovies, resultNotFound)

    const { toggleTheme } = useTheme();
    const navigate = useNavigate();
    const options = [
        {
            title: 'Add Movie',
            onClick: onAddMovieClick
        },
        {
            title:'Add Actor',
            onClick: onAddActorClick
        }
    ]


    const handleReset = () =>{
        resetSearch();
        navigate(-1);
    } 




    const handleSearchSubmit = (query) =>{
       if(!query.trim()) return;

       navigate('/search?title='+query);
    }

    return (
        <div className="flex items-center justify-between relative pl-5">
           

           <AppSearchForm onReset={handleReset} onSubmit={handleSearchSubmit} placeholder='Search Movies...' showResetIcon={resultMovies.length || resultNotFound } />

            <div className="flex items-center space-x-3 p-5">

                <button onClick={toggleTheme} className='border dark:border-white border-light-subtle dark:bg-white bg-primary p-1 rounded'>
                    <BsFillSunFill className='dark:text-primary text-white' size={24} />
                </button>

                <button
                    onClick={() => setShowOptions(true)}
                    className="flex items-center space-x-2 
                               dark:text-white text-primary
                               dark:bg-primary bg-light-subtle 
                               dark:hover:bg-white hover:bg-primary
                               dark:hover:text-primary hover:text-white            
                                 transition font-semibold border-2 rounded text-lg px-3 py-1" >
                    <span>Create</span>
                    <AiOutlinePlus />
                </button>

                <CreateOptions
                    options={options}
                    visible={showOptions}
                    onClose={() => setShowOptions(false)}
                />
            </div>

        </div>
    );
}

const CreateOptions = ({ options, visible, onClose }) => {
    const container = useRef();
    const containerID = "options-container";


    useEffect(() => {
        const handleClose = (e) => {
            if (!visible) return;
            const { parentElement, id } = e.target;

            if (parentElement.id === containerID || id === containerID) return;

            // Old Code (Before React 18)
            // container.current.classList.remove("animate-scale");
            // container.current.classList.add("animate-scale-reverse");

            // New Update
            if (container.current) {
                if (!container.current.classList.contains("animate-scale"))
                    container.current.classList.add("animate-scale-reverse");
            }
        };

        document.addEventListener("click", handleClose);
        return () => {
            document.removeEventListener("click", handleClose);
        };
    }, [visible]);



    const handleAnimationEnd = (e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
    }


    const handleClick= (fn)=>{
        fn();
        onClose();
    }

    if (!visible) return null;
    
    return (
        <div
            id={containerID}

            ref={container}
            className="z-50 absolute right-5 top-16 flex flex-col space-y-3 p-5 dark:bg-white bg-secondary drop-shadow-lg rounded animate-scale"
            onAnimationEnd={handleAnimationEnd}
        >

            {options.map((option, index) => {
                return <Option key={index} onClick={()=> handleClick(option.onClick)}>{option.title}</Option>
            })}

        </div>
    );
};

const Option = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="dark:text-secondary text-white hover:opacity-80 transition"
        >
            {children}
        </button>
    );
};
