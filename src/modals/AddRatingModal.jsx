import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar, } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { addReview } from '../api/review';
import RatingForm from '../components/form/RatingForm';
import Submit from '../components/form/Submit';
import { useNotification } from '../hooks';
import ModalContainer from './ModalContainer';


const AddRatingModal = ({ visible, onClose, onSucced }) => {

    const {movieId} = useParams();
    const {updateNotification} = useNotification();
    const [busy, setBusy] = useState();


    const handleSubmit =  async (data) =>{
        setBusy(true);
        const {error, message} = await addReview(movieId, data);
        setBusy(false);
        if(error) return updateNotification("error", error);

        updateNotification("success", "Reviw added successfully!");
        onSucced();
    }

    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
            <RatingForm onSubmit={handleSubmit} busy={busy}/>
        </ModalContainer>
    )
}

export default AddRatingModal;
