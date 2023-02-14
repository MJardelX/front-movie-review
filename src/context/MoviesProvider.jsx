
import React, {createContext, useState} from 'react';
import { getMovies, searchMovieForAdmin, searchPublicMovies } from '../api/movie';
import { useNotification } from '../hooks';

export const MovieContext = createContext();




const limit = 15;
let currentPageNo = 0;
const MoviesProvider = ({children}) =>{


    const [movies, setMovies] = useState([])
    const [latestUploads, setLatestUploads] = useState([]);
    const [resultMovies, setResultMovies] = useState([])

    const [reachedToEnd, setReachedToEnd] = useState(false);
    const { updateNotification } = useNotification();
    const [resultNotFound, setResultNotFound] = useState(false);



    const searchMovies = async (value) =>{
        const {error, results} = await searchMovieForAdmin(value);
        if(error) return updateNotification("error", error);

        if(!results.length){
            setResultNotFound(true);
            return setResultMovies([])
        }

        setResultNotFound(false);
        setResultMovies(results)
    }

    const searchMoviesForUsers = async (value) =>{
        const {error, results} = await searchPublicMovies(value);
        if(error) return updateNotification("error", error);

        if(!results.length){
            setResultNotFound(true);
            return setResultMovies([])
        }

        setResultNotFound(false);
        setResultMovies(results)
    }





    const resetSearch = () =>{
        setResultMovies([]);
        setResultNotFound(false);
    }

    const fetchMovies = async (pageNo = currentPageNo) => {
        const { error, movies } = await getMovies(pageNo, limit)
        if (error) return updateNotification("error", error);

        if (!movies.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true)
        }
        setMovies([...movies]);
    }

    const fetchLatestUploads = async (qty= 5) => {
        const { error, movies } = await getMovies(0, qty);
        if (error) return updateNotification("error", error)

        setLatestUploads([...movies])
    }


    const fetchPreviousPage = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false)
        currentPageNo -= 1;
        fetchMovies(currentPageNo);
    }

    const fetchNextPage = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchMovies(currentPageNo);
    }

    return <MovieContext.Provider value={{
        movies,
        latestUploads,
        fetchMovies,
        fetchNextPage,
        fetchPreviousPage,
        fetchLatestUploads,
        searchMovies,
        resetSearch,
        resultNotFound,
        resultMovies,
        searchMoviesForUsers
    }}>
        {children}
    </MovieContext.Provider>
}

export default MoviesProvider;