import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminDash() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/adminDash')
            .then(res => {
                if (res.data !== "Admin") {
                    console.log(res.data)
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div>AdminDash</div>
    )
}

export default AdminDash