
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar, } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { addReview, updateReview } from '../api/review';
import RatingForm from '../components/form/RatingForm';
import Submit from '../components/form/Submit';
import { useNotification } from '../hooks';
import ModalContainer from './ModalContainer';


const EditRatingModal = ({ visible, onClose, onSucced, initialState }) => {

    const {movieId} = useParams();
    const {updateNotification} = useNotification();
    const [busy, setBusy] = useState();


    const handleSubmit =  async (data) =>{
        setBusy(true)
        const {error, message} = await updateReview(initialState.id, data);
        setBusy(false);

        if(error) return updateNotification('error', error);

        onSucced({...data})
        updateNotification("success", "Review updated successfully!!!");
        onClose();
    }

    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <RatingForm onSubmit={handleSubmit} busy={busy} initialState={initialState}/>
        </ModalContainer>
    )
}

export default EditRatingModal;
