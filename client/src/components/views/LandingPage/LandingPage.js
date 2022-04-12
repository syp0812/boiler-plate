import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {  

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response));
    }, [])

    return(
        <div style={{ width: '100%', margin: '0' }} 
        >
            <div style={{ width: '85%', margin: '2rem auto'}}>
                <h2>LandingPage</h2>
            </div>
        </div>
    )
}

export default LandingPage