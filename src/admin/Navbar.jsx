import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'
import { BiMoviePlay } from 'react-icons/bi'
import { HiUsers } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import { useAuth } from '../hooks';


const AdminNavbar = () => {
    const { handleLogout } = useAuth();
 
    return (
        <nav className='w-48 min-h-screen bg-secondary border-r border-gray-300'>
            <div className=' h-screen flex flex-col justify-between pl-5 sticky top-0'>

                <ul>
                    <li className='mb-8'>
                        <Link to='/'>
                            <img src="./logo.png" alt="logo" className='h-14 p-2'></img>
                        </Link>
                    </li>
                    <li>
                        <NavItem to='/'>
                            <AiOutlineHome />
                            <span >  Home </span>
                        </NavItem>
                    </li>
                    <li>
                        <NavItem to='/movies'>
                            <BiMoviePlay />
                            <span>Movies</span>
                        </NavItem>
                    </li>
                    <li>

                        <NavItem to='/actors'>
                            <HiUsers />
                            <span> Actors</span>
                        </NavItem>
                    </li>
                </ul>


                <div className='flex flex-col items-start pb-5'>
                    <span className='font-semibold text-white text-xl'>Admin</span>
                    <button onClick={handleLogout} className='flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1'>
                        <FiLogOut></FiLogOut>
                        <span> Log out</span>
                    </button>
                </div>
            </div>

        </nav>
    );
}

export default AdminNavbar;



const NavItem = (props) => {

    const commonClases = " flex items-center text-lg space-x-2 p-2 hover:opacity-80"

    return <NavLink className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400') + commonClases} to={props.to} >
        {props.children}
    </NavLink>
}