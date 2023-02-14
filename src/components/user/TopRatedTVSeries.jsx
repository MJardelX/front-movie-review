import React, { useEffect, useState } from 'react';
import { getTopRatedMovies } from '../../api/movie';
import { useNotification } from '../../hooks';
import GridContainer from '../containers/GridContainer';
import { AiFillStar } from 'react-icons/ai';
import MovieList from './MovieList';

const TopRatedTVSeries = () => {

    const [movies, setMovies] = useState([]);
    const { updateNotification } = useNotification()

    const fetchMovies = async (signal) => {
        const { error, movies } = await getTopRatedMovies('TV Series', signal);
        if (error) return updateNotification("error", error);

        setMovies(movies);
    }


    useEffect(() => {
        const ac = new AbortController();
        fetchMovies(ac.signal);

        return () =>{
            ac.abort();
        }
    }, [])


    return <MovieList movies={movies} title="Viewers Choice (Web Series)" />
    
}

export default TopRatedTVSeries;
