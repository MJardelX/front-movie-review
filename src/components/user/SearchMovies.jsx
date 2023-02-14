import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLatestUploads, searchPublicMovies } from '../../api/movie';
import MovieListItem from '../../components/MovieListItem';
import NotFoundText from '../../components/NotFoundText';
import { useMovies, useNotification } from '../../hooks';
import Container from '../containers/Container';
import MovieList from './MovieList';

const SearchMovies = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('title');
    const { updateNotification } = useNotification();
    // const [movies, setMovies] = useState([]);

    const { resultMovies, searchMoviesForUsers, resultNotFound } = useMovies();

    useEffect(() => {
        if (query.trim()) searchMoviesForUsers(query);
    }, [query])

    console.log(resultMovies)

    return (
        <div className='dark:bg-primary bg-white min-h-screen border border-primary py-8'>

            <Container className="px-2 xl:p-0">
                <NotFoundText text='Record notFound!' visible={resultNotFound} />
                <MovieList movies={resultMovies} />
            </Container>
        </div>
    );
}

export default SearchMovies;
