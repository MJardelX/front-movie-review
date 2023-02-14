import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks';
import { isValidEmail } from '../../utils/helper';
import { commonModalClasses } from '../../utils/theme';

import Container from '../containers/Container';
import CustomLink from '../form/CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Loading from '../form/Loading';
import Submit from '../form/Submit';
import Title from '../form/Title';


const validateUserInfo = ({ name, email, password }) => {

    if (!email.trim()) return { ok: false, error: 'Email is missing!' }
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" }

    if (!password.trim()) return { ok: false, error: 'Password is missing!' }
    if (!password.length > 8) return { ok: false, error: 'Password must be 8 characters long!' }

    return { ok: true, error: "" }
};

const SingIn = () => {

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const { updateNotification } = useNotification();
    const { handleLogin, authInfo } = useAuth();
    const {isPending } = authInfo;
    // const navigate = useNavigate()

    const handleChange = ({target}) => {
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

        await handleLogin(userInfo.email, userInfo.password);
        
    }

    // useEffect(()=>{
    //     if(isLoggedIn) {
    //         navigate('/');
    //     }
    // },[isLoggedIn, navigate]);

    return (
        <FormContainer>
            <Container >
                <form className={commonModalClasses + " w-80"} onSubmit={handleSubmit}>
                    <Title>Sign In</Title>
                    <FormInput value={userInfo.email} onChange={handleChange} name="email" label="Email" placeholder="example@gmail.com" />
                    <FormInput value={userInfo.password} onChange={handleChange} name="password" label="Password" placeholder="**********" type="password" />
                    {!isPending && <Submit value="Sing In"/>}
                    {isPending && <Loading />}
                    



                    <div className="flex justify-between">
                        <CustomLink to="/auth/forget-password" >
                            Forget Password
                        </CustomLink>
                        <CustomLink to="/auth/signup">
                            Sign Up
                        </CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>
    );
}

export default SingIn;
