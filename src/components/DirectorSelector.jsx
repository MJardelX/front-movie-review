import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { searchActor } from '../api/actor';
import { useSearch } from '../hooks';
import { renderItem } from '../utils/helper';
import LiveSearch from './form/LiveSearch';
import Label from './Label';

const DirectorSelector = ({onSelect, initialVal}) => {

    const [value, setValue] = useState("");
    const [profiles, setProfiles] = useState([]);
    const {handleSearch, resetSearch} = useSearch();
 

    const handleOnChange  = ({target}) =>{
        const {value} = target;
        setValue(value);
        handleSearch(searchActor, value, setProfiles);
    }


    const handleOnSelect = (profile) =>{
        setValue(profile.name);
        onSelect(profile);
        setProfiles([])
        resetSearch();
    }

    //console.log(initialVal)
    //console.log("reload")

    useEffect(()=>{
        if(initialVal) {
            //console.log(initialVal)
            setValue(initialVal)
        }
    }, [initialVal])

    return (
        <div>
            <Label htmlFor="director">Director</Label>
            <LiveSearch
                name="director"
                results={profiles}
                placeholder="Search profile"
                renderItem={renderItem}
                onSelect={handleOnSelect}
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default DirectorSelector;
