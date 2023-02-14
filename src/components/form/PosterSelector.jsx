import React from 'react';

const commonPosterUI = `flex justify-center items-center border border-dashed rounded aspect-video
dark:border-dark-subtle border-light-subtle 
dark:text-white text-primary
cursor-pointer`


const PosterSelector = ({ name, selectedPoster, onChange, accept, className, label="Select Poster" }) => {
    return (
        <div>
            <input accept={accept} onChange={onChange} name={name} id={name} type="file" hidden />
            <label htmlFor={name}>
                {selectedPoster ?  <img className={commonPosterUI+ " object-cover "+ className} src={selectedPoster} alt="Poster" /> : <PosterUI label={label} className={className} />}
            </label>
        </div>
    );
}
export default PosterSelector;


const PosterUI = ({className, label}) => {
    return (
        <div className={commonPosterUI+ ' '+className}>
            <span className='dark:text-dark-subtle text-light-subtle'>{label}</span>
        </div>
    )
}