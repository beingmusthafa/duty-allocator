// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ViewApproved() {
//     const [requests, setRequests] = useState([]);

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/view/approved');
//             setRequests(response.data);
//             console.log(response.data)
//         } catch (error) {
//             console.error('Error fetching duty requests:', error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Approved Requests</h2>
//             {requests.map(request => (
//                 <div key={request._id} className="card mb-4">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col">
//                                 <p className="card-text">Exam: {request.examName}</p>
//                                 <p className="card-text">Exam Hall: {request.hall}</p>
//                                 <p className="card-text">Requested Date: {request.requestDate}</p>
//                                 <p className="card-text">Approved Date: {request.approvedDate}</p>
//                                 <p className="card-text">Approved By: {request.hodFirstName} {request.hodLastName}</p>

//                             </div>
//                             <div className="col">
//                                 <p className="card-text">Teachers: {request.numberOfTeachers}</p>
//                                 <p className="card-text">Department: {request.department}</p>
//                                 <p className="card-text">Requested Time: {request.requestTime}</p>
//                                 <p className="card-text">Approved Time: {request.approvedTime}</p>

//                                 <p className="card-text">Duty Assigned To:</p>
//                                 <ul>
//                                     {request.selectedTeachers.map((teacher, index) => (
//                                         <li key={index}>{teacher.fName} {teacher.lName}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//         </div>
//     );
// }

// export default ViewApproved;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     Typography,
//     Button,
// } from "@material-tailwind/react";

// function ViewApprovedHod() {
//     const [requests, setRequests] = useState([]);
//     const hodId = sessionStorage.getItem('id');

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/view/approved');
//             setRequests(response.data);
//             console.log(response.data)
//         } catch (error) {
//             console.error('Error fetching duty requests:', error);
//         }
//     };
//     const hodFilter = requests.filter(request => request.hodId === hodId)
//     return (
//         <div className="container mt-5">
//             <h2 className="text-center mb-4">Approved Requests</h2>
//             {hodFilter.map(request => (
//                 <div key={request._id} className="card mb-4">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col">
//                                 <p className="card-text">Exam: {request.examName}</p>
//                                 <p className="card-text">Exam Hall: {request.hall}</p>
//                                 <p className="card-text">Exam Date: {request.date}</p>
//                                 <p className="card-text">Approved Date: {request.approvedDate}</p>
//                                 <p className="card-text">Approved By: {request.hodFirstName} {request.hodLastName}</p>

//                             </div>
//                             <div className="col">
//                                 <p className="card-text">Teachers: {request.numberOfTeachers}</p>
//                                 <p className="card-text">Department: {request.department}</p>
//                                 <p className="card-text">Exam Time: {request.time}</p>
//                                 <p className="card-text">Approved Time: {request.approvedTime}</p>

//                                 <p className="card-text">Duty Assigned To:</p>
//                                 <ul>
//                                     {request.selectedTeachers.map((teacher, index) => (
//                                         <li key={index}>{teacher.fName} {teacher.lName}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//         </div>
//     );
// }

// export default ViewApprovedHod;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

function ViewApproved() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/view/approved");
      setRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching duty requests:", error);
    }
  };

  return (
    <div className="container mt-5 ">
      <h2 className="text-center mb-4">Approved Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <Card
            key={request._id}
            className="w-full max-w-[48rem] flex-row mb-4  shadow-md"
            style={{ marginLeft: "20%" }}
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none flex flex-col items-center justify-center bg-black bg-opacity-9 text-white"
            >
              <Typography variant="h6" color="white" className="mb-2 uppercase">
                Duty Assigned to
              </Typography>
              <ul className="list-disc pl-6 text-left">
                {request.selectedTeachers.map((teacher, index) => (
                  <li key={index} className="text-white">
                    {teacher.fName} {teacher.lName}
                  </li>
                ))}
              </ul>
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Exam Details
              </Typography>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 uppercase"
              >
                {request.examName}
              </Typography>
              <Typography color="gray" className="mb-2">
                Exam Hall: {request.hall}
              </Typography>
              <Typography color="gray" className="mb-2">
                Exam Date: {request.requestDate}
              </Typography>
              <Typography color="gray" className="mb-2">
                Exam Time: {request.requestTime}
              </Typography>
              <Typography color="gray" className="mb-2">
                Approved By: {request.hodFirstName} {request.hodLastName}
              </Typography>

              {/* <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2">
                                Learn More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a> */}
            </CardBody>
          </Card>
        ))
      ) : (
        <h1 className="text-center mt-[25vh] uppercase font-bold text-xl text-gray-600">
          No Approved Requests
        </h1>
      )}
    </div>
  );
}

export default ViewApproved;
