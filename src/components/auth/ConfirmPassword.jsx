import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonModalClasses } from '../../utils/theme';
import Container from '../containers/Container';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { ImSpinner4 } from 'react-icons/im'
import { resetPassword, verifyPasswordResetToken } from '../../api/auth';
import { useNotification } from '../../hooks';
import { useEffect } from 'react';
import Loading from '../form/Loading';
import { useCallback } from 'react';


const ConfirmPassword = () => {

    const [password, setPassword] = useState({
        one: '',
        two: ''
    })

    const [isVerifying, setIsVerifying] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const { updateNotification } = useNotification();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);





    const isValidToken = useCallback(async () => {
        const response = await verifyPasswordResetToken(token, id);
        setIsVerifying(false);


        if (response.error) {
            setIsValid(false);
            navigate('/auth/reset-password', { replace: true });
            return;
        }

        if (!response.valid) {
            setIsValid(false);
            navigate('/auth/reset-password', { replace: true });
        }

        setIsValid(true);
    }, [token, id, navigate])

    
    useEffect(() => {
        isValidToken();
    }, [isValidToken])


    const handleChange = ({ target }) => {
        const { name, value } = target;
        setPassword(prevPass => {
            return {
                ...prevPass,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password.one.trim()) {
            return updateNotification('error', 'Password is missing!')
        }

        if (password.one.trim().length < 8) {
            return updateNotification('error', 'Password must be 8 characters long!')
        }

        if (password.one !== password.two) {
            return updateNotification('error', "Passwords don't match!")
        }


        setIsLoading(true);
        const response = await resetPassword({
            newPassword: password.one,
            userId: id,
            token
        });
        setIsLoading(false);



        if (response.error) {
            return updateNotification("error", response.error);
        }

        updateNotification("success", response.message);
        navigate('/auth/signin', { replace: true })
    }

    // const missingContent = 

    if (isVerifying) {
        return <FormContainer>
            <Container>
                <div className='flex justify-center items-center animate-pulse '>
                    <ImSpinner4 className='animate-spin text-3xl mr-3 dark:text-white text-primary' />
                    <h1 className='text-4xl font-semibold dark:text-white text-primary'> Please wait, we are verifying your token! </h1>
                </div>
            </Container>
        </FormContainer>
    }

    if (!isValid) {
        return <FormContainer>
            <Container>
                <h1 className='text-4xl font-semibold dark:text-white text-primary'> Sorry, the Token is invalid! </h1>
            </Container>
        </FormContainer>
    }


    return (

        <FormContainer>

            <Container >
                <form className={commonModalClasses + " w-96"} onSubmit={handleSubmit}>
                    <Title>Enter New Pasword</Title>
                    <FormInput onChange={handleChange} name="one" value={password.one} label="New Pasword" placeholder="**********" type="password" />
                    <FormInput onChange={handleChange} name="two" value={password.two} label="Confirm Password" placeholder="**********" type="password" />

                    {!isLoading && <Submit value="Confirm Password" />}
                    {isLoading && <Loading />}

                </form>
            </Container>
        </FormContainer>
    );
}

export default ConfirmPassword;
