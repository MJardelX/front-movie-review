import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = (props) => {
    return (
        <Link to={props.to} className="dark:text-dark-subtle text-light-subtle
                                       dark:hover:text-white   hover:text-primary
                                       cursor-pointer">
            {props.children}
        </Link>
    );
}

export default CustomLink;
