import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../components/form/Loading';
import PosterSelector from '../components/form/PosterSelector';
import Selector from '../components/form/Selector';
import Submit from '../components/form/Submit';
import { useNotification } from '../hooks';
import { commonInputClasses } from '../utils/theme';



const defaultActorInfo = {
    name: '',
    about: '',
    avatar: null,
    gender: ""
}


const genderOptions = [
    {
        title: 'Male',
        value: "male"
    },
    {
        title: 'Female',
        value: "female"
    },
    {
        title: 'Other',
        value: "other"
    }
]

const validateActor = ({avatar, name, about, gender}) =>{
    if(!name.trim()) return {error:"Actor name is missing!"}
    if(!about.trim()) return {error:"About section is missing!"}
    if(!gender.trim()) return {error:"Actor gender section is missing!"}
    if(avatar && !avatar.type?.startsWith('image')) return {error: "Invalid image!"}
    return {error: null}
}

const ActorForm = ({ title, btnTitle, onSubmit , busy , initialState}) => {

    const [actorInfo, setActorInfo] = useState(defaultActorInfo)
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const {updateNotification} = useNotification();

    const { name, about, gender } = actorInfo;

    const updatePosterForUI = (file) => {
        const url = (URL.createObjectURL(file));
        setSelectedAvatar(url);
    }

    const handleChange = ({ target }) => {
        const { name, value, files } = target;

        if (name === 'avatar') {
            const file = files[0];
            updatePosterForUI(file);
            return setActorInfo(prev => {
                return { ...prev, avatar: file }
            })
        }

        return setActorInfo(prev => {
            return { ...prev, [name]: value }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {error} = validateActor(actorInfo);
        if(error) return updateNotification("error", error);

        const formData = new FormData();

        for(let key in actorInfo){
            if(key) formData.append(key, actorInfo[key]);
        }

        onSubmit(formData);
    }


    useEffect(()=>{
        if(initialState){
            setActorInfo({...initialState, avatar:null});
            setSelectedAvatar(initialState.avatar);
        }
    },[initialState])


    return (
        <form onSubmit={handleSubmit} className='dark:bg-secondary bg-white p-3 w-[35rem] rounded-md'>
            <div className="flex justify-between items-cente mb-3">
                <h1 className='font-semibold text-xl dark:text-white text-primary'>{title}</h1>
                <div className='w-1/6'>
                   

                    {!busy &&  <Submit value={btnTitle} />}
                    {busy && <Loading />}
                </div>
            </div>


            <div className='flex space-x-2'>

                <div className='flex flex-col space-y-2'>
                    <PosterSelector accept='image/jpg, image/jpeg, image/png' label="Select Avatar" name='avatar' onChange={handleChange} className='w-36 h-36 aspect-square object-cover rounded' selectedPoster={selectedAvatar} />
                    <Selector options={genderOptions} label='Gender' value={gender} onChange={handleChange} name="gender" />

                </div>

                <div className='flex-grow flex flex-col space-y-2'>
                    <input value={name} name='name' onChange={handleChange} placeholder='Enter name' type='text' className={commonInputClasses + " border-b-2"} />
                    <textarea value={about} name='about' onChange={handleChange} placeholder='About' className={commonInputClasses + " border-b-2 resize-none h-full"}></textarea>
                </div>
            </div>



        </form>
    );
}

export default ActorForm;
