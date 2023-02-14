import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import Container from "../containers/Container"
import CustomButtonLink from "../form/CustomButtonLink";
import CustomLink from "../form/CustomLink"
import RatingStar from "../RatingStar";
import { BsTrash, BsPencil, BsPencilSquare } from "react-icons/bs";
import ConfirmModal from "../../modals/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../../modals/EditRatingModal";



const getNameInitial = (name = "") => {
    return name[0].toUpperCase();
}


const MovieReviews = () => {


    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [deleteBusy, setDeleteBusy] = useState(false);
    const [profileOwnersReview, setProfileOwnersReview] = useState(null);
    const { updateNotification } = useNotification();
    const { authInfo } = useAuth();
    const profileId = authInfo.profile?.id;


    console.log(profileId)


    const fetchReviews = async () => {
        const { error, movie } = await getReviewByMovie(movieId);
        if (error) return updateNotification("error", error);

        setReviews([...movie.reviews]);
        setMovieTitle(movie.title)

        return movie;
    }


    const findProfileOwnersReview = () => {

        if (profileOwnersReview) return setProfileOwnersReview(null);

        const matched = reviews.find(review => review.owner.id === profileId);
        if (!matched) return updateNotification("error", "You don't have any review!");

        setProfileOwnersReview(matched);
    }


    const hideConfirmModal = () => setShowConfirmModal(false);
    const displayConfirmModal = () => setShowConfirmModal(true);
    const hideEditModal = () => {
        setShowEditModal(false);
        setSelectedReview(false);
    }
    const displayEditClick = () => {
        const { id, content, rating } = profileOwnersReview;
        setSelectedReview({ id, content, rating });
        setShowEditModal(true);
    }

    const handleDeleteConfirm = async () => {
        setDeleteBusy(true);
        const { error, message } = await deleteReview(profileOwnersReview.id);
        setDeleteBusy(false);
        if (error) return updateNotification("error", error);

        updateNotification('success', message);
        setProfileOwnersReview(null);
        hideConfirmModal();
        fetchReviews();
    };


    const handleOnUpdated = async (data) => {
       
        const movies= await fetchReviews()
        const matched = movies.reviews.find(review => review.owner.id === profileId);
        if (!matched) return updateNotification("error", "You don't have any review!");
        setProfileOwnersReview(matched);
    }

    useEffect(() => {
        if (movieId) fetchReviews()
    }, [movieId])




    return (
        <div className='dark:bg-primary bg-white min-h-screen pb-7'>
            <Container className="xl:p-0 px-2 py-8">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold dark:text-white text-secondary space-x-3 mt-3">
                        <span className="text-light-subtle dark:text-dark-subtle font-normal mr-2">
                            Reviews for:
                        </span>
                        {movieTitle}
                    </h1>

                    {profileId && <CustomButtonLink label={profileOwnersReview ? "View All" : "Find My Reviw"} clickable onClick={findProfileOwnersReview} />}
                </div>


                <NotFoundText text="No Reviews!" visible={!reviews.length} />

                <div className="space-y-3 mt-5">
                    {profileOwnersReview ?
                        <>
                            <ReviewCard review={profileOwnersReview} />
                            <div className="flex space-x-3 px-3">
                                <button onClick={displayConfirmModal} className='p-2 rounded-full bg-red-500 text-white hover:opacity-80 transition' type='button'>
                                    <BsTrash />
                                </button>
                                <button onClick={displayEditClick} className='p-2 rounded-full bg-yellow-500 text-white hover:opacity-80 transition' type='button'>
                                    <BsPencilSquare />
                                </button>
                            </div>
                        </> : (
                            reviews.map(review => <ReviewCard review={review} key={review.id} />)
                        )}

                </div>
            </Container>

            <ConfirmModal
                visible={showConfirmModal}
                onConfirm={handleDeleteConfirm}
                title="Are you sure?"
                subtitle="This action will remove the review permanently"
                onCancel={hideConfirmModal}
                busy={deleteBusy}
            />

            <EditRatingModal
                visible={showEditModal}
                initialState={selectedReview}
                onClose={hideEditModal}
                onSucced={handleOnUpdated} />
        </div>
    )
}

export default MovieReviews


const ReviewCard = ({ review }) => {

    if (!review) return null;

    const { owner, content, rating } = review

    return <div className="flex space-x-3">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
            {getNameInitial(owner.name)}
        </div>

        <div className="">
            <h1 className="dark:text-white text-secondary font-semibold text-lg">{owner.name}</h1>
            <RatingStar rating={rating} />
            <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
        </div>
    </div>
}