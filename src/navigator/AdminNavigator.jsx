import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Actors from '../admin/Actors';
import Dashboard from '../admin/Dashboard';
import Header from '../admin/Header';
import Movies from '../admin/Movies';
import MovieUpload from '../admin/MovieUpload';
import AdminNavbar from '../admin/Navbar';
import SearchMovies from '../admin/SearchMovies';
import NotFound from '../components/NotFound';
import ActorUploadModal from '../modals/ActorUploadModal';

const AdminNavigator = () => {

    const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
    const [showActorUploadModal, setShowActorUploadModal] = useState(false);

    const hideMovieUploadModal= () =>{
        setShowMovieUploadModal(false)
    }
    const displayMovieUploadModal= useCallback( () =>{
        setShowMovieUploadModal(true)
    }, [setShowMovieUploadModal])

    const hideActorUploadModal= () =>{
        setShowActorUploadModal(false)
    }
    const displayActorUploadModal= useCallback( () =>{
        setShowActorUploadModal(true)
    }, [setShowActorUploadModal])



    return (
        <>
            <div className='flex dark:bg-primary bg-white'>
                <AdminNavbar />

                <div className="flex-1 max-w-screen-xl">
                    <Header
                        onAddMovieClick={displayMovieUploadModal}
                        onAddActorClick={displayActorUploadModal}
                    />

                    <Routes >
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/search" element={<SearchMovies />} />
                        <Route path="/actors" element={<Actors />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </div>

            </div>

            <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal}/>
            <ActorUploadModal visible={showActorUploadModal} onClose={hideActorUploadModal}/>
        </>


    );
}

export default AdminNavigator;
