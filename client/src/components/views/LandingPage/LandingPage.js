import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response));
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                navigate('/login');
            }
            alert ('Logout Failed');
        })
    }

    return(
        <div style={{ display: 'flex', justifyContent: 'center',
        alignItems: 'center', width: '100%', height: '100vh'}}
        >
            <h2>LandingPage</h2>
            <Button onClick={ onClickHandler }>
                Log out
            </Button>
        </div>
    )
}

export default LandingPage