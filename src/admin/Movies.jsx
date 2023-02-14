import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getMovies, getMovieForUpdate, deleteMovie } from '../api/movie';
import MovieListItem from '../components/MovieListItem';
import NextAndPrevBtn from '../components/NextAndPrevBtn';
import { useMovies, useNotification } from '../hooks';
import ConfirmModal from '../modals/ConfirmModal';
import UpdateMovieModal from '../modals/UpdateMovieModal';

const limit = 15;
let currentPageNo = 0;

const Movies = () => {
    // const [movies, setMovies] = useState([])
    // const [reachedToEnd, setReachedToEnd] = useState(false);
    // const [showConfirmModal, setShowConfirmModal] = useState(false);
    // const [busy, setBusy] = useState(false);
    // const { updateNotification } = useNotification();
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const {
        fetchMovies,
        movies: newMovies,
        fetchNextPage,
        fetchPreviousPage } = useMovies();


    // const fetchMovies = async (pageNo) => {
    //     const { error, movies } = await getMovies(pageNo, limit)
    //     if (error) return updateNotification("error", error);

    //     if (!movies.length) {
    //         currentPageNo = pageNo - 1;
    //         return setReachedToEnd(true)
    //     }
    //     setMovies([...movies]);
    // }


    // const handleOnPrevClick = () => {
    //     if (currentPageNo <= 0) return;
    //     if (reachedToEnd) setReachedToEnd(false)
    //     currentPageNo -= 1;
    //     fetchMovies(currentPageNo);
    // }

    // const handleOnNexClick = () => {
    //     if (reachedToEnd) return;
    //     currentPageNo += 1;
    //     fetchMovies(currentPageNo);
    // }


    // const handleOnEditClick = async ({ id }) => {

    //     const { movie, error } = await getMovieForUpdate(id);
    //     if (error) return updateNotification("error", error);
    //     setSelectedMovie(movie);
    //     setShowUpdateModal(true);
    // }

    // const handleOnDeleteClick = (movie) => {

    //     setSelectedMovie(movie);
    //     setShowConfirmModal(true);
    // }

    // const hideUpdateModal = () => {
    //     setShowUpdateModal(false);
    // }

    const handleOnSuccess = () => {
        setShowUpdateModal(false);
        fetchMovies(currentPageNo);
    }

    // const hideDeleteModal = () => {
    //     setShowConfirmModal(false)
    // }

    const handleUIUpdate = () =>{
        fetchMovies();
    }



    // const handleOnDeleteConfirm = async () => {

    //     setBusy(true)
    //     const { error, movie } = await deleteMovie(selectedMovie.id);
    //     setBusy(false)

    //     if (error) return updateNotification("error", error);


    //     updateNotification("success", "Movie deleted successfully")
    //     setShowConfirmModal(false);
    //     fetchMovies(currentPageNo)
    // }

    useEffect(() => {
        console.log("fetch")
        fetchMovies(currentPageNo);
    }, [])

    return (
        <>
            <div className='p-5'>
                <div className='space-y-3 p-5'>
                    {newMovies.map(movie => {
                        return <MovieListItem
                            // onEditClick={() => handleOnEditClick(movie)}
                            // onDeleteClick={() => handleOnDeleteClick(movie)}
                            afterDelete = {handleUIUpdate}
                            afterUpdate= {handleUIUpdate}
                            key={movie.id}
                            movie={movie} />
                    })}
                </div>

                <NextAndPrevBtn onNextClick={fetchNextPage} onPrevClick={fetchPreviousPage} />
            </div>

            {/* <ConfirmModal
                visible={showConfirmModal}
                onCancel={hideDeleteModal}
                onConfirm={handleOnDeleteConfirm}
                busy={busy}
                title='Are you sure?'
                subtitle='This action will remove this movie permanently
            '/> */}

            {/* <UpdateMovieModal onSuccess={handleOnSuccess} visible={showUpdateModal} initialState={selectedMovie} /> */}
        </>

    );
}

export default Movies;
