import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import clearForm from "../helpers/clearForm";

function DutyRequest() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [formData, setFormData] = useState({
    examName: "",
    hall: "",
    numberOfTeachers: "",
    department: "",
    date: "",
    time: "",
    status: 0,
  });
  const [departments, setDepartments] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchHalls();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dept/view");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:3000/room/view");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (data) => {
    const { examName, hall, numberOfTeachers, department, date, time } = data;
    const status = 0;
    const formattedDate = formatDate(date);
    const requestDate = new Date(date).toLocaleDateString("en-GB");
    const hour = Number(time.split(":")[0]);
    const min = Number(time.split(":")[1]);
    const requestTime = `${hour > 12 ? hour - 12 : hour}:${
      time.split(":")[1]
    }:00 ${hour > 12 && min !== 0 ? "PM" : hour <= 12 ? "PM" : "AM"}`;
    const formDataWithFormattedDate = {
      examName,
      hall,
      numberOfTeachers,
      department,
      status,
      date: formattedDate,
      requestDate: requestDate,
      requestTime: requestTime,
    };
    axios
      .post("http://localhost:3000/duty/request", formDataWithFormattedDate)
      .then((res) => {
        toast.success("Duty request submitted successfully", {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
        clearForm("duty-form");
        console.log("successful", res.data);
      })
      .catch((err) => {
        toast.error("Error submitting duty request", {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          style: { borderRadius: "100px" },
        });
        console.log("error", err.response.data);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <div className="max-w-lg mx-auto pl-8 pr-8 pt-4 pb-2 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-5 uppercase">
        Add Duty Request
      </h2>
      <form
        id="duty-form"
        onSubmit={handleSubmit(submit)}
        className="space-y-3"
      >
        <p className="text-red-500 text-sm">{errors.examName?.message}</p>
        <Input
          {...register("examName", {
            required: "Enter exam name",
            minLength: { value: 2, message: "Name too short" },
            maxLength: { value: 15, message: "Name too long" },
          })}
          type="text"
          label="Exam Name"
          name="examName"
        />
        <p className="text-red-500 text-sm">{errors.hall?.message}</p>
        <select
          className="p-2 outline-none border"
          {...register("hall", { required: "Select a hall" })}
        >
          <option value="">Hall</option>
          {halls.map((item) => (
            <option className="p-2" key={item._id} value={item.roomname}>
              {item.roomname}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm">
          {errors.numberOfTeachers?.message}
        </p>
        <Input
          {...register("numberOfTeachers", {
            required: "Enter number of teachers",
            min: { value: 1, message: "Minimum number is 1" },
            max: { value: 5, message: "Maximum number is 5" },
          })}
          type="text"
          label="Number of Teachers"
          name="numberOfTeachers"
        />
        <p className="text-red-500 text-sm">{errors.department?.message}</p>
        <select
          className="p-2 outline-none border"
          {...register("department", { required: "Select a department" })}
        >
          <option value="">Department</option>
          {departments.map((item) => (
            <option className="p-2" key={item._id} value={item.dept}>
              {item.dept}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm">{errors.date?.message}</p>
        <Input
          {...register("date", {
            required: "Select date",
            validate: (value) => {
              const today = new Date();
              const selectedDate = new Date(value);
              return selectedDate >= today || "Date cannot be past or today";
            },
          })}
          type="date"
          label="Date"
          name="date"
        />
        <p className="text-red-500 text-sm">{errors.time?.message}</p>
        <Input
          {...register("time", {
            required: "Select time",
            validate: (value) => {
              const time = new Date(`1970-01-01T${value}:00`);
              const startTime = new Date(`1970-01-01T09:00:00`);
              const endTime = new Date(`1970-01-01T16:00:00`);
              return (
                (time >= startTime && time <= endTime) ||
                "Time should be between 9AM to 4PM"
              );
            },
          })}
          type="time"
          label="Time"
          name="time"
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

export default DutyRequest;
