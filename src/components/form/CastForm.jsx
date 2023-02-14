import React from 'react';
import { useState } from 'react';
import { searchActor } from '../../api/actor';
import { useNotification, useSearch } from '../../hooks';
import { renderItem } from '../../utils/helper';
import { commonInputClasses } from '../../utils/theme';
import LiveSearch from './LiveSearch';



const defaultCastInfo = {
    profile: {},
    roleAs: '',
    leadActor: false
}

const CastForm = ({onSubmit}) => {
    const [castInfo, setCastInfo] = useState(defaultCastInfo);
    const [profiles, setProfiles] = useState([]);
    const {updateNotification} = useNotification();
    const { leadActor, profile, roleAs } = castInfo;
    const {handleSearch, resetSearch} = useSearch();


    const handleChange = ({ target }) => {
        const { checked, name, value } = target;

        if (name === 'leadActor') {
            return setCastInfo(prev => {
                return { ...prev, leadActor: checked }
            })
        }

        setCastInfo(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleProfileSelect = (profile) => {
        setCastInfo(prev => {
            return { ...prev, profile }
        })


    }

    const handleSubmit = () => {
        // const { profile, roleAs } = castInfo;

        if(!profile.name) return updateNotification("error", "Cast profile is missing!");
        if(!roleAs.trim()) return updateNotification("error", "Cast role is missing!");

        setCastInfo({...defaultCastInfo, profile:{name:""}});
        onSubmit(castInfo);
        resetSearch();
        setProfiles([]);
    }

 
    const handleProfileChange = ({target}) =>{
        const {value} = target;
        const {profile} = castInfo;
        profile.name = value;
        setCastInfo({...castInfo, profile});
        handleSearch(searchActor, value, setProfiles);
    }



    return (
        <div className='flex items-center space-x-2'>
            <input
                type="checkbox"
                name='leadActor'
                value={leadActor}
                className='w-4 h-4'
                onChange={handleChange}
                title='Set as lead actor' />

            <LiveSearch
                placeholder='Search profile'
                value={profile.name}
                results={profiles}
                onSelect={handleProfileSelect}
                renderItem={renderItem} 
                onChange={handleProfileChange}/>
            <span
                className='dark:text-dark-subtle text-light-subtle
                         font-semibold'>
                as
            </span>


            <div className="flex-grow">
                <input
                    type='text'
                    placeholder='Role as'
                    className={commonInputClasses + " rounded p-1 border-2"}
                    value={roleAs}
                    name='roleAs'
                    onChange={handleChange} />
            </div>

            <button
                onClick={handleSubmit}
                type="button"
                className='dark:text-white text-primary
                dark:bg-primary bg-light-subtle 
                dark:hover:bg-white hover:bg-primary
                dark:hover:text-primary hover:text-white rounded p-1 font-semibold'>Add</button>
        </div>
    );
}

export default CastForm;
