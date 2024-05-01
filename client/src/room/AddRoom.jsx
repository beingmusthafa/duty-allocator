import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import clearForm from "../utils/clearForm";

function AddRoom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    const { roomname, seats } = data;
    axios
      .post("http://localhost:3000/room/add", { roomname, seats })
      .then((res) => {
        toast.success("Room added successfully", {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
        console.log("successful", res.data);
        clearForm("room-form");
      })
      .catch((error) => {
        toast.error(error.response?.data?.error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
        console.log("error", error.response.data);
      });
  };

  return (
    <div className="max-w-md mx-auto pl-8 pr-8 pt-4 mt-20 pb-5 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4 uppercase">
        Add Room
      </h2>
      <form
        id="room-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
      >
        <p className="text-red-500 text-sm">{errors.roomname?.message}</p>
        <Input
          {...register("roomname", {
            required: "Enter room name",
            maxLength: { value: 10, message: "Name too long" },
          })}
          type="text"
          label="Room name"
          name="roomname"
        />
        <p className="text-red-500 text-sm">{errors.seats?.message}</p>
        <Input
          {...register("seats", {
            required: "Enter no. of seats",
            max: { value: 30, message: "Exceeds limit of 30" },
            validate: (value) => value >= 4 || "Should be minimum 4",
          })}
          type="number"
          label="No. of Seats"
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
