import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions'; 
import { Form, Input, Button, Typography, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { Title } = Typography;

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rememberMeChk = localStorage.getItem('rememberMe') ? true : false;
    const [formErrMsg, setFormErrMsg] = useState('');
    const [rememberMe, setRememberMe] = useState(rememberMeChk);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }
    const initialEmail = localStorage.getItem('rememberMe') 
    ? localStorage.getItem('rememberMe') : '';

    return(
        <Formik initialValues={{ email: initialEmail, password: ''}}
        validationSchema={ Yup.object().shape({
            email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
            password: Yup.string()
            .min(6, 'Password must be at leat 6 characters')
            .required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                let dataToSubmit = {
                    email: values.email,
                    password: values.password
                };
                dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if(response.payload.loginSuccess) {
                        window.localStorage.setItem('userId', response.payload.userId);

                        if(rememberMe === true) {
                            window.localStorage.setItem('rememberMe', values.id);
                        } else {
                            localStorage.removeItem('rememberMe');
                        }
                        navigate('/');
                    } else {
                        setFormErrMsg('Check out your Account or Password again');
                    }
                })
                .catch(err => {
                    setFormErrMsg('Check out your Account or Password again')
                    setTimeout(() => {
                        setFormErrMsg('')
                    }, 3000);
                });
                setSubmitting(false);
            }, 500);
        }}
        >
            {props => {
                const {
                    values, touched, errors, isSubmitting, handleChange, 
                    handleBlur, handleSubmit
                } = props;
                return (
                    <div className='app'>
                        <Title level={2}>Log In</Title>
                        <form onSubmit={ handleSubmit } style={{ width: '350px' }}>
                            <Form.Item required>
                                <Input 
                                id='email'
                                prefix={ <UserOutlined style={{ color: 'rgba(0,0,0,.25'}} /> }
                                placeholder='Enter your email'
                                type='email'
                                value={ values.email }
                                onChange= { handleChange }
                                onBlur={ handleBlur }
                                className={
                                    errors.email && touched.email ? 'text-input error' : 'text-input'
                                }
                                />
                                {errors.email && touched.email && (
                                    <div className='input-feedback'>{errors.email}</div>
                                )}
                            </Form.Item>
                            <Form.Item required>
                                <Input
                                id='password'
                                prefix={ <LockOutlined style={{ color: 'rgba(0,0,0,.25'}} /> }
                                placeholder='Enter your password'
                                type='password'
                                value={ values.password }
                                onChange= { handleChange }
                                onBlur={ handleBlur }
                                className={
                                    errors.password && touched.password ? 'text-input error' : 'text-input'
                                }
                                />
                                {errors.password && touched.password && (
                                    <div className='input-feedback'>{errors.password}</div>
                                )}
                            </Form.Item>

                            {formErrMsg && (
                                <label><p style={{ color: '#ff0000bf', fontSize: '0.7rem',
                                border: '1px solid', padding: '1rem', borderRadius: '10px'}}>
                                    {formErrMsg}</p>
                                </label>
                            )}
                            
                            <Form.Item>
                                <Checkbox id='rememberMe' onChange={handleRememberMe} 
                                checked= { rememberMe }>
                                    Remember me
                                </Checkbox>
                                <a className='login-form-forgot' href='/reset_user' style={{ float: 'right'}}>
                                    forgot password
                                </a>
                                <div>
                                    <Button type='primary' htmlType='submit' className='login-form-button' style={{ minWidth: '100%' }}
                                    disabled={ isSubmitting } onSubmit={ handleSubmit }>
                                        Log In
                                    </Button>
                                </div>
                                Or <a href='/register'>register now</a>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );  
};

export default LoginPage