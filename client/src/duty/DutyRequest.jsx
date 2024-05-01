import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Input, Button } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';

function DutyRequest() {
  const [formData, setFormData] = useState({
    examName: "",
    hall: "",
    numberOfTeachers: "",
    department: "",
    date: "",
    time: "",
    status: 0
  });
  const [departments, setDepartments] = useState([]);
  const [halls, setHalls] = useState([]);
  const [showHallOptions, setShowHallOptions] = useState(false); // Define showHallOptions state
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false); // Define showDepartmentOptions state

  useEffect(() => {
    fetchDepartments();
    fetchHalls();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dept/view');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/room/view');
      setHalls(response.data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(formData.date);
    const requestDate = new Date().toLocaleDateString('en-GB');
    const requestTime = new Date().toLocaleTimeString();
    const formDataWithFormattedDate = { ...formData, date: formattedDate, requestDate: requestDate, requestTime: requestTime }; // Update formData with formatted date
    console.log(formDataWithFormattedDate);
    axios.post("http://localhost:3000/duty/request", formDataWithFormattedDate)
      .then((res) => {
        toast.success('Duty request submitted successfully', {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          style: { borderRadius: "100px" }
        });
        console.log("successful", res.data);
      })
      .catch((err) => {
        toast.error('Error submitting duty request', {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          style: { borderRadius: "100px" }
        });
        console.log("error", err.response.data);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="max-w-lg mx-auto pl-8 pr-8 pt-4 pb-2 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-5 uppercase">Add Duty Request</h2>
      <form onSubmit={submit} className="space-y-5">
        <Input
          type="text"
          label="Exam Name"
          name="examName"
          value={formData.examName}
          onChange={change}
          required
        />
        <div className="relative inline-block w-full">
          <div
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 cursor-pointer"
            onClick={() => setShowHallOptions(!showHallOptions)}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {formData.hall || 'Select Hall'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {showHallOptions && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
              {halls.map((hall) => (
                <div
                  key={hall._id}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setFormData({ ...formData, hall: hall.roomname });
                    setShowHallOptions(false);
                  }}
                >
                  {hall.roomname}
                </div>
              ))}
            </div>
          )}
        </div>
        <Input
          type="text"
          label="Number of Teachers"
          name="numberOfTeachers"
          value={formData.numberOfTeachers}
          onChange={change}
          required
        />
        <div className="relative inline-block w-full">
          <div
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 cursor-pointer"
            onClick={() => setShowDepartmentOptions(!showDepartmentOptions)}
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {formData.department || 'Select Department'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {showDepartmentOptions && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
              {departments.map((department) => (
                <div
                  key={department._id}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setFormData({ ...formData, department: department.dept });
                    setShowDepartmentOptions(false);
                  }}
                >
                  {department.dept}
                </div>
              ))}
            </div>
          )}
        </div>
        <Input
          type="date"
          label="Date"
          name="date"
          value={formData.date}
          onChange={change}
          required
        />
        <Input
          type="time"
          label="Time"
          name="time"
          value={formData.time}
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

export default DutyRequest;
