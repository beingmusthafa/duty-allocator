import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddStaff() {
  const [deptList, setDeptList] = useState([]);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [designation, setDesignation] = useState('invigilator');
  const [dept, setDept] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetchDeptDetails();
  }, []);

  const fetchDeptDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dept/view');
      setDeptList(response.data);
    } catch (error) {
      console.error('Error fetching department details:', error);
    }
  };
  const role = (designation === 'invigilator') ? 'staff' : 'hod';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password Doesnt Match', {
        position: "top-center",
        autoClose: 1000,
        closeButton: false,
        style: { borderRadius: "100px" }
      });
    }
    try {
      await axios.post('http://localhost:3000/staff/add', {
        fName, lName, phNumber, email, password, designation, dept, role
      });

      toast.success('Staff added successfully');
      clearForm();
    } catch (error) {
      if (error.response.data.error === "Email already exists") {
        toast.error('Email already exists');
      } else if (error.response.data.error === "Phone number already exists") {
        toast.error('Phone number already exists');
      } else {
        toast.error('Error adding staff');
      }
    }
  };

  const clearForm = () => {
    setFName('');
    setLName('');
    setPhNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDesignation('invigilator');
    setDept('');
  };

  return (
    <div className="">
      <div className="max-w-lg mx-auto pl-8 pr-8 pt-4 mt-11 pb-2 bg-white shadow-md rounded-md mt-4">
        <h2 className="text-2xl font-bold text-center mb-4 uppercase">Add Staff</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            required
          />
          <div className="flex space-x-4 ">
            <div className="w-72 relative ">
              <div className="relative inline-block w-full">
                <div
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400 cursor-pointer"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {dept || 'Department'}
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
                {showOptions && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
                    {deptList.map((deptItem) => (
                      <div
                        key={deptItem._id}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                        required
                        onClick={() => {
                          setDept(deptItem.dept);
                          setShowOptions(false);
                        }}
                      >
                        {deptItem.dept}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Input
              type="number"
              label="Phone Number"
              value={phNumber}
              onChange={(e) => setPhNumber(e.target.value)}
              required
            />
          </div>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex space-x-4">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row space-x-4">
            <label className='flex items-center'>
              <input
                type="radio"
                name="designation"
                value="hod"
                checked={designation === 'hod'}
                onChange={() => setDesignation('hod')}
                className="form-radio h-6 w-6 text-teal-600 border-teal-400 focus:ring-teal-500"
              />
              <span className="ml-2">HOD</span>
            </label>
            <label className='flex items-center'>
              <input
                type="radio"
                name="designation"
                value="invigilator"
                checked={designation === 'invigilator'}
                onChange={() => setDesignation('invigilator')}
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
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default AddStaff;
