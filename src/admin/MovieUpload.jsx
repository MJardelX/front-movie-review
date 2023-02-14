import React from 'react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { uploadMovie, uploadTrailer } from '../api/movie';
import { useNotification } from '../hooks';
import ModalContainer from '../modals/ModalContainer';
import MovieFrom from './MovieForm';


// const initialMovieData = {
//     title: "",
//     storyLine: "",
//     tags: [],
//     cast: [],
//     director: {},
//     writers: [],
//     releaseDate: "",
//     poster: null,
//     genres: [],
//     type: "",
//     language: "",
//     status: "",
//     trailer: {
//         url: "",
//         public_id: ""
//     }
// }


const MovieUpload = ({ visible, onClose }) => {
    const [busy, setBusy] = useState(false)
    const [videoSelected, setVideoSelected] = useState(false)
    const [videoUploaded, setVideoUploaded] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const { updateNotification } = useNotification();
    const [videoInfo, setVideoInfo] = useState({});


    const resetState = () =>{
        setVideoUploaded(false);
        setVideoSelected(false);
        setUploadProgress(0);
        setVideoInfo({});
    }

    const handleChange = (file) => {
        const formData = new FormData();
        formData.append('video', file);
        setVideoSelected(true);
        handleUploadTrailer(formData);
    }


    const handleUploadTrailer = async (formData) => {
        const { error, url, public_id } = await uploadTrailer(formData, setUploadProgress);
        if (error) {
            return updateNotification("error", error)
        }
        setVideoUploaded(true);
        setVideoInfo({ url, public_id });
    }


    const handleTypeError = (error) => {
        updateNotification('error', error || "Couldn't upload file")
    }

    const getUploadProgressValue = () => {
        if (!videoUploaded && uploadProgress >= 100) {
            return 'Processing'
        }

        return `Upload progress ${uploadProgress}%`
    }

    const handleSubmit = async (data) => {
        if (!videoInfo.url || !videoInfo.public_id) return updateNotification('error', "Trailer is missing!")

        data.append('trailer', JSON.stringify(videoInfo));

        setBusy(true);
        const res = await uploadMovie(data);
        setBusy(false);

        if(res.error) return updateNotification("error", res.error);


        updateNotification("success", "Movie successfuly uploaded!")
        resetState();
        onClose();
    }


    return (
        // onClose={onClose}
        <ModalContainer visible={visible}  >

            <div className="mb-5">
                <UploadProgress
                    visible={videoSelected && !videoUploaded}
                    message={getUploadProgressValue()}
                    width={uploadProgress} />
            </div>


            {!videoSelected && (<TrailerSelector
                visible={!videoSelected}
                onTypeError={handleTypeError}
                handleChange={handleChange}
            />)}

            {videoSelected && <MovieFrom busy={busy} onSubmit={handleSubmit} />}


        </ModalContainer>

    )

}
export default MovieUpload;




const TrailerSelector = ({ visible, handleChange, onTypeError }) => {

    if (!visible) return null;

    return (
        <div className="h-full flex items-center justify-center  ">

            <FileUploader onTypeError={onTypeError} handleChange={handleChange} types={['mp4', 'avi']}>
                <label className='w-48 h-48 border border-dashed 
                                      dark:border-dark-subtle border-light-subtle
                                      rounded-full flex flex-col items-center justify-center 
                                      dark:text-white text-primary
                                      cursor-pointer'>
                    <AiOutlineCloudUpload className='dark:text-white text-primary' size={80} />
                    <p>Drop your file here!</p>
                </label>
            </FileUploader>
        </div>
    );
}



const UploadProgress = ({ message, width, visible }) => {

    if (!visible) return null;

    return (
        <div className="w-full m-0">
            <div className="dark:bg-black bg-white drop-shadow-xl rounded p-2">
                <div className="h-3 dark:bg-dark-sublte bg-light-subtle overflow-hidden">
                    <div style={{ width: width + '%' }}
                        className="w-[50%] h-full dark:bg-white bg-secondary" />
                </div>
                <p className='font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1 mb-0'>{message}</p>
            </div>
        </div>
    )
}