import React, { useState } from 'react';
import { forgetPassword } from '../../api/auth';
import { useNotification } from '../../hooks';
import { isValidEmail } from '../../utils/helper';
import { commonModalClasses } from '../../utils/theme';
import Container from '../containers/Container';
import CustomLink from '../form/CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Loading from '../form/Loading';
import Submit from '../form/Submit';
import Title from '../form/Title';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const { updateNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = ({ target }) => {
        const { value } = target;
        setEmail(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidEmail(email)) {
            return updateNotification('error', 'Invalid email!')
        }

        setIsLoading(true);
        const response = await forgetPassword(email);
        setIsLoading(false);
        if (response.error) {
            return updateNotification('error', response.error)
        }

        updateNotification('success', response.message)
    }

    return (

        <FormContainer>
            <Container >
                <form className={commonModalClasses + " w-96"} onSubmit={handleSubmit}>
                    <Title>Please enter your Email</Title>
                    <FormInput onChange={handleChange} value={email} name="email" label="Email" placeholder="example@gmail.com" />
                    {isLoading && <Loading />}
                    {!isLoading && <Submit value="Send Link" />}
                    <div className="flex justify-between">
                        <CustomLink to="/auth/signin" >
                            Sign In
                        </CustomLink>
                        <CustomLink to="/auth/signup">
                            Sing Up
                        </CustomLink>
                    </div>
                </form>
            </Container>

        </FormContainer>
    );
}

export default ForgetPassword;
