import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Submit from '../components/form/Submit';
import genres from '../utils/genres';
import ModalContainer from './ModalContainer';

const GenresModal = ({ visible, onClose, onSubmit, previousSelection }) => {

    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenresSelector = (gen) => {
        let newGenres = [];
        if (selectedGenres.includes(gen)) {
            newGenres = selectedGenres.filter(genre => genre !== gen);
        } else {
            newGenres = [...selectedGenres, gen]
        }

        setSelectedGenres(newGenres);
    }


    const handleSubmit = () => {
        onSubmit(selectedGenres);
        onClose();
    }


    const handleClose = () => {
        setSelectedGenres(previousSelection);
        onClose();
    }
    //console.log("init")

    useEffect(()=>{
        // //console.log("ne2")
        setSelectedGenres(previousSelection)
    },[previousSelection])

    // //console.log("genres")
    // //console.log(previousSelection)
    return (
        <ModalContainer ignoreContainer visible={visible} onClose={handleClose} >


            <div className="space-y-2 dark:bg-secondary bg-white rounded max-w-[45rem] max-h-[25rem] 
            overflow-auto p-2 custom-scroll-bar flex flex-col justify-between h-full">

                    <div>
                        <h1 className='dark:text-white text-primary text-2xl font-semibold text-center'>Select Genres</h1>

                        <div className="space-y-3">
                            {genres.map((gen) => {

                                return <Genre key={gen} onClick={() => handleGenresSelector(gen)} selected={selectedGenres.includes(gen)} >{gen} </Genre>
                            })}
                        </div>
                    </div>

                    <div className="w-64 self-center">
                        <Submit value='Select' type="button" onClick={handleSubmit} />
                    </div>

            </div>

        </ModalContainer>
    );
}

export default GenresModal;





const Genre = ({ children, selected, onClick }) => {
    const getSelectedStyle = () => {
        return (selected ? ' dark:bg-white bg-primary  dark:text-primary text-white ' : 'text-primary dark:text-white')
    }
    return (
        <button
            onClick={onClick}
            className={getSelectedStyle() + ` border-2 dark:border-dark-subtle border-light-subtle
                                 p-1 rounded mr-3 hover:opacity-50`}>
            {children}
        </button>
    )
}