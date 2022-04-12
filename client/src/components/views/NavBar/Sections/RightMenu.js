import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RightMenu(props) {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
        .then(response => {
            if(response.status === 200) {
                navigate('/login');
            }
            alert('Logout Failed');
        })
    }

    if(user.userData  && user.userData.isAuth) {
        return(
                <Menu mode={props.mode}>
                    <Menu.Item key='mail'>
                        <a href='/api/users/login'>Sign In</a>
                    </Menu.Item>
                    <Menu.Item key='app'>
                        <a href='/api/users/register'>Sign Up</a>
                    </Menu.Item>
                </Menu>
        )
    } else {
        return (
            <Menu>
                <Menu.Item key='logout'>
                    <a onClick={ logoutHandler }>Log out</a>
                </Menu.Item>    
            </Menu>
        )
    }
}

export default RightMenu