// import React from 'react';
// import "bootstrap"
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// function NavbarAdmin({ children }) {
//   const navigate = useNavigate()
//   const handleLogout = () => {
//     Cookies.remove('token', { path: '/' });
//     navigate('/')
//   };
//   return (
//     <div>
//       <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: "#1ab06d" }}>
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Duty Allocator</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
//             aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarScroll">
//             <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/">Home</a>
//               </li>
//               <li className="nav-item dropdown">
//                 <a className="nav-link dropdown-toggle" designation="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Staff
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li><a className="dropdown-item" href="/staff/add">Add Staff</a></li>

//                   <li><a className="dropdown-item" href="/staff/view">View Staff</a></li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a className="nav-link dropdown-toggle" designation="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Department
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li><a className="dropdown-item" href="/dept/add">Add Department</a></li>

//                   <li><a className="dropdown-item" href="/dept/view">View Department</a></li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a className="nav-link dropdown-toggle" designation="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Rooms
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li><a className="dropdown-item" href="/room/add">Add Room</a></li>

//                   <li><a className="dropdown-item" href="/room/view">View Room</a></li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a className="nav-link dropdown-toggle" designation="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Duty
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li><a className="dropdown-item" href="/duty/request">Duty Request</a></li>
//                   <li><a className="dropdown-item" href="/duty/view">View Approved</a></li>
//                 </ul>
//               </li>
//             </ul>
//             <a href="#" className="nav-link" onClick={handleLogout}>
//               <i className="bi bi-box-arrow-right text-white" style={{ fontSize: '30px' }}></i>
//             </a>
//           </div>
//         </div>
//       </nav>
//       <div>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default NavbarAdmin;

import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  KeyIcon,
  Bars2Icon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

// profile menu component

const profileMenuItems = [
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    route: "/admin/profile",
  },
  {
    label: "Change Password",
    icon: KeyIcon,
    route: "/admin/password",
  },
  {
    label: "Log Out",
    icon: PowerIcon,
    action: "logout",
  },
];

function ProfileMenu() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    sessionStorage.clear();
    navigate("/");
  };

  const handleMenuAction = (item) => {
    if (item.action === "logout") {
      handleLogout();
    } else {
      navigate(item.route);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <p className="text-center font-semibold p-2">
          {sessionStorage.getItem("fName") +
            " " +
            sessionStorage.getItem("lName")}
        </p>
        {profileMenuItems.map(({ label, icon, route, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                handleMenuAction({ route, action });
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function StaffListMenu() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          Staff
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/staff/add")}
        >
          Add Staff
        </MenuItem>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/staff/view")}
        >
          View Staff
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
function DeptListMenu() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          Department
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/dept/add")}
        >
          Add Dept
        </MenuItem>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/dept/view")}
        >
          View Dept
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function RoomListMenu() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          Room
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/room/add")}
        >
          Add Room
        </MenuItem>
        <MenuItem
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate("/room/view")}
        >
          View Room
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

const navListItems = [
  {
    label: "Duty Request",
    icon: ShieldExclamationIcon,
    route: "/duty/request",
  },
  {
    label: "Approved Request",
    icon: ShieldCheckIcon,
    route: "/view/admin/approved",
  },
];

function NavList() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <ul className="mr-4 ml-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <StaffListMenu />
      <DeptListMenu />
      <RoomListMenu />
      {navListItems.map(({ label, icon, route }, key) => (
        <Typography
          key={label}
          as="a"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => handleNavigate(route)}
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function NavbarAdmin() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-3">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Duty Allocator
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
