import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar, } from 'react-icons/ai';
import Loading from './Loading';
import Submit from './Submit';






const createArray = (count) =>{
    return new Array(count).fill('');
}

const ratings = createArray(10);

const RatingForm = ({ onSubmit, busy, initialState }) => {

    const [selectedRatings, setSelectedRatings] = useState([]);
    const [content, setContent] = useState("")

    const handleMouseEnter = (index) => {
        const ratings = createArray(index +1)
        setSelectedRatings([...ratings])
    }

    const handleMouseLeave = (index) => {
        // if(index === 0) setSelectedRatings([])
        // const ratings = new Array(index + 1).fill(index);
        // setSelectedRatings([...ratings])
    }

    const handleOnChange = ({ target }) => {
        setContent(target.value)
    }

    const handleSubmit = () => {
        if (!selectedRatings.length) return;

        const data = {
            rating: selectedRatings.length,
            content
        }
        onSubmit(data);
    }

    useEffect(()=>{
        if(initialState){
            setContent(initialState.content);
            setSelectedRatings(createArray(initialState.rating));
        }
    }, [initialState])


    return (

        <div>
            <div className="p-5 w-72 dark:bg-black bg-white rounded space-y-3 flex flex-col items-center">

                <div className="relative text-highlight dark:text-highlight-dark flex items-center ">


                    <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />


                    <div className='flex absolute items-center top-1/2 -translate-y-1/2'>
                        <StarsFilled ratings={selectedRatings} onMouseEnter={handleMouseEnter} />
                    </div>
                </div>

                <textarea value={content} onChange={handleOnChange} className='bg-transparent w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none resize-none '></textarea>


                {!busy ? <Submit onClick={handleSubmit} value="Rate this Movie" /> : <Loading />}
            </div>
        </div>
    );
}

export default RatingForm;




const StarsOutlined = ({ ratings, onMouseEnter }) => {

    return ratings.map((_, index) => {
        return <AiOutlineStar
            onMouseEnter={() => onMouseEnter(index)}
            className='cursor-pointer'
            key={index}
            size={24} />
    })

}

const StarsFilled = ({ ratings, onMouseEnter }) => {

    return ratings.map((_, index) => {
        return <AiFillStar
            onMouseEnter={() => onMouseEnter(index)}
            // onMouseLeave={() => handleMouseLeave(index)}
            className='cursor-pointer'
            key={index}
            size={24} />
    })

}