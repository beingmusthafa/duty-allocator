import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import Swal from 'sweetalert2'
import cardBg from '../assets/crd.jpg'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Checkbox,
    CheckIcon,
    Typography,
    Button,
} from "@material-tailwind/react";

function StaffApprove() {
    const [request, setRequest] = useState(null);
    const [dutyrequest, setDutyRequest] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const { requestId } = useParams();
    const department = sessionStorage.getItem('department');
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const hodFirstName = sessionStorage.getItem('fName');
    const hodLastName = sessionStorage.getItem('lName');
    const hodId = sessionStorage.getItem('id');

    useEffect(() => {
        fetchRequestData();
        fetchStaffDetails();
    }, []);

    const fetchRequestData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/duty/${requestId}`);
            setRequest(response.data);
        } catch (error) {
            console.error('Error fetching request data:', error);
        }
    };
    console.log(dutyrequest)
    const fetchStaffDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3000/staff/view");
            setStaffList(response.data);
        } catch (error) {
            console.error("Error fetching staff details:", error);
        }
    };

    // Filter staff based on department
    const departmentStaff = staffList.filter(staff => staff.dept === department && staff.designation !== "hod");

    const handleStaffSelect = (staffId) => {
        setSelectedStaff(prevSelectedStaff => {
            if (prevSelectedStaff.includes(staffId)) {
                return prevSelectedStaff.filter(id => id !== staffId);
            } else {
                return [...prevSelectedStaff, staffId];
            }
        });
    };
    useEffect(() => {
        let timeout;
        if (loading) {
            // Show spinner immediately
            setShowSpinner(true);
            // Set a timeout to execute handleApprove after 1 second
            timeout = setTimeout(() => {
                handleApprove();
            }, 1000);
        }

        // Clear the timeout if component unmounts or loading becomes false before the timeout
        return () => clearTimeout(timeout);
    }, [loading]);
    const override = css`
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; // Ensure the spinner appears above everything
`;
    const mailer = (approvalId) => {
        setLoading(true);
        axios.post("http://localhost:3000/send-email", {
            selectedTeachers: selectedStaff.map(staffId => {
                const selectedStaffDetails = departmentStaff.find(staff => staff._id === staffId);
                return {
                    _id: selectedStaffDetails._id,
                    fName: selectedStaffDetails.fName,
                    lName: selectedStaffDetails.lName,
                    email: selectedStaffDetails.email
                };
            }),
            hodFirstName,
            hodLastName,
            examName: request.examName,
            hall: request.hall,
            date: request.date,
            time: request.time,
            approvalId: approvalId
        })
            .then(() => {
                setLoading(false);
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Email Send Succesfully",
                    showConfirmButton: false,
                    timer: 1800
                });
                timeout = setTimeout(() => {
                    navigate('/duty/approve');
                }, 1800);

                console.log('Emails sent successfully');
            })
            .catch(error => {
                setLoading(false);
                console.error('Error sending emails:', error);
            });
    }
    const handleApprove = () => {

        if (selectedStaff.length !== request.numberOfTeachers) {
            setLoading(false);

            toast.error('Please select the required number of teachers', {
                position: "top-center",
                autoClose: 2000,
                closeButton: false,
                style: { borderRadius: "100px" }
            });

            timeout = setTimeout(() => {
                window.location.reload()
            }, 1500);
            return;
        }

        const approvalData = {

            selectedTeachers: selectedStaff.map(staffId => {
                const selectedStaffDetails = departmentStaff.find(staff => staff._id === staffId);
                return {
                    _id: selectedStaffDetails._id,
                    fName: selectedStaffDetails.fName,
                    lName: selectedStaffDetails.lName,
                    email: selectedStaffDetails.email
                };
            }),
            hodFirstName,
            hodLastName,
            hodId,
            approvedDate: new Date().toLocaleDateString('en-GB'), // Format as dd/mm/yyyy
            approvedTime: new Date().toLocaleTimeString(),
            examName: request.examName,
            hall: request.hall,
            department: request.department,
            date: request.date,
            time: request.time,
            requestDate: request.requestDate,
            requestTime: request.requestTime,
            numberOfTeachers: request.numberOfTeachers
        };

        axios.post("http://localhost:3000/staff/approve", approvalData)
            .then(response => {
                const approvalId = response.data.approvalId;
                console.log("Request approved:", approvalId);
                const status = 1;
                axios.put("http://localhost:3000/duty/status", { status, requestId })
                    .then(res => {
                        console.log("Status set successfully");
                        toast.success('Request approved successfully', {
                            position: "top-center",
                            autoClose: 2000,
                            closeButton: false,
                            style: { borderRadius: "100px" }
                        });
                        Swal.fire({
                            // position: "top-end",
                            icon: "info",
                            title: "Sending Emails To Invigilators...",
                            showConfirmButton: false,
                            timer: 1800
                        });
                        setLoading(true);
                        mailer(approvalId)

                        // navigate('/duty/approve');
                    })
                    .catch(err => {
                        setLoading(false);
                        console.error("Error setting status:", err);
                        toast.error('Error setting status', {
                            position: "top-center",
                            autoClose: 2000,
                            closeButton: false,
                            style: { borderRadius: "100px" }
                        });
                    });
            })
            .catch(error => {
                setLoading(false);
                console.error("Error approving request:", error);
                toast.error('Error approving request', {
                    position: "top-center",
                    autoClose: 2000,
                    closeButton: false,
                    style: { borderRadius: "100px" }
                });
            });

    };


    return (

        <div>
            {showSpinner ? (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <RingLoader color={"#36D7B7"} loading={loading} css={override} size={150} />
                </div>
            ) : (
                <div className="container mt-5 flex flex-row gap-4">

                    <div className="flex-grow">
                        {request && (
                            <Card key={request._id} className="w-full max-w-[48rem] flex-row mb-4  shadow-md" style={{ height: "500px" }}>
                                <CardHeader
                                    shadow={false}
                                    floated={false}
                                    className="m-0 w-2/5 shrink-0 rounded-r-none flex flex-col items-center justify-center bg-black bg-opacity-9 text-white"
                                >
                                    <img
                                        src={cardBg}
                                        alt="card-image"
                                        className="h-full w-full object-cover"
                                    />
                                    <Typography variant="h6" color="white" className="mb-2 uppercase">
                                        Assign Duty to
                                    </Typography>
                                    <ul className="list-disc pl-6 text-left"></ul>
                                </CardHeader>
                                <CardBody className='flex-grow items-center justify-center text-center'>
                                    <Typography variant="h6" color="gray" className="mb-4 uppercase text-lg">
                                        Exam Details
                                    </Typography>
                                    <Typography variant="h4" color="blue-gray" className="mb-2 uppercase text-2xl">
                                        {request.examName}
                                    </Typography>
                                    <Typography color="gray" className="mb-2 text-lg">
                                        Exam Hall : {request.hall}
                                    </Typography>
                                    <Typography color="gray" className="mb-2 text-lg">
                                        Exam Date : {request.date}
                                    </Typography>
                                    <Typography color="gray" className="mb-2 text-lg">
                                        Exam Time : {request.time}
                                    </Typography>
                                    <Typography color="gray" className="mb-2 text-lg">
                                        Teachers Required : {request.numberOfTeachers}
                                    </Typography>
                                </CardBody>
                            </Card>
                        )}
                    </div>

                    <div className="flex-grow" style={{ height: "250px" }}>
                        {request && (
                            <Card color="teal" variant="gradient" className="w-full max-w-[20rem] p-4">
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="m-0 mb-2 rounded-none border-b border-white/10 pb-3 text-center"
                                >
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="font-normal uppercase"
                                    >
                                        invigilators
                                    </Typography>
                                    <Typography
                                        variant="h1"
                                        color="white"
                                        className="mt-2 flex justify-center gap-1 text-5xl font-normal"
                                    >
                                        <span className="mt-2 text-4xl"></span>{request.department}
                                    </Typography>
                                </CardHeader>
                                <CardBody className="p-0">
                                    <div className="flex flex-col" style={{ maxHeight: "270px", overflowY: "auto" }}>
                                        {departmentStaff.map(staff => (
                                            <div key={staff._id} className="flex items-center gap-4 ">
                                                <Checkbox
                                                    checked={selectedStaff.includes(staff._id)}
                                                    color="orange"
                                                    onChange={() => handleStaffSelect(staff._id)}
                                                />
                                                <Typography className="font-normal">{staff.fName} {staff.lName}</Typography>
                                            </div>
                                        ))}
                                    </div>
                                </CardBody>
                                <CardFooter className="mt-10 p-0">
                                    <Button
                                        size="lg"
                                        color="white"
                                        className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                                        ripple={false}
                                        fullWidth={true}
                                        onClick={() => setLoading(true)}
                                    >
                                        Approve
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </div>)}
            <ToastContainer />
        </div>
    );


}

export default StaffApprove;
