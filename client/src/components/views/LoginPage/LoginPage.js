import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                navigate('/');
            }
            alert('Error');
        })
    }
    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'}}
        >
            <Form style={{ display: 'flex', flexDirection: 'column' }} 
            onSubmit= { onSubmitHandler }>

                <label>Email</label>
                <Input type='email' value={Email} onChange={ onEmailHandler }/>
                <label>Passowrd</label>
                <Input type='password' value={Password} onChange={ onPasswordHandler }/>
                <br/>
                <Button type='submit'>
                    Login
                </Button>
            </Form>
        </div>
    )  
}

export default LoginPage