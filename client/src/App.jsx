import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AddStaff from "./staff/AddStaff";
import ViewStaff from "./staff/ViewStaff";
import AddDept from "./dept/AddDept";
import ViewDept from "./dept/ViewDept";
import AddRoom from "./room/AddRoom";
import ViewRoom from "./room/ViewRoom";
import DutyRequest from "./duty/DutyRequest";
import Login from "./Login";
import AdminDash from "./dashboard/AdminDash";
import HodDash from "./dashboard/HodDash";
import ViewApproved from "./duty/ViewApproved";
import DutyApprove from "./duty/DutyApprove";
import StaffApprove from "./duty/StaffApprove";
import HodLayout from "./navbar/HodLayout";
import AdminLayout from "./navbar/AdminLayout";
import ViewApprovedHod from "./duty/ViewApprovedHod";
import Temp from "./temp";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/temp' element={<Temp />}></Route>
          <Route path='/dashboard/admin' element={<AdminLayout><AdminDash /></AdminLayout>}></Route>
          <Route path='/dashboard/hod' element={<HodLayout><HodDash /></HodLayout>}></Route>
          <Route path='/hod/password' element={<HodLayout><ChangePassword /></HodLayout>}></Route>
          <Route path='/admin/password' element={<AdminLayout><ChangePassword /></AdminLayout>}></Route>
          <Route path='/admin/profile' element={<AdminLayout><EditProfile /></AdminLayout>}></Route>
          <Route path='/hod/profile' element={<HodLayout><EditProfile /></HodLayout>}></Route>
          <Route path='/staff/add' element={<AdminLayout><AddStaff /></AdminLayout>}></Route>
          <Route path='/staff/view' element={<AdminLayout><ViewStaff /></AdminLayout>}></Route>
          <Route path='/dept/add' element={<AdminLayout><AddDept /></AdminLayout>}></Route>
          <Route path='/dept/view' element={<AdminLayout><ViewDept /></AdminLayout>}></Route>
          <Route path='/room/add' element={<AdminLayout><AddRoom /></AdminLayout>}></Route>
          <Route path='/room/view' element={<AdminLayout><ViewRoom /></AdminLayout>}></Route>
          <Route path='/duty/request' element={<AdminLayout><DutyRequest /></AdminLayout>}></Route>
          <Route path='/view/hod/approved' element={<HodLayout><ViewApprovedHod /></HodLayout>}></Route>
          <Route path='/view/admin/approved' element={<AdminLayout><ViewApproved /></AdminLayout>}></Route>
          <Route path='/duty/approve' element={<HodLayout><DutyApprove /></HodLayout>}></Route>
          <Route path='/duty/:requestId' element={<HodLayout><StaffApprove /></HodLayout>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
