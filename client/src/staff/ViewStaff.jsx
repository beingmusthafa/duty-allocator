// import React, { useEffect, useState } from "react";

// function ViewStaff() {
//     const [staffList, setStaffList] = useState([]);
//     const [editingStaffId, setEditingStaffId] = useState(null);

//     useEffect(() => {
//         fetchStaffDetails();
//     }, []);

//     const fetchStaffDetails = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/staff/view");
//             const data = await response.json();
//             setStaffList(data);
//         } catch (error) {
//             console.error("Error fetching staff details:", error);
//         }
//     };

//     const handleUpdate = async (staffId) => {
//         const updatedStaff = staffList.find((staff) => staff._id === staffId);
//         const { phNumber, email, dept, designation, email, phNumber } = updatedStaff;

//         try {
//             const response = await fetch(`http://localhost:3000/staff/update/${staffId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ phNumber, email, dept, designation, email, phNumber })
//             });

//             if (response.ok) {
//                 console.log(`Staff with ID ${staffId} updated successfully.`);
//                 setEditingStaffId(null); // Stop editing after saving changes
//                 // Optionally, you can fetch updated data from the server here if needed
//             } else {
//                 console.error(`Error updating staff with ID ${staffId}`);
//             }
//         } catch (error) {
//             console.error("Error updating staff details:", error);
//         }
//     };

//     const handleChange = (event, field, staffId) => {
//         const newValue = event.target.value;

//         setStaffList((prevStaffList) => {
//             return prevStaffList.map((staff) => {
//                 if (staff._id === staffId) {
//                     return { ...staff, [field]: newValue };
//                 }
//                 return staff;
//             });
//         });
//     };

//     return (
//         <div>
//             <h4 className="text-uppercase text-center mb-5">Staff List</h4>
//             <div className="table-responsive">
//                 <table className="table table-bordered">
//                     <thead className="table-light sticky-content">
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Department</th>
//                             <th>Designation</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Update</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {staffList.map((staff) => (
//                             <tr key={staff._id}>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.phNumber}
//                                             onChange={(e) => handleChange(e, "phNumber", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.phNumber
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.email}
//                                             onChange={(e) => handleChange(e, "email", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.email
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.dept}
//                                             onChange={(e) => handleChange(e, "dept", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.dept
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.designation}
//                                             onChange={(e) => handleChange(e, "designation", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.designation
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.email}
//                                             onChange={(e) => handleChange(e, "email", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.email
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editingStaffId === staff._id ? (
//                                         <input
//                                             type="text"
//                                             value={staff.phNumber}
//                                             onChange={(e) => handleChange(e, "phNumber", staff._id)}
//                                         />
//                                     ) : (
//                                         staff.phNumber
//                                     )}
//                                 </td>
//                                 <td>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => setEditingStaffId(staff._id)}
//                                     >
//                                         {editingStaffId === staff._id ? 'Save' : 'Update'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <script
//                 src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
//                 integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
//                 crossOrigin="anonymous"
//             ></script>
//         </div>
//     );
// }

// export default ViewStaff;
// import React, { useEffect, useState } from "react";

// function ViewStaff() {
//   const [StaffList, setStaffList] = useState([]);

//   useEffect(() => {
//     fetchStaffDetails();
//   }, []);

//   const fetchStaffDetails = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/Staff/view");
//       const data = await response.json();
//       setStaffList(data);
//     } catch (error) {
//       console.error("Error fetching Staff details:", error);
//     }
//   };

//   return (
//     <div>
//       <h4 className="text-uppercase text-center mb-5">Staff List</h4>
//       <div className="table-responsive">
//         <table className="table table-bordered">
//           <thead className="table-light sticky-content">
//             <tr>
//               <th>Staff</th>
//               <th>email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {StaffList.map((Staff) => (
//               <tr key={Staff._id}>
//                 <td>{Staff.StafphNumber}</td>
//                 <td>{Staff.emails}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <script
//         src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
//         integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
//         crossOrigin="anonymous"
//       ></script>
//     </div>
//   );
// }

// export default ViewStaff;


import React, { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardFooter, CardHeader, Tabs, TabsHeader, Tab, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { BiEdit, BiSave } from 'react-icons/bi';
import { Navigate, useNavigate } from "react-router-dom";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "HOD",
        value: "hod",
    },
    {
        label: "STAFF",
        value: "invigilator",
    },
];

function ViewStaff() {
    const [staffList, setStaffList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [selectedTab, setSelectedTab] = useState("all");
    const navigate = useNavigate()

    useEffect(() => {
        fetchStaffDetails();
    }, [currentPage, selectedTab]);

    const fetchStaffDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3000/staff/view");
            setStaffList(response.data);
        } catch (error) {
            console.error("Error fetching Staff details:", error)
        }
    };

    const handleUpdate = async (staffId) => {
        const updatedStaff = staffList.find((staff) => staff._id === staffId);
        const { fName, lName, email, dept, designation, phNumber } = updatedStaff;

        try {
            const response = await fetch(`http://localhost:3000/staff/update/${staffId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fName, lName, email, dept, designation, phNumber })
            });

            if (response.ok) {
                console.log(`Staff with ID ${staffId} updated successfully.`);
                setEditingStaffId(null);
            } else {
                console.error(`Error updating staff with ID ${staffId}`);
            }
        } catch (error) {
            console.error("Error updating staff details:", error);
        }
    };

    const handleChange = (event, field, staffId) => {
        const newValue = event.target.value;

        setStaffList((prevStaffList) => {
            return prevStaffList.map((staff) => {
                if (staff._id === staffId) {
                    return { ...staff, [field]: newValue };
                }
                return staff;
            });
        });
    };

    const handleEdit = (staff) => {
        setEditingStaffId(staff._id);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleTabChange = (tabValue) => {
        console.log("Tab changed to:", tabValue);
        setSelectedTab(tabValue);
    };

    const filterStaffList = () => {
        if (selectedTab === "all") {
            return staffList;
        } else {
            return staffList.filter((staff) => staff.designation.toLowerCase() === selectedTab);
        }
    };

    const startIndex = (currentPage - 1) * 5;
    const paginatedStaffList = filterStaffList().slice(startIndex, startIndex + 5);
    return (
        <div className="flex justify-center pt-4">
            <Card className="h-75 w-75 shadow-md">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Staff List
                            </Typography>
                        </div>
                        <Tabs value={selectedTab} onChange={handleTabChange} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Button
                                        key={value}
                                        onClick={() => handleTabChange(value)}
                                        color={selectedTab === value ? "blue" : "gray"}
                                        size="sm"
                                        className="bg-white text-blue-gray-500 hover:bg-blue-white-100 hover:text-blue-gray-700 rounded-0"
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="flex gap-2">
                            <Button onClick={() => { navigate('/staff/add') }} className="flex items-center gap-3" size="sm" >
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Staff

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
                                            First Name
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Last Name
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Phone Number
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Email
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Designation
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Department
                                        </Typography>
                                    </th>
                                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3">
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
                                {paginatedStaffList.map((staff) => (
                                    <tr key={staff._id}>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={staff.fName}
                                                    onChange={(e) => handleChange(e, 'fName', staff._id)}
                                                />
                                            ) : (
                                                staff.fName
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={staff.lName}
                                                    onChange={(e) => handleChange(e, 'lName', staff._id)}
                                                />
                                            ) : (
                                                staff.lName
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={staff.phNumber}
                                                    onChange={(e) => handleChange(e, 'phNumber', staff._id)}
                                                />
                                            ) : (
                                                staff.phNumber
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{
                                                        width: '100px',
                                                        padding: '5px',
                                                        border: '1px solid #ccc', // Border color
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // Shadow
                                                        borderRadius: '4px', // Border radius
                                                    }}
                                                    type="text"
                                                    value={staff.email}
                                                    onChange={(e) => handleChange(e, 'email', staff._id)}
                                                />
                                            ) : (
                                                staff.email
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{ width: '100px' }}
                                                    type="text"
                                                    value={staff.designation}
                                                    onChange={(e) => handleChange(e, 'designation', staff._id)}
                                                />
                                            ) : (
                                                staff.designation
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <input
                                                    style={{ width: '100px' }}
                                                    type="text"
                                                    value={staff.dept}
                                                    onChange={(e) => handleChange(e, 'dept', staff._id)}
                                                />
                                            ) : (
                                                staff.dept
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {editingStaffId === staff._id ? (
                                                <BiSave onClick={() => handleUpdate(staff._id)} className="cursor-pointer text-green-300 h-5 w-5" />
                                            ) : (
                                                <BiEdit onClick={() => handleEdit(staff)} className="cursor-pointer text-blue-300 h-5 w-5" />
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
                        Page {currentPage} of {Math.ceil(filterStaffList().length / 5)}
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

export default ViewStaff;
