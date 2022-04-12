import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_actions';
import { Form, Input, Button } from 'antd';

function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Name, setName] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('Incorrect Password');
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
        .then(response => {

            if(response.payload.success) {
                navigate('/login');
            }
            alert('Error');
        })
    }
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh' }} 
        >
            <Form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={ onSubmitHandler }>

                <label>Email</label>
                <Input type='email' value={Email} onChange={ onEmailHandler } />
                <label>Password</label>
                <Input type='password' value={Password} onChange={ onPasswordHandler } />
                <label>ConfirmPassword</label>
                <Input type='password' value={ConfirmPassword} 
                onChange={ onConfirmPasswordHandler }/>
                <label>Name</label>
                <Input type='text' value={Name} onChange={  onNameHandler } />
                <br/>
                <Button type='submit'>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default RegisterPage