import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

const NotVerified = () => {



    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;

    const navigate = useNavigate()

    const navigateToVerification = () =>{
        //console.log('navigate')
        navigate('/auth/verification',{
            state: {
                user: authInfo.profile
            }
        })
    }


    return (
        <>
            {isLoggedIn && !isVerified && (
                <p className='text-lg text-center dark:bg-gray-200 bg-blue-50 p-2 w-full'>It looks like you haven't verified your account,&nbsp;
                    <button onClick={navigateToVerification} className=' text-blue-500 font-semibold hover:underline'>Click here to verify your account</button>
                </p>

            )}
        </>
    );
}

export default NotVerified;
