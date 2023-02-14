import { useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteMovie } from "../api/movie";
import { useNotification } from "../hooks";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateMovieModal from "../modals/UpdateMovieModal";
import { getPoster } from "../utils/helper";

const MovieListItem = ({ movie, afterDelete, afterUpdate }) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [busy, setBusy] = useState(false);
    const { updateNotification } = useNotification();
    const [showUpdateModal, setShowUpdateModal] = useState(false);





    const handleOnDeleteConfirm = async () => {
        setBusy(true)
        // //console.log(movie.id)
        const { error, movie: movieRes } = await deleteMovie(movie.id);
        setBusy(false)
        if (error) return updateNotification("error", error);
        hideConfirmModal();
        updateNotification("success", "Movie deleted successfully");
        afterDelete(movie)
        // fetchMovies(currentPageNo)
    }

    const displayConfirmModal = () => setShowConfirmModal(true);
    const hideConfirmModal = () => setShowConfirmModal(false);

    const handleOnEditClick = () => {
        setShowUpdateModal(true);
        setSelectedMovieId(movie.id);
    };

    const hideUpdateModal = () => setShowUpdateModal(false);


    const handleOnSuccess = () => {
        hideUpdateModal();
        afterUpdate();
        setSelectedMovieId(null);
    }

    return <>
        <MovieCard movie={movie} onDeleteClick={displayConfirmModal} onEditClick={handleOnEditClick} />


        <div className="p-0">

            <ConfirmModal
                visible={showConfirmModal}
                onCancel={hideConfirmModal}
                onConfirm={handleOnDeleteConfirm}
                busy={busy}
                title='Are you sure?'
                subtitle='This action will remove this movie permanently
            '/>

            <UpdateMovieModal
                movieId={selectedMovieId}
                onSuccess={handleOnSuccess}
                visible={showUpdateModal}
            />

        </div>


    </>
}



const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {

    const { poster, responsivePosters, title, status, genres = [] } = movie;

    return (
        <table className='w-full border-b'>
            <tbody>
                <tr>
                    <td>
                        <div className="w-24 m-1">
                            <img className='w-full aspect-video' src={getPoster(responsivePosters) || poster} alt="" />
                        </div>
                    </td>

                    <td className='w-full pl-5'>
                        <div>
                            <h1 className='text-lg font-semibold text-primary dark:text-white'>{title}</h1>

                            <div className="space-x-2">
                                {genres.map((g, index) => {
                                    return <span key={g + index} className='text-primary dark:text-white text-md'>{g}</span>
                                })}
                            </div>
                        </div>
                    </td>


                    <td className='px-5'>
                        <p className=' text-primary dark:text-white'>{status}</p>
                    </td>

                    <td >
                        <div className='flex items-center space-x-3 text-primary dark:text-white text-lg'>
                            <button onClick={onDeleteClick} type='button' className='p-2 rounded-full bg-red-500 text-white hover:opacity-80 transition'>
                                <BsTrash />
                            </button>
                            <button onClick={onEditClick} type='button' className='p-2 rounded-full bg-yellow-500 text-white hover:opacity-80 transition'>
                                <BsPencilSquare />
                            </button>
                            <button onClick={onOpenClick} type='button' className='p-2 rounded-full bg-blue-500 text-white hover:opacity-80 transition'>
                                <BsBoxArrowUpRight />
                            </button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}


export default MovieListItem;