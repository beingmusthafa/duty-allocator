import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import clearForm from "../utils/clearForm";

function AddStaff() {
  const [deptList, setDeptList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  useEffect(() => {
    fetchDeptDetails();
  }, []);

  const fetchDeptDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dept/view");
      setDeptList(response.data);
    } catch (error) {
      console.error("Error fetching department details:", error);
    }
  };

  const onSubmit = async (data) => {
    const { fName, lName, phNumber, email, password, designation, dept } = data;
    try {
      await axios.post("http://localhost:3000/staff/add", {
        fName,
        lName,
        phNumber,
        email,
        password,
        designation,
        dept,
      });

      toast.success("Staff added successfully");
      clearForm("staff-form");
    } catch (error) {
      if (error.response.data.error === "Email already exists") {
        toast.error("Email already exists");
      } else if (error.response.data.error === "Phone number already exists") {
        toast.error("Phone number already exists");
      } else if (error.response.data.error === "HOD already exists") {
        toast.error("HOD already exists");
      } else {
        toast.error("Error adding staff");
      }
    }
  };

  return (
    <div className="">
      <div className="max-w-lg mx-auto pl-8 pr-8 pt-4 pb-2 bg-white shadow-md rounded-md mt-4">
        <h2 className="text-2xl font-bold text-center mb-4 uppercase">
          Add Staff
        </h2>
        <form
          id="staff-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="flex flex-col">
            <p className="text-red-500 text-sm mb-1">{errors.fName?.message}</p>
            <Input
              {...register("fName", {
                required: "Enter first name",
                minLength: { value: 3, message: "Name too short" },
                maxLength: { value: 10, message: "Name too long" },
              })}
              type="text"
              label="First Name"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-red-500 text-sm mb-1">{errors.lName?.message}</p>
            <Input
              {...register("lName", {
                required: "Enter last name",
                minLength: { value: 3, message: "Name too short" },
                maxLength: { value: 10, message: "Name too long" },
              })}
              type="text"
              label="Last Name"
            />
          </div>
          <div className="flex space-x-4 ">
            <div className="flex flex-col">
              <p className="text-red-500 text-sm mb-1">
                {errors.dept?.message}
              </p>
              <select
                className="p-2 outline-none border"
                {...register("dept", { required: "Select a department" })}
              >
                <option value="">Department</option>
                {deptList.map((item) => (
                  <option className="p-2" key={item.dept} value={item.dept}>
                    {item.dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-red-500 text-sm mb-1">
                {errors.phNumber?.message}
              </p>
              <Input
                {...register("phNumber", {
                  required: "Enter phone number",
                  minLength: { value: 10, message: "Invalid phone number" },
                  maxLength: { value: 10, message: "Invalid phone number" },
                })}
                type="number"
                label="Phone Number"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-red-500 text-sm mb-1">{errors.email?.message}</p>
            <Input
              {...register("email", {
                required: "Enter email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
              type="email"
              label="Email"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <p className="text-red-500 text-sm mb-1">
                {errors.password?.message}
              </p>
              <Input
                {...register("password", {
                  required: "Enter password",
                  minLength: { value: 8, message: "Password too short" },
                  maxLength: { value: 16, message: "Password too long" },
                })}
                type="password"
                label="Password"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-red-500 text-sm mb-1">
                {errors.confirmPassword?.message}
              </p>
              <Input
                {...register("confirmPassword", {
                  required: "Enter password",
                  minLength: { value: 8, message: "Password too short" },
                  maxLength: { value: 16, message: "Password too long" },
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                label="Confirm Password"
              />
            </div>
          </div>
          <p className="text-red-500 text-sm mb-1">
            {errors.designation?.message}
          </p>
          <div className="flex flex-row space-x-4">
            <label className="flex items-center">
              <input
                {...register("designation", { required: "Select designation" })}
                type="radio"
                name="designation"
                value="hod"
                className="form-radio h-6 w-6 text-teal-600 border-teal-400 focus:ring-teal-500"
              />
              <span className="ml-2">HOD</span>
            </label>
            <label className="flex items-center">
              <input
                {...register("designation", { required: "Select designation" })}
                type="radio"
                name="designation"
                value="invigilator"
                className="form-radio h-6 w-6 text-teal-600 border-teal-400 focus:ring-teal-500"
              />
              <span className="ml-2">Invigilator</span>
            </label>
          </div>
          <Button
            type="submit"
            color="teal"
            ripple={true}
            className="w-full mb-4"
          >
            Register
          </Button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default AddStaff;
