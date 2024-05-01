
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BiEdit, BiSave } from 'react-icons/bi';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ViewRoom() {
    const [roomList, setRoomList] = useState([]);
    const [editableRoomId, setEditableRoomId] = useState(null);
    const [editableRoomName, setEditableRoomName] = useState('');
    const [editableSeat, setEditableSeat] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoomDetails();
    }, []);

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3000/room/view");
            setRoomList(response.data);
        } catch (error) {
            console.error("Error fetching Room details:", error)
        }
    };

    const handleEdit = (room) => {
        setEditableRoomId(room._id);
        setEditableRoomName(room.roomname);
        setEditableSeat(room.seats);
    };

    const handleSave = async () => {
        try {
            const updateEndpoint = `http://localhost:3000/room/update/${editableRoomId}`;
            const updatedData = {
                roomname: editableRoomName,
                seats: editableSeat,
            };

            await axios.put(updateEndpoint, updatedData);
            setEditableRoomId(null);
            setEditableRoomName('');
            setEditableSeat('');
            fetchRoomDetails();
        } catch (error) {
            console.error("Error updating Room:", error);
        }
    };
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const startIndex = (currentPage - 1) * 5;
    const paginatedRoomList = roomList.slice(startIndex, startIndex + 5);

    return (
        <div className="flex justify-center pt-4">
            <Card className="h-75 w-50 shadow-md">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Room List
                            </Typography>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => navigate('/room/add')} className="flex items-center gap-3" size="sm" >
                                Add Room
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Room Name
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Seats
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 ">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Action
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRoomList.map((room) => (
                                    <tr key={room._id}>
                                        <td className="p-3">
                                            {editableRoomId === room._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={editableRoomName}
                                                    onChange={(e) => setEditableRoomName(e.target.value)}
                                                />
                                            ) : (
                                                room.roomname
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editableRoomId === room._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={editableSeat}
                                                    onChange={(e) => setEditableSeat(e.target.value)}
                                                />
                                            ) : (
                                                room.seats
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editableRoomId === room._id ? (
                                                <BiSave onClick={() => handleSave(room._id)} className="cursor-pointer text-green-300 h-5 w-5" />
                                            ) : (
                                                <BiEdit onClick={() => handleEdit(room)} className="cursor-pointer text-blue-300 h-5 w-5" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {Math.ceil(roomList.length / 5)}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" onClick={handleNextPage}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ViewRoom;
