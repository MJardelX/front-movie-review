import React from 'react';
import HeroSlidShow from '../user/HeroSlidShow';
import NotVerified from '../user/NotVerified';
import TopRatedMovies from '../user/TopRatedMovies';
import TopRatedTVSeries from '../user/TopRatedTVSeries';
import TopRatedWebSeries from '../user/TopRatedWebSeries';
import Container from './Container';

const Home = () => {


    return (
        <div className='dark:bg-primary bg-white min-h-screen border border-primary'>
            <NotVerified />

            <Container className="px-2 xl:p-0">

                <HeroSlidShow />
                <div className='space-y-3 py-8'></div>
                <TopRatedMovies />
                <TopRatedWebSeries />
                <TopRatedTVSeries />

            </Container>

        </div>
    );
}

export default Home;
