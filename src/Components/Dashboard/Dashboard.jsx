import React, { use, useEffect, useState } from "react";
import "../../assets/css/sb-admin-2.css";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // افترض عندك auth context
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // دالة logout من context

  const handleLogout = async () => {
    await logout(); // تمسح بيانات المستخدم
    navigate('/login', { replace: true }); // يروح login
  };

  // const [Doctors, setDoctors] = useState([]);
  const [Reservations, setReservations] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Doctors, setDoctors] = useState([]);
  const [Messages, setMessages] = useState([]);
  useEffect(()=>{
    axios.get('https://clinic-backend-production-9c79.up.railway.app/reservations')
    .then(res => setReservations(res.data))
    .catch(err => console.log(err))
    axios.get('https://clinic-backend-production-9c79.up.railway.app/users')
    .then( res => setUsers(res.data))
    .catch(err => console.log(err))
    axios.get('https://clinic-backend-production-9c79.up.railway.app/doctors')
    .then( res => setDoctors(res.data))
    .catch(err => console.log(err))
    axios.get('https://clinic-backend-production-9c79.up.railway.app/ContactUs')
    .then( res => setMessages(res.data))
    .catch(err => console.log(err))
  } , [])

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <div className="sidebar-brand d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            Clinic <sup>System</sup>
          </div>
        </div>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <button className="nav-link btn w-100 text-left" onClick={()=>navigate('/dashboard')}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </button>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">Interface</div>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <button
            className="nav-link collapsed btn w-100 text-left"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            onClick={()=>navigate('/dashboard/users')}
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Manage Users</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link collapsed btn w-100 text-left"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            onClick={()=>navigate('/dashboard/doctors')}
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Manage Doctors</span>
          </button>
        </li>
         {/* hena el user reservation Table */}
        <li className="nav-item">
          <a
            className="nav-link collapsed btn"
            // href=""
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            onClick={()=>navigate('/dashboard/reservations')}
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Reservations</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed btn"
            // href=""
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            onClick={()=>navigate('/dashboard/messages')}
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Messages</span>
          </a>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-danger d-flex align-items-center"
            onClick={handleLogout}
            style={{ gap: "0.25rem", padding: "0.375rem 0.25rem" , marginTop:"2rem" }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
      {/* End of Sidebar */}

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <h1 className="h3 ps-2 mb-0 text-gray-800">Dashboard</h1>
          </nav>
          {/* End of Topbar */}

          {/* Begin Page Content */}
          <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        {/* <h1 className="h3 mb-0 text-gray-800">Cards</h1> */}
                    </div>

                    <div className="row">

                        {/* <!-- Earnings (Monthly) Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center px-2">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total User</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{Users.length}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Earnings (Annual) Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center px-2">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total Doctors</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{Doctors.length}</div>
                                        </div>
                                        <div className="col-auto">
                                          <i className="fas fa-user-md fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Tasks Card Example --> */}
                          <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center px-2">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Total Messages</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{Messages.length}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Pending Requests Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center px-2">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Total Reservations</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{Reservations.length}</div>
                                        </div>
                                        <div className="col-auto">
  <i className="fas fa-user-friends fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet/>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}

        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Clinic 2025</span>
            </div>
          </div>
        </footer>
      </div>
      {/* End of Content Wrapper */}
    </div>
  );
}
