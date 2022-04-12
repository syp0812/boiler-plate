import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER } from './types';
import { USER_SERVER } from '../components/Config';

export const loginUser = (dataToSubmit) => {

    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = (dataToSubmit) => {

    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

    return{
        type: REGISTER_USER,
        payload: request
    }
}

export const logoutUser = (dataToSubmit) => {

    const request = axios.get(`${USER_SERVER}/logout`, dataToSubmit)
    .then(response => response.data);

    return{
        type: LOGOUT_USER,
        payload: request
    }
}

export const auth = (dataToSubmit) => {

    const request = axios.get(`${USER_SERVER}/auth`, dataToSubmit)
    .then(response => response.data);

    return{
        type: AUTH_USER,
        payload: request
    }
}