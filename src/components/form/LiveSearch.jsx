import React, { forwardRef, useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { commonInputClasses } from '../../utils/theme';


const LiveSearch = ({
    value = "",
    placeholder = "",
    results = [],
    selectedResultStyle,
    resultContainerStyle,
    inputStyle,
    renderItem = null,
    onChange = null,
    onSelect = null,
    name
}) => {

    const [displaySearch, setDisplaySearch] = useState(false);
    const [focusIndex, SetFocusIndex] = useState(-1);
    const [defaultValue, setDefaultValue] = useState("");

    const handleOnFocus = () => {
        if (results.length) setDisplaySearch(true);
    }

    const closeSearch = () => {
        setDisplaySearch(false);
        SetFocusIndex(-1);
    }


    const handleOnBlur = () => {
        setTimeout(() => {
            closeSearch();
        }, 100)
    }


    const handleSelection = (selectedItem) => {
        if (selectedItem) {
            onSelect(selectedItem);
            closeSearch();
        }
    }

    const handleKeyDown = ({ key }) => {
        let nextCount;
        const keys = ['ArrowDown', "ArrowUp", "Enter", "Escape"];

        if (!keys.includes(key)) return;

        if (key === 'ArrowDown') {
            nextCount = (focusIndex + 1) % results.length;
        }

        if (key === 'ArrowUp') {
            nextCount = (focusIndex + results.length - 1) % results.length;
        }

        if (key === 'Enter') {
            return handleSelection(results[focusIndex]);
        }

        if (key === 'Escape') {
            return closeSearch();
        }

        SetFocusIndex(nextCount);
    }

    const getInputStyle = () => {
        return inputStyle
            ? inputStyle
            : commonInputClasses + " border-2 rounded p-1 text-lg"
    }

    const handleChange = (e) =>{
        setDefaultValue(e.target?.value);
        onChange && onChange(e);
    }

    useEffect(()=>{
        setDefaultValue(value);
    },[value])



    useEffect(()=>{
        if(results.length) return setDisplaySearch(true);
        setDisplaySearch(false);
    },[results.length])

    return (
        <div className='relative'>
            <input type='text'
                className={getInputStyle()}
                placeholder={placeholder}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyDown={handleKeyDown}
                value={defaultValue}
                onChange={handleChange}
                name={name}
                id={name} />

            <SearchResults
                onSelect={handleSelection}
                focusIndex={focusIndex}
                visible={displaySearch}
                results={results}
                renderItem={renderItem}
                resultContainerStyle={resultContainerStyle}
                selectedResultStyle={selectedResultStyle} />

        </div>
    );
}
export default LiveSearch;



// const renderItem = ({ id, name, avatar }) => {
//     return (
//         <div className='flex'>
//             <img src={avatar} alt={name} className="w-12 h-12 rounded object-cover" />
//             <p className='dark:text-white text-primary font-semibold'>{name}</p>
//         </div>
//     )
// }


const SearchResults = ({ results = [], visible, focusIndex, onSelect, renderItem, resultContainerStyle,
    selectedResultStyle }) => {

    const resultContainer = useRef();

    useEffect(() => {
        resultContainer.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, [focusIndex])

    if (!visible) return null;

    return (
        <div className='absolute z-50 right-0 left-0 top-10 
        dark:bg-secondary bg-white shadow-md p-2 
          max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar'>
            {results.map((result, index) => {
                const getSelectedClass = () => {
                    return selectedResultStyle ? selectedResultStyle : "dark:bg-dark-subtle bg-light-subtle";
                }

                return (
                    <ResultCard
                        ref={index === focusIndex ? resultContainer : null}
                        key={index.toString()}
                        item={result}
                        renderItem={renderItem}
                        resultContainerStyle={resultContainerStyle}
                        selectedResultStyle={index === focusIndex ? getSelectedClass() : ""}
                        onMouseDown={() => onSelect(result)}
                    />
                );
            })}
        </div>
    )
}



const ResultCard = forwardRef((props, ref) => {

    const {
        item,
        renderItem,
        resultContainerStyle,
        selectedResultStyle,
        onMouseDown
    } = props

    const getClasses = () => {
        if (resultContainerStyle) return resultContainerStyle + " " + selectedResultStyle;

        return (
            selectedResultStyle + ` cursor-pointer rounded overflow-hidden
            dark:hover:bg-dark-subtle hover:bg-light-subtle 
            transition `
        );
    }

    return (
        <div
            ref={ref} onMouseDown={onMouseDown} className={getClasses()}>
            {renderItem(item)}
        </div>
    )
})



// ({
//     renderItem,
//     item,
//     onClick,
//     resultContainerStyle,
//     selectedResultStyle,
//     innerRef }) => {
// }