import React from 'react';
import { BsFillSunFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from '../../hooks';
import Container from '../containers/Container';
import AppSearchForm from '../form/AppSearchForm';

const Navbar = () => {

    const { toggleTheme } = useTheme();

    const { authInfo, handleLogout } = useAuth();
    const { isLoggedIn } = authInfo;

    const navigate = useNavigate();


    const handleSearchSubmit = (query) => {
        navigate('/movie/search?title=' + query);
    }

    return (
        <div className="bg-secondary max-w-full shadow-sm shadow-gray-500">
            <Container className="p-2">

                <div className="flex justify-between items-center">
                    <Link to="/">
                        <img src="./logo.png" alt="" className='sm:h-10 h-6 border-white w-30' />
                    </Link>

                    <ul className='flex items-center sm:space-x-4 space-x-2'>
                        <li>
                            <button onClick={toggleTheme} className='border border-white dark:bg-white bg-dark-primary p-1 rounded sm:text-2xl text-lg'>
                                <BsFillSunFill className='dark:text-primary text-white' />
                            </button>
                        </li>
                        <li>
                            <AppSearchForm
                                placeholder='Search'
                                inputClassName='border-dark-subtle text-white focus:border-white sm:w-outo w-40 sm:text-lg '
                                onSubmit={handleSearchSubmit} />
                        </li>
                        <li className='text-white font-semibold text-lg'>
                            {isLoggedIn && <button type='button' onClick={handleLogout}>
                                log out
                            </button>}

                            {!isLoggedIn && <Link to="/auth/signin">
                                Login
                            </Link>}
                        </li>
                    </ul>

                </div>
            </Container>
        </div>
    );
}

export default Navbar;
