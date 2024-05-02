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
import { PDFDownloadLink } from "@react-pdf/renderer";
import HodApprovedPrint from "../pdf/HodApprovedPrint";

function ViewApprovedHod() {
  const [requests, setRequests] = useState([]);
  const hodId = sessionStorage.getItem("id");

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
  const hodFilter = requests.filter((request) => request.hodId === hodId);
  return (
    <div className="container mt-5 ">
      <h2 className="text-center mb-4">Approved Requests</h2>
      {hodFilter.length > 0 ? (
        hodFilter.map((request) => (
          <Card
            key={request._id}
            className="w-full max-w-[48rem] flex-row mb-4 ml-60 shadow-md relative"
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
            </CardBody>
            <div className="absolute bottom-4 right-4">
              <PDFDownloadLink
                document={<HodApprovedPrint data={request} />}
                fileName={`Duty Report.pdf`}
              >
                {({ loading }) => (
                  <Button variant="text">
                    {loading ? "Loading..." : "Print Report"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4 inline-block ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
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

export default ViewApprovedHod;
