import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from "@material-tailwind/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const email = sessionStorage.getItem('email')
function ChangePassword() {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            email,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(userData.newPassword !== userData.confirmPassword){
                return toast.error('Password Doesnt Match', {
                    position: "top-center",
                    autoClose: 1000,
                    closeButton: false,
                    style: { borderRadius: "100px" }
                });
            }
            const response = await axios.post('http://localhost:3000/update-password', userData);
            toast.success('Password Updated Successfully', {
                position: "top-center",
                autoClose: 2000,
                closeButton: false,
                style: { borderRadius: "100px" }
            });
        } catch (error) {
            console.error('Error updating Password:', error);
    
            if (error.response && error.response.data.error === "Wrong Current Password") {
                toast.error('Wrong Current Password', {
                    position: "top-center",
                    autoClose: 1000,
                    closeButton: false,
                    style: { borderRadius: "100px" }
                });
            } else {
                toast.error('Error Updating Password', {
                    position: "top-center",
                    autoClose: 1000,
                    closeButton: false,
                    style: { borderRadius: "100px" }
                });
            }
        }
    };
    

    return (
        <div className="container mx-auto mt-10 p-8 ">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6"></div>
                    
                    <Input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        label="Current Password"
                        size="regular"
                        outline={true}
                        required
                        className="mb-6"
                    /><div className="mb-6"></div>
                    <Input
                        type="password"
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleChange}
                        label="New Password"
                        size="regular"
                        outline={true}
                        required
                        className="mb-6"
                    /><div className="mb-6"></div>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        size="regular"
                        outline={true}
                        required
                        className="mb-6"
                    />

                    <div className="mb-6"></div>
                    <div className="flex justify-center">
                        <Button
                            color="lightBlue"
                            buttonType="filled"
                            size="regular"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="light"
                            type="submit"
                        >
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChangePassword;

