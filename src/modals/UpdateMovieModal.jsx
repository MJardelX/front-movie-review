import React, { useEffect } from 'react';
import { useState } from 'react';
import MovieFrom from '../admin/MovieForm';
import { getMovieForUpdate, updateMovie } from '../api/movie';
import { useNotification } from '../hooks';
import ModalContainer from './ModalContainer';

const UpdateMovieModal = ({ visible, initialState, onSuccess, movieId }) => {

    const [busy, setBusy] = useState(false);
    const [ready, setReady] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const { updateNotification } = useNotification();


    const handleSubmit = async (data) => {

        setBusy(true)
        const { error, movie } = await updateMovie(selectedMovie.id, data)
        setBusy(false)

        if (error) return updateNotification("error", error);

        updateNotification("success", "Movie updated successfully");
        onSuccess()
    }


    const fetchMovieToUpdate = async () => {

        const { movie, error } = await getMovieForUpdate(movieId);
        if (error) return updateNotification("error", error);
        setSelectedMovie(movie);
        setReady(true)
        // setShowUpdateModal(true);
    }


    useEffect(() => {
        if (movieId) fetchMovieToUpdate();
    }, [movieId])


    return (
        <ModalContainer visible={visible} >
            {ready ? <MovieFrom

                btnTitle='Update'
                initialState={selectedMovie}
                onSubmit={handleSubmit}
                busy={busy} /> : <div className='w-full h-full flex justify-center items-center'>
                <p className='dark:text-dark-subtle text-light-subtle animate-pulse text-xl'>Please Wait...</p>
            </div>}
            
        </ModalContainer>
    );
}

export default UpdateMovieModal;
