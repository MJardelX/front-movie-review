import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovieForAdmin } from '../api/movie';
import MovieListItem from '../components/MovieListItem';
import NotFoundText from '../components/NotFoundText';
import { useMovies, useNotification } from '../hooks';

const SearchMovies = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('title');
    const {updateNotification} = useNotification();
    // const [movies, setMovies] = useState([]);

    const {resultMovies, searchMovies, resultNotFound } = useMovies();

    

    useEffect(()=>{
        if(query.trim()) searchMovies(query);
    }, [query])
    


    const handleAfterDelete = () =>{
        
    } 


    const handleAfterUpdate = ()=>{
        searchMovies(query);
    }



    return (
        <div className='p-5 space-y-3'>
            <NotFoundText text='Record notFound!' visible={resultNotFound} />


            {!resultNotFound && resultMovies.map(movie=>{
                return <MovieListItem movie={movie} key={movie.id} afterDelete={handleAfterDelete}  afterUpdate={handleAfterUpdate}/>
            })}
        </div>
    );
}

export default SearchMovies;
