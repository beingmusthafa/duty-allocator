import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import clearForm from "../utils/clearForm";

function AddDept() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);

  const submit = (data) => {
    const { dept, block } = data;
    axios
      .post("http://localhost:3000/dept/add", { dept, block })
      .then((res) => {
        toast.success("Department added successfully", {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
        console.log("successful", res.data);
        clearForm("dept-form"); // Clear the form on successful submission
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        if (error.response.data.error === "Department already exists") {
          toast.error("Department already exists", {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
            style: { borderRadius: "100px" },
          });
        } else {
          toast.error("Error adding Department", {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
            style: { borderRadius: "100px" },
          });
        }
        console.log("error", error.response.data);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto pl-8 pb-5 pr-8 pt-4 mt-20  bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-5 uppercase">
        Add Department
      </h2>
      {error && <p className="text-red-500 text-center mb-3">{error}</p>}
      <form
        id="dept-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-5"
      >
        <p className="text-red-500 text-sm">{errors.dept?.message}</p>
        <Input
          {...register("dept", {
            required: "Enter department name",
            maxLength: { value: 10, message: "Name too long" },
          })}
          type="text"
          label="Department name"
          name="dept"
        />
        <p className="text-red-500 text-sm">{errors.block?.message}</p>
        <Input
          {...register("block", {
            required: "Enter block name",
            maxLength: { value: 10, message: "Name too long" },
          })}
          type="text"
          label="Block"
          name="block"
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

export default AddDept;
