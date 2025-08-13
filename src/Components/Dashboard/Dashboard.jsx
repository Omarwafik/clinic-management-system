import React from "react";
import "../../assets/css/sb-admin-2.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href=""
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            Clinic <sup>System</sup>
          </div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link btn" onClick={()=>navigate('/dashboard')}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">Interface</div>

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed btn"
            // href=""
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
            onClick={()=>navigate('/dashboard/users')}
          >
        
            <i className="fas fa-fw fa-cog"></i>
            <span>Manage Users</span>
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
            onClick={()=>navigate('/dashboard/doctors')}
          >
            <i className="fas fa-fw fa-cog"></i>
            <span>Manage Doctors</span>
          </a>
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
                                                Earnings (Monthly)</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
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
                                                Earnings (Annual)</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Tasks Card Example --> */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center px-4">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            style={{width:"50%"}} aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div> */}
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
                                                Pending Requests</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
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
