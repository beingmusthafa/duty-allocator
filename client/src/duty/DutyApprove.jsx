import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CalendarIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/solid";

function DutyApprove() {
  const [requests, setRequests] = useState([]);
  console.log("requests", requests);
  const navigate = useNavigate();
  const department = sessionStorage.getItem("department");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/hodDash")
      .then((res) => {
        if (res.data !== "Hod") {
          console.log(res.data);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/duty/view");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching duty requests:", error);
    }
  };

  // Function to handle card click and navigate to StaffApprove page
  const handleCardClick = (requestId) => {
    navigate(`/duty/${requestId}`);
  };

  const renderRequests = (requestList) => {
    return (
      <div className=" grid grid-cols-3  gap-14">
        {requestList.map((request) => (
          <Card
            key={request._id}
            color="gray"
            variant="gradient"
            className="w-full max-w-[18rem] p-8 mb-4"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                {request.hall}
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-4 flex justify-center gap-1 text-3xl font-normal uppercase"
              >
                <span className="mt-1 text-4xl"></span>
                {request.examName}
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul
                className="flex flex-col gap-4"
                style={{ paddingTop: "30px" }}
              >
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <UsersIcon />
                  </span>
                  <Typography className="font-normal">
                    {request.numberOfTeachers} Invigilators Required
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CalendarIcon />
                  </span>
                  <Typography className="font-normal">
                    {request.requestDate}
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <ClockIcon />
                  </span>
                  <Typography className="font-normal">
                    {request.requestTime}
                  </Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
                onClick={() => handleCardClick(request._id)}
              >
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  const pendingRequests = requests.filter(
    (request) => request.status === 0 && request.department === department
  );

  return (
    <div>
      <div className="p-5">
        {pendingRequests.length > 0 ? (
          renderRequests(pendingRequests)
        ) : (
          <h1 className="text-center mt-[25vh] uppercase font-bold text-xl text-gray-400">
            No Pending Requests
          </h1>
        )}
      </div>
    </div>
  );
}

export default DutyApprove;
