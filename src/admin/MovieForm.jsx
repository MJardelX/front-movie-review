import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import DirectorSelector from '../components/DirectorSelector';
import CastForm from '../components/form/CastForm';
import GenresSelector from '../components/form/GenresSelector';
import Loading from '../components/form/Loading';
import PosterSelector from '../components/form/PosterSelector';
import Selector from '../components/form/Selector';
import Submit from '../components/form/Submit';
import TagsInput from '../components/form/TagsInput';
import Label from '../components/Label';
import LabelWithBadge from '../components/LabelWithBadge';
import ViewAllBtn from '../components/ViewAllBtn';
import WritersSelector from '../components/WritersSelector';
import { useNotification } from '../hooks';
import CastModal from '../modals/CastModal';
import GenresModal from '../modals/GenresModal';
import WritersModal from '../modals/WritersModal';
import { languageOptions, statusOptions, typeOptions } from '../utils/options';
import { commonInputClasses } from '../utils/theme';
import { validateMovie } from '../utils/validator';





const defaultMovieInfo = {
    title: "",
    storyLine: "",
    tags: [],
    cast: [],
    director: "",
    writers: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: ""
}




const MovieFrom = ({ onSubmit, busy, initialState, btnTitle="Upload" }) => {
    const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo })
    const [showWritersModal, setShowWritersModal] = useState(false)
    const [showCastModal, setShowCastModal] = useState(false)
    const [showGenresModal, setShowGenresModal] = useState(false)
    const { updateNotification } = useNotification();
    const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error } = validateMovie(movieInfo)
        if (error) return updateNotification("error", error);

        const { tags, genres, cast, writers, director, poster } = movieInfo;
        const formData = new FormData();
        const finalMovieInfo = { ...movieInfo }

        finalMovieInfo.tags = JSON.stringify(tags);
        finalMovieInfo.genres = JSON.stringify(genres);

        const finalCast = cast.map(c => ({
            actor: c.profile.id,
            roleAs: c.roleAs,
            leadActor: c.leadActor
        }));
        finalMovieInfo.cast = JSON.stringify(finalCast);

        if (writers.length) {
            const finalWriters = writers.map(w => w.id);
            finalMovieInfo.writers = JSON.stringify(finalWriters)
        }

        if (director.id) finalMovieInfo.director = director.id;

        if (poster) finalMovieInfo.poster = poster;

        //console.log(movieInfo)

        for (let key in finalMovieInfo) {
            //console.log(key, finalMovieInfo[key])
            formData.append(key, finalMovieInfo[key]);
        }

        onSubmit(formData);
    }


    const updatePosterForUI = (file) => {
        const url = (URL.createObjectURL(file));
        setSelectedPosterForUI(url);
    }


    const handleChange = ({ target }) => {
        const { value, name, files } = target;

        if (name === 'poster') {
            const poster = files[0];

            updatePosterForUI(poster);

            return setMovieInfo(prevState => {
                return { ...prevState, poster }
            })
        }

        setMovieInfo(prevState => {
            return { ...prevState, [name]: value }
        })
    }

    const updateTags = useCallback((tags) => {
        setMovieInfo(prevState => {
            return { ...prevState, tags }
        })
    }, [setMovieInfo])

    const { title, storyLine, writers, cast, tags, genres, type, language, status, releaseDate, director} = movieInfo


    const updateDirector = (profile) => {
        setMovieInfo(prevState => {
            return { ...prevState, director: profile }
        })
    }

    const updateCast = (cast) => {
        setMovieInfo(prevState => {
            const newCast = prevState.cast?.concat();
            newCast.push(cast)
            return { ...prevState, cast: newCast }
        })
    }

    const updateGenres = (genres) => {
        setMovieInfo(prevState => {
            return { ...prevState, genres }
        })
    }




    const hideWritersModal = () => {
        setShowWritersModal(false);
    }

    const displayWritersModal = () => {
        setShowWritersModal(true);
    }

    const hideCastModal = () => {
        setShowCastModal(false);
    }

    const displayCastModal = () => {
        setShowCastModal(true);
    }

    const hideGenresModal = () => {
        setShowGenresModal(false);
    }

    const displayGenresModal = () => {
        setShowGenresModal(true);
    }

    const updateWriters = (profile) => {
        const { writers } = movieInfo;

        for (let writer of writers) {
            if (writer.id === profile.id) {
                return updateNotification("warning", 'This profile is already selected!')
            }
        }

        setMovieInfo(prevState => {
            return { ...prevState, writers: [...writers, profile] }
        })
    }


    const handleWriterRemove = (profielId) => {
        const { writers } = movieInfo;
        const newWriters = writers.filter(w => w.id !== profielId);

        if (!newWriters.length) hideWritersModal();


        setMovieInfo(prevState => {
            return { ...prevState, writers: newWriters }
        })
    }

    const handleCastRemove = (castId) => {

        //console.log(castId)
        const { cast } = movieInfo;
        const newCast = cast.filter(c => c.profile?.id !== castId);

        if (!newCast.length) hideCastModal();

        setMovieInfo(prevState => {
            return { ...prevState, cast: newCast }
        })
    }

    useEffect(()=>{
        if(initialState) {
            setMovieInfo({...initialState, releaseDate: initialState.releaseDate.split('T')[0] , poster:null})
            setSelectedPosterForUI(initialState.poster)
        }
    }, [initialState])

    return (
        <>
            <div className='flex space-x-3 '>

                {/* Right side */}
                <div className="w-[70%] space-y-5 ">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <input

                            id="title"
                            type="text"
                            className={commonInputClasses + ' border-b-2 font-semibold text-xl'}
                            placeholder='Titanic'
                            value={title}
                            onChange={handleChange}
                            name='title' />
                    </div>

                    <div>
                        <Label htmlFor="storyLine">Story Line</Label>
                        <textarea
                            placeholder='Movie Story Line'
                            id="storyLine"
                            className={commonInputClasses + " border-b-2 resize-none h-20"}
                            value={storyLine}
                            onChange={handleChange}
                            name='storyLine'></textarea>
                    </div>

                    <div>
                        <div className='flex justify-between'>
                            <LabelWithBadge htmlFor="cast" badge={cast?.length}>
                                Add Cast & Crew
                            </LabelWithBadge>
                            <ViewAllBtn visible={cast.length} onClick={displayCastModal}>
                                View All
                            </ViewAllBtn>
                        </div>
                        <CastForm onSubmit={updateCast} />
                    </div>


                    <DirectorSelector onSelect={updateDirector} initialVal={director.name}/>

                    <div>
                        <div className='flex justify-between'>
                            <LabelWithBadge htmlFor="writers" badge={writers?.length}>Writers</LabelWithBadge>
                            <ViewAllBtn visible={writers.length} onClick={displayWritersModal}>View All</ViewAllBtn>
                        </div>

                        <WritersSelector onSelect={updateWriters} />
                    </div>


                    <div>

                        <Label htmlFor="tags">Tags</Label>
                        <TagsInput value={tags} name="tags" onChange={updateTags} />
                    </div>


                    <div className='flex flex-col'>
                        <Label htmlFor="releaseDate">Release Date</Label>

                        <input
                            id='releaseDate'
                            name='releaseDate'
                            onChange={handleChange}
                            type="date"
                            value={releaseDate}
                            className={commonInputClasses + " border-2 rounded p-1 w-[50%]"} />
                    </div>

                    {busy && <Loading />}
                    {!busy && <Submit value={btnTitle} type="button" onClick={handleSubmit} />}
                

                </div>


                {/* Left side */}
                <div className="w-[30%] space-y-5">

                    <PosterSelector accept='image/jpg, image/jpeg, image/png' selectedPoster={selectedPosterForUI} name="poster" onChange={handleChange} />
                    <div className='flex justify-center'>
                        <GenresSelector badge={genres.length} onClick={displayGenresModal} />
                    </div>

                    <Selector value={type} onChange={handleChange} name="type" options={typeOptions} label="Type" />
                    <Selector value={language} onChange={handleChange} name="language" options={languageOptions} label="Language" />
                    <Selector value={status} onChange={handleChange} name="status" options={statusOptions} label="Status" />
                </div>
            </div>

            <WritersModal
                onClose={hideWritersModal}
                profiles={writers}
                visible={showWritersModal}
                onRemoveClick={handleWriterRemove} />
            <CastModal
                onClose={hideCastModal}
                casts={cast}
                visible={showCastModal}
                onRemoveClick={handleCastRemove} />

            <GenresModal
                visible={showGenresModal}
                onClose={hideGenresModal}
                onSubmit={updateGenres}
                previousSelection={genres} />
        </>

    );
}
export default MovieFrom;







