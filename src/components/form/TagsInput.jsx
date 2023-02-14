import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const TagsInput = ({ name, onChange, value }) => {

    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const input = useRef();
    const tagsInput = useRef();


    useEffect(() => {
        input.current?.scrollIntoView(false);
    }, [tag])

    useEffect(() => {
        onChange(tags);
    }, [tags, onChange])


    useEffect(()=>{
        if(value.length) setTags(value)
    }, [value])


    const handleOnChange = ({ target }) => {
        const { value } = target;
        // setTag(value)
        if (value !== ",") setTag(value);
    }

    const handleKeyDown = ({ key }) => {
        if (key === ',' || key === 'Enter') {
            if (!tag) return;

            if (tags.includes(tag)) return setTag('');

            setTags(prevTags => {
                return [...prevTags, tag];
            })
            setTag("");
        }

        if (key === 'Backspace' && tags.length && !tag) {
            const newTags = tags.filter((_, index) => index !== tags.length - 1)
            setTags(newTags);
        }
    }

    const removeTag = (tagToRemove) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags([...newTags]);
    }

    const handleOnFocus = () => {
        tagsInput.current.classList.remove('dark:border-dark-subtle', 'border-light-subtle')
        tagsInput.current.classList.add('dark:border-white', 'border-primary')
    }

    const handleOnBlur = () => {
        tagsInput.current.classList.remove('dark:border-white', 'border-primary')
        tagsInput.current.classList.add('dark:border-dark-subtle', 'border-light-subtle')
    }

    return (
        <div onKeyDown={handleKeyDown}
            ref={tagsInput}
            className="border-2 bg-transparent 
                     dark:border-dark-subtle border-light-subtle
                     px-2 h-10 rounded w-full flex items-center space-x-2
                     overflow-x-auto custom-scroll-bar transition">

            {tags.map(t => (
                <Tag key={t} onClick={() => removeTag(t)}> {t} </Tag>
            ))}

            <input
                ref={input}
                type="text"
                id={name}
                className='h-full bg-transparent outline-none
                         dark:text-white text-primary flex-grow'
                placeholder='Tags..'
                value={tag}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur} />
        </div>
    );
}

export default TagsInput;



const Tag = ({ children, onClick }) => {
    return (
        <span

            className='bg-transparent whitespace-nowrap
                     dark:bg-white bg-secondary
                     dark:text-primary text-white
                       hover:opacity-90
                       font-semibold
                       flex items-center text-sm px-2 py-[2px] rounded-md '>
            {children}
            <button className='ml-1' type='button' onClick={onClick}>
                <IoIosClose size={20} className="p-0" />
            </button>
        </span>
    )
}