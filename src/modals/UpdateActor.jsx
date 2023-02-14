
import React, { useState } from 'react';
import ActorForm from '../admin/ActorForm';
import { updateActor } from '../api/actor';
import { useNotification } from '../hooks';
import ModalContainer from './ModalContainer';

const UpdateActor = ({visible, onClose, initialState, onSuccess}) => {

    const {updateNotification} = useNotification();
    const [busy, setBusy] = useState(false);


    const handleSubmit = async (data)=>{

        setBusy(true)
        const {error} = await updateActor(data, initialState.id)
        setBusy(false)
        if(error) return  updateNotification('error', error);
        
        onSuccess();
        updateNotification('success', "Actor updated successfully.");
        onClose();
    }

    return (
       <ModalContainer ignoreContainer visible={visible} onClose={onClose}>
            <ActorForm initialState={initialState} busy={busy} onSubmit={handleSubmit} title="Update Actor" btnTitle='Update' />
       </ModalContainer>
    );
}

export default UpdateActor;
