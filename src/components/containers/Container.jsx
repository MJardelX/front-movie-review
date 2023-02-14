import React from 'react';

const Container = (props) => {
    return (
        <div className={'max-w-6xl mx-auto '+ props.className}>
            {props.children}
        </div>
    );
}

export default Container;
