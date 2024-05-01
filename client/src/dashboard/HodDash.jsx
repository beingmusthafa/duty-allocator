import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function HodDash() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/hodDash')
            .then(res => {
                if (res.data !== "Hod") {
                    console.log(res.data)
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div>HodDash</div>
    )
}

export default HodDash