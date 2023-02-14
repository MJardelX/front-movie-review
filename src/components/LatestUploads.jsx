import React, { useState } from 'react';
import { useEffect } from 'react';
import { deleteMovie, getMovieForUpdate, getMovies } from '../api/movie';
import { useMovies, useNotification } from '../hooks';
import ConfirmModal from '../modals/ConfirmModal';
import UpdateMovieModal from '../modals/UpdateMovieModal';
import MovieListItem from './MovieListItem';

const pageNo = 0;
const limit = 5;
const LatestUploads = () => {

    // const { updateNotification } = useNotification();
    // const [movies, setMovies] = useState([]);
    // const [busy, setBusy] = useState(false);
    // const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const {  fetchLatestUploads, latestUploads  } = useMovies();





    // const handleOnEditClick = async ({ id }) => {
    //     const { movie, error } = await getMovieForUpdate(id);
    //     if (error) return updateNotification("error", error);
    //     setSelectedMovie(movie);
    //     setShowUpdateModal(true);
    // }



    // const fetchLatestUploads = async () => {
    //     const { error, movies } = await getMovies(pageNo, limit);
    //     if (error) return updateNotification("error", error)

    //     setMovies([...movies])
    // }


    // const handleOnDeleteClick = (movie) => {
    //     setSelectedMovie(movie);
    //     setShowConfirmModal(true);
    // }


    const handleOnSuccess = () => {
        setShowUpdateModal(false);
        fetchLatestUploads();
    }

    // const hideDeleteModal = () => {
    //     setShowConfirmModal(false)
    // }


    // const handleOnDeleteConfirm = async () => {

    //     setBusy(true)
    //     const { error, movie } = await deleteMovie(selectedMovie.id);
    //     setBusy(false)

    //     if (error) return updateNotification("error", error);


    //     updateNotification("success", "Movie deleted successfully")
    //     setShowConfirmModal(false);
    //     fetchLatestUploads()
    // }


    const handleAfterDelete = () => fetchLatestUploads();

    const handleUIUpdate = () =>{
        fetchLatestUploads();
    }




    useEffect(() => {
        fetchLatestUploads();
    }, [])

    return (

        <>

            <div className='dark:bg-secondary bg-white shadow dark:shadow p-5 rounded col-span-2'>
                <h1 className='font-semibold text-xl mb-2 text-primary dark:text-white'> Recent Uploads</h1>

                <div className="space-y-3">

                    {latestUploads.map(movie => {
                        return <MovieListItem
                            // onEditClick={() => handleOnEditClick(movie)}
                            // onDeleteClick={() => handleOnDeleteClick(movie)}
                            key={movie.id}
                            afterDelete = {handleUIUpdate}
                            afterUpdate= {handleUIUpdate}
                            movie={movie} />
                    })}
                </div>

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

export default LatestUploads;
