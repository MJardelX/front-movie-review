import React, { useEffect, useState } from 'react';
import { createUserMethod } from '../../api/auth';
import { commonModalClasses } from '../../utils/theme';
import Container from '../containers/Container';
import CustomLink from '../form/CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { useNavigate } from 'react-router-dom';
import Loading from '../form/Loading';
import { useAuth, useNotification } from '../../hooks';
import { isValidEmail } from '../../utils/helper';


const validateUserInfo = ({ name, email, password }) => {
    const isValidName = /^[a-z A-Z]+$/

    if (!name.trim()) return { ok: false, error: 'Name is missing!' }
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" }

    if (!email.trim()) return { ok: false, error: 'Email is missing!' }
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" }

    if (!password.trim()) return { ok: false, error: 'Password is missing!' }
    if (!password.length > 8) return { ok: false, error: 'Password must be 8 characters long!' }

    return { ok: true, error: "" }
};


const SingUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = userInfo;
    const {updateNotification} = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const { authInfo } = useAuth();
    const { isLoggedIn} = authInfo;





    const handleChange = ({ target }) => {
        const { value, name } = target;

        setUserInfo((prevState) => {
            let newState = { ...prevState, [name]: value };
            return newState
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { ok, error } = validateUserInfo(userInfo);

        if (!ok) {
            return updateNotification('error', error)
        }

        setIsLoading(true);
        const response = await createUserMethod(userInfo);
        setIsLoading(false);

        if (response.error) {
            return updateNotification('error', response.error)
        };
        navigate('/auth/verification', {
            state: { user: response.user },
            replace: true
        });
        //console.log(response.user);
    }

    useEffect(()=>{
        if(isLoggedIn) {
            navigate('/');
        }
    },[isLoggedIn, navigate]);

    return (
        <FormContainer>
            <Container >


                <form className={commonModalClasses + ' w-80'} onSubmit={handleSubmit}>
                    <Title>Sign Up</Title>
                    <FormInput onChange={handleChange} value={name} name="name" label="Name" placeholder="John..." />
                    <FormInput onChange={handleChange} value={email} name="email" label="Email" placeholder="example@gmail.com" />
                    <FormInput onChange={handleChange} value={password} name="password" label="Password" placeholder="**********" type="password" />

                    {!isLoading && (
                        <Submit value="Sing Up" />
                    )}

                    {isLoading && (
                        <Loading />
                    )}


                    <div className="flex justify-between">
                        <CustomLink to="/auth/forget-password" >
                            Forget Password
                        </CustomLink>
                        <CustomLink to="/auth/signin">
                            Sign In
                        </CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>

    );
}

export default SingUp;
