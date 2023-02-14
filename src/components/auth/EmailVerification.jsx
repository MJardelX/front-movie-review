import React from 'react';
import Container from '../containers/Container';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../form/FormContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendEmailVerificationToken, verifyUserEMail } from '../../api/auth';
import Loading from '../form/Loading';
import { useAuth, useNotification } from '../../hooks';

const OTP_LENGTH = 6;
let currentOtpIndex;
const isValidOTP = (otp) => {
    let valid = true;

    for (let val of otp) {
        if (isNaN(parseInt(val))) {
            return false;
        };
    }

    return valid;
}

const EmailVerification = () => {
    const inputRef = useRef();
    const { state } = useLocation();
    const user = state?.user;
    const navigate = useNavigate();

    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
    const [activeOtpIndex, setActiveOtpIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingResend, setIsLoadingResend] = useState(false);

    const { updateNotification } = useNotification();
    const { isAuth, authInfo } = useAuth();
    const { isLoggedIn, profile } = authInfo;
    const isVerified = profile?.isVerified;

    useEffect(() => {
        if (!user) navigate('/not-found')
        if (isLoggedIn && isVerified) navigate('/')

    }, [user, isLoggedIn, isVerified, navigate])

    // if(!user){
    //     return null;
    // }


    const focusNextInputField = index => {
        setActiveOtpIndex(index + 1);
    }

    const focusPrevInputField = (index) => {
        let nextIndex;
        const diff = index - 1;
        nextIndex = diff !== 0 ? diff : 0;
        setActiveOtpIndex(nextIndex);
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace") {
            focusPrevInputField(index);
        }
        currentOtpIndex = index;
        //console.log(currentOtpIndex)
    };


    const handleOtpChange = (event, index) => {
        //console.log(currentOtpIndex)
        const { value } = event.target
        if (!value) {
            focusPrevInputField(currentOtpIndex);
        } else {
            focusNextInputField(currentOtpIndex);
        }

        setOtp((prevOtp) => {
            const newOtp = prevOtp.concat();
            newOtp[currentOtpIndex] = value.substring(value.length - 1, value.length);
            return newOtp;
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidOTP(otp)) {
            return updateNotification("error", "Invalid OTP!")
        }

        setIsLoading(true)
        const response = await verifyUserEMail({ OTP: otp.join(''), userId: user.id })
        setIsLoading(false)
        if (response.error) return updateNotification("error", response.error);

        updateNotification("success", response.message);
        localStorage.setItem('auth-token', response.user.token);
        isAuth();
    }


    const handleResendOTP = async () => {
        setIsLoadingResend(true);
        const response = await resendEmailVerificationToken(profile.id);
        setIsLoadingResend(false);

        if (response.error) return updateNotification('error', response.error);
        updateNotification('success', response.message);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOtpIndex]);

    return (
        <FormContainer>

            <Container >
                <form className={commonModalClasses} onSubmit={handleSubmit}>
                    <div>
                        <Title>Please enter the OTP to verify your account</Title>
                        <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent to your email</p>
                    </div>
                    <div className='flex justify-around items-center '>

                        {otp.map((value, index) => {
                            return (
                                <input
                                    key={index}
                                    type='number'
                                    value={otp[index]}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    name={index}
                                    ref={activeOtpIndex === index ? inputRef : null}
                                    className='w-12 h-12 border-2 
                                      dark:border-dark-subtle border-light-subtle
                                        rounded outline-none 
                                        dark:focus:border-white focus:border-primary
                                        bg-transparent text-center 
                                        dark:text-white text-primary text-lg text-semibold spin-button-none '/>
                            )
                        })}
                    </div>

                    <div className='flex flex-col items-center '>
                        {!isLoading && (
                            <Submit value="Verify Account" />
                        )}
                        {isLoading && (
                            <Loading />
                        )}

                        {!isLoadingResend && (
                            <button onClick={handleResendOTP} type='button' className='dark:text-dark-subtle text-blue-500  hover:underline mt-2'>Send OTP verification token </button>
                        )}

                        {isLoadingResend && (
                            <button type='button' className='dark:text-dark-subtle text-blue-500  hover:underline mt-2'> ... </button>
                        )}
                    </div>



                </form>
            </Container>
        </FormContainer>
    );
}

export default EmailVerification;
