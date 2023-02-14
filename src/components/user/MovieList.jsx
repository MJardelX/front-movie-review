import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getPoster } from '../../utils/helper';
import GridContainer from '../containers/GridContainer';
import RatingStar from '../RatingStar';

const trimTitle = (text = '') => {
    if (text.length <= 20) return text;
    return text.substring(0, 20) + '...'
}

const MovieList = ({ movies = [], title }) => {

    if (!movies.length) return null;

    return (

        <div className='mb-3'>
           {title ? <h1 className='dark:text-white text-primary text-2xl mb-2 font-semibold'>{title}</h1>: null}

            <GridContainer>
                {
                    movies.map((movie) => {
                        return <ListItem key={movie.id} movie={movie}/>
                    })
                }
            </GridContainer>
        </div>
    );
}

export default MovieList;


const ListItem = ({ movie }) => {

    const { title, poster, reviews, id, responsivePosters} = movie;


    return <Link to={'/movie/'+ id}>
        <img className='aspect-video object-cover w-full' src={getPoster(responsivePosters) || poster} alt={title} />
        <h1
            title={title}
            className='dark:text-white text-primary text-lg font-semibold'>
            {trimTitle(title)}
        </h1>
       
       <RatingStar  rating={reviews.ratingAvg}/>
    </Link>
}