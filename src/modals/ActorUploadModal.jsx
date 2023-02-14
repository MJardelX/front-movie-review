
import React, { useState } from 'react';
import ActorForm from '../admin/ActorForm';
import { createActor } from '../api/actor';
import { useNotification } from '../hooks';
import ModalContainer from './ModalContainer';

const ActorUploadModal = ({visible, onClose}) => {

    const {updateNotification} = useNotification();
    const [busy, setBusy] = useState(false);



    const handleSubmit = async (data)=>{

        setBusy(true)
        const {error} = await createActor(data)
        setBusy(false)
        if(error) return  updateNotification('error', error);
        
        updateNotification('success', "Actor created successfully.");
        onClose();
    }

    return (
       <ModalContainer ignoreContainer visible={visible} onClose={onClose}>

            <ActorForm busy={busy} onSubmit={handleSubmit} title="Create Actor" btnTitle='Create' />
       </ModalContainer>
    );
}

export default ActorUploadModal;
