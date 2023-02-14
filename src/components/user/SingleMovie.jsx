import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleMovie } from '../../api/movie';
import { useAuth, useNotification } from '../../hooks';
import AddRatingModal from '../../modals/AddRatingModal';
import ProfileModal from '../../modals/ProfileModal';
import { convertReviewCount } from '../../utils/helper';
import Container from '../containers/Container';
import CustomButtonLink from '../form/CustomButtonLink';
import Title from '../form/Title';
import RatingStar from '../RatingStar';
import RelatedMovies from '../RelatedMovies';




const convertDate = (date = "") => {
    return date.split("T")[0];
}




const SingleMovie = () => {

    const [movie, setMovie] = useState({});
    const [selectedProfile, setSelectedProfile] = useState({});
    const [ready, setReady] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { updateNotification } = useNotification();
    const { movieId } = useParams();
    const navigate = useNavigate();

    const { authInfo } = useAuth();

    const fetchMovie = async () => {
        const { error, movie } = await getSingleMovie(movieId);
        if (error) updateNotification("error", error)
        setReady(true);
        setMovie(movie);
    }



    const handleOnRateMovie = () => {
        if (!authInfo.isLoggedIn) return navigate('/auth/signin');
        setShowRatingModal(true)
    }

    const hideRatingModal = () => {
        setShowRatingModal(false)
    }

    const handleSuccedRating = () => {
        setShowRatingModal(false);
        fetchMovie();
    }

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
        setShowProfileModal(true);
    }

    const hideProfileModal = () => {
        setShowProfileModal(false);
    }


    useEffect(() => {
        if (movieId) fetchMovie();
    }, [])


    const { type, releaseDate, language, trailer, poster, title, id, storyLine, genres = [], cast = [], writers = [], director = {}, reviews = {} } = movie;


    if (!ready) return <div className=" fixed inset-0 -z-50 flex justify-center items-center dark:bg-primary bg-white">
        <p className='text-light-subtle dark:text-dark-subtle animate-pulse text-4xl'>Loading...</p>
    </div>

    return (
        <div className='dark:bg-primary bg-white min-h-screen pb-7'>
            <Container className="xl:p-0 px-2">
                <video poster={poster} src={trailer} controls></video>

                <div className="flex justify-between items-center px-5">
                    <h1 className='xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3'>{title}</h1>

                    <div className='flex flex-col items-end'>
                        <RatingStar rating={reviews.ratingAvg} />
                        <CustomButtonLink clickable onClick={() => navigate("/movie/reviews/" + id)} label={convertReviewCount(reviews.reviewCount) + " Reviews"} />
                        <CustomButtonLink clickable onClick={handleOnRateMovie} label="Rate The Movie" />
                    </div>
                </div>


                <div className="px-5 space-y-3">
                    <p className="text-light-subtle dark:text-dark-subtle"> {storyLine} </p>

                    <ListWithLabel label='Director:'>
                        <CustomButtonLink label={director.name} clickable onClick={()=> handleProfileClick(director)}/>
                    </ListWithLabel>

                    <ListWithLabel label='Writers:'>
                        {writers.map(w => <CustomButtonLink key={w.id} label={w.name} clickable />)}
                    </ListWithLabel>

                    <ListWithLabel label='Cast:'>
                        {cast.map(c => {
                            return c.leadActor ? <CustomButtonLink key={c.profile.id} label={c.profile.name} clickable /> : null;
                        })}
                    </ListWithLabel>


                    <ListWithLabel label='Language:'>
                        <CustomButtonLink label={language} />
                    </ListWithLabel>

                    <ListWithLabel label='Release Date:'>
                        <CustomButtonLink label={convertDate(releaseDate)} />
                    </ListWithLabel>


                    <ListWithLabel label='Genres:'>
                        {genres.map(g => <CustomButtonLink key={g} label={g} />)}
                    </ListWithLabel>



                    <ListWithLabel label='Type:'>
                        <CustomButtonLink label={type} />
                    </ListWithLabel>

                    <CastProfiles cast={cast} />
                    <RelatedMovies movieId={movieId} />
                </div>

            </Container>

            <AddRatingModal visible={showRatingModal} onClose={hideRatingModal} onSucced={handleSuccedRating} />
            <ProfileModal  visible={showProfileModal} onClose={hideProfileModal} profileId={selectedProfile.id} />
        </div>
    );
}

export default SingleMovie;



const ListWithLabel = ({ children, label }) => {
    return (
        <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold"> {label} </p>
            {children}
        </div>
    )
}



const CastProfiles = ({ cast }) => {

    return <div className='mt-5'>
        <p className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl"> Cast: </p>
        <div className='flex flex-wrap  space-x-4'>
            {cast.map(c => {
                return <div key={c.profile.id} className="basis-28 flex flex-col items-center text-center mb-4">
                    <img className='w-20 h-20 aspect-square object-cover rounded-full' src={c.profile?.avatar} alt={c.profile.name} />
                    <CustomButtonLink label={c.profile.name} clickable />
                    <span className='text-light-subtle dark:text-dark-subtle text-sm'>as</span>
                    <p className='text-light-subtle dark:text-dark-subtle'> {c.roleAs}</p>
                </div>
            })}
        </div>
    </div>
}