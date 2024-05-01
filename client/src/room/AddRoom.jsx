import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Button } from '@material-tailwind/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRoom() {
  const [formData, setFormData] = useState({
    roomname: "",
    seats: "",
  });

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/room/add", formData)
      .then((res) => {
        toast.success('Room added successfully', {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
          style: { borderRadius: "100px" }
        });
        console.log("successful", res.data);
      })
      .catch((error) => {
        if (error.response.data.error === "Room already exists") {
          toast.error('Room already exists', {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
            style: { borderRadius: "100px" }
          });
        } else {
          toast.error('Error adding room', {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
            style: { borderRadius: "100px" }
          });
        }
        console.log("error", error.response.data);
      });
  };

  return (
    <div className="max-w-md mx-auto pl-8 pr-8 pt-4 mt-20 pb-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4 uppercase">Add Room</h2>
      <form onSubmit={submit} className="space-y-5">
        <Input
          type="text"
          label="Room name"
          name="roomname"
          value={formData.roomname}
          onChange={change}
          required
        />
        <Input
          type="text"
          label="No. of Seats"
          name="seats"
          value={formData.seats}
          onChange={change}
          required
        />
        <Button
          type="submit"
          color="teal"
          ripple={true}
          className="w-full mb-4"
        >
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddRoom;
