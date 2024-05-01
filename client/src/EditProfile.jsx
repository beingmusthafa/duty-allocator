import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from "@material-tailwind/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
    const [userData, setUserData] = useState({
        fName: '',
        lName: '',
        phNumber: ''
    });
    const userid = sessionStorage.getItem('id')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/staff/view');
                const currentUserData = response.data.find(user => user._id === userid);

                setUserData(currentUserData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target; // Fixed property name
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3000/update-user-data', userData);
            toast.success('Profile Updated Successfully', {
                position: "top-center",
                autoClose: 1000,
                closeButton: false,
                style: { borderRadius: "100px" }
            });
        } catch (error) {
            if (error.response.data.error === "Phone number already exists") {
                toast.error('Phone number already exists', {
                    position: "top-center",
                    autoClose: 1000,
                    closeButton: false,
                    style: { borderRadius: "100px" }
                });
            } else {
                toast.error('Failed to update profile. Please try again.', {
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
                        type="text"
                        name="fName"
                        value={userData.fName}
                        onChange={handleChange}
                        label="First Name"
                        size="regular"
                        outline={true}
                        required
                        className="mb-6"
                    /><div className="mb-6"></div>
                    <Input
                        type="email"
                        name="email"
                        value={userData.email}
                        label="Email"
                        size="regular"
                        outline={true}
                        disabled
                        required
                        className="mb-6"
                    /><div className="mb-6"></div>
                    <Input
                        type="text"
                        name="lName"
                        value={userData.lName}
                        onChange={handleChange}
                        label="Last Name"
                        size="regular"
                        outline={true}
                        required
                        className="mb-6"
                    /><div className="mb-6"></div>
                    <Input
                        type="text"
                        name="phNumber"
                        value={userData.phNumber}
                        onChange={handleChange}
                        label="Phone Number"
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

export default EditProfile;
