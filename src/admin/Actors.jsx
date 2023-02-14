import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { deleteActor, getActors, searchActor } from '../api/actor';
import { useNotification, useSearch } from '../hooks';
import NextAndPrevBtn from '../components/NextAndPrevBtn';
import UpdateActor from '../modals/UpdateActor';
import AppSearchForm from '../components/form/AppSearchForm';
import NotFound from '../components/NotFound';
import NotFoundText from '../components/NotFoundText';
import ConfirmModal from '../modals/ConfirmModal';


let currentPageNo = 0;
const limit = 20;
const Actors = () => {

    const [actors, setActors] = useState([]);
    const [results, setResults] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [busy, setBusy] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const { updateNotification } = useNotification();

    const { handleSearch, resetSearch, resultNotFound } = useSearch()

    const fetchActors = async (pageNo) => {
        const { profiles, error } = await getActors(pageNo, limit);
        if (error) return updateNotification("error", error);

        if (!profiles.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true)
        }

        setActors(profiles)
    }

    const handleOnPrevClick = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false)
        currentPageNo -= 1;
        fetchActors(currentPageNo);
    }

    const handleOnNexClick = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchActors(currentPageNo);
    }

    const handleOnEditClick = (profile) => {
        setShowUpdateModal(true);
        setSelectedProfile(profile);
    }

    const hideUpdateModal = () => {
        setShowUpdateModal(false)
    }

    const handleOnActorUpdated = () => {
        fetchActors(currentPageNo);
    }

    const handleOnSearchSubmit = (value) => {
        handleSearch(searchActor, value, setResults);
        //console.log(value)
    }

    const handleSearchFormReset = () => {
        resetSearch();
        setResults([])
    }

    const handleOnDeleteClick = (profile) => {
        setSelectedProfile(profile);
        setShowConfirmModal(true);
    }

    const hideDeleteModal = () => {
        setShowConfirmModal(false)
    }

    const handleOnDeleteConfirm = async () => {
        // setBusy(true);
        // const {error} = await deleteActor(selectedProfile.id)
        // setBusy(false);
        // if(error) return updateNotification("error", error);
        // updateNotification("success", "Actor deleted successfully!");
        // hideDeleteModal();
        // fetchActors();
    }




    useEffect(() => {
        fetchActors(currentPageNo);
    }, [])

    //console.log(results)
    //console.log(resultNotFound)

    return (
        <>
            <div className="p-5">
                <div className="flex justify-end mb-4">
                    <AppSearchForm onReset={handleSearchFormReset} showResetIcon={results.length || resultNotFound} onSubmit={handleOnSearchSubmit} placeholder='Search Actors' />
                </div>

                <NotFoundText text='Record not found!' visible={resultNotFound} />


                <div className="grid grid-cols-4 gap-5  ">
                    {results.length || resultNotFound ? results.map(actor => {
                        return <ActorProfile key={actor.id} profile={actor} onEditClick={() => handleOnEditClick(actor)}  onDeleteClick={() => handleOnDeleteClick(actor)} />
                    }) : actors.map(actor => {
                        return <ActorProfile key={actor.id} profile={actor} onEditClick={() => handleOnEditClick(actor)}  onDeleteClick={() => handleOnDeleteClick(actor)}/>
                    })}
                </div>

                {!results.length && !resultNotFound ? <NextAndPrevBtn onNextClick={handleOnNexClick} onPrevClick={handleOnPrevClick} /> : null}
            </div>

            <ConfirmModal 
            visible={showConfirmModal} 
            onCancel={hideDeleteModal} 
            onConfirm={handleOnDeleteConfirm}
            busy={busy} 
            title='Are you sure?' 
            subtitle='This action will remove this profile permanently
            '/>
            <UpdateActor onSuccess={handleOnActorUpdated} visible={showUpdateModal} onClose={hideUpdateModal} initialState={selectedProfile} />
        </>
    );
}

export default Actors;



const ActorProfile = ({ profile, onEditClick, onDeleteClick}) => {
    const [showOptions, setShowOptions] = useState(false);
    const acceptedNamelength = 15;

    const handleOnMouseEnter = () => {
        setShowOptions(true);
    }

    const handleOnMouseLeave = () => {
        setShowOptions(false);
    }

    if (!profile) return null;

    const { name, avatar, about = "" } = profile


    const getName = (name) => {
        if (name.length <= acceptedNamelength) return name;

        return name.substring(0, acceptedNamelength) + "..."
    }



    return (
        <div className='dark:bg-secondary bg-white shadow dark:shadow h-20 rounded overflow-hidden'>

            <div className="flex cursor-pointer relative h-full" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                <img className='w-20 h-20 object-cover aspect-square' src={avatar} alt={name} />

                <div className='px-2 '>
                    <h1 className='text-xl text-primary dark:text-white whitespace-nowrap'>{getName(name)}</h1>
                    <p className='text-primary dark:text-white opacity-70'>{about.substring(0, 50)}</p>
                </div>

                <Options visible={showOptions} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>
            </div>

        </div>
    )
}



const Options = ({ visible, onDeleteClick, onEditClick }) => {

    if (!visible) return null;

    return (
        <div className='absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm text-primary dark:text-white flex items-center justify-center space-x-5'>
            <button onClick={onDeleteClick} className='p-2 rounded-full bg-red-500 text-white hover:opacity-80 transition' type='button'>
                <BsTrash />
            </button>
            <button onClick={onEditClick} className='p-2 rounded-full bg-yellow-500 text-white hover:opacity-80 transition' type='button'>
                <BsPencilSquare />
            </button>
        </div>
    )
}