// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Dashboard from "./Components/Dashboard/Dashboard";
import TableUsers from "./Components/Dashboard/TableUsers";
import TableDoctors from "./Components/Dashboard/TableDoctors";
import Charts from "./Components/Dashboard/Charts";
import Services from "./Components/Servicess/Services";
import ServiceDetails from "./Components/ServiceDetails/ServiceDetails";
import Login from './Components/Login/login';
import Home from './Components/Home';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/index';

import './App.css';

// Wrapper بسيط للصفحات اللي فيها Navbar
const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
};

/**
 * GuestClickCatcher:
 * بيمنع أي كليك داخل الـ Home لو اليوزر ضيف، وبيحوّله على /login
 * (بنستخدم onClickCapture علشان نضمن إن أي كليك جوّه الـ Home يتلقط،
 *  ومن غير ما نغطي الـ Navbar أو نغيّر أي ستايل).
 */
const GuestClickCatcher = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isGuest = user?.role === 'guest';

  const handleClickCapture = (e) => {
    if (!isGuest) return;
    // امنع أي أكشن جوّه الهوم، وودّي على اللوجين
    e.preventDefault();
    e.stopPropagation();
    navigate('/login');
  };

  return (
    <div onClickCapture={handleClickCapture}>
      {children}
    </div>
  );
};

function AppContent() {
  const { user, isLoading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  if (isLoading || initialLoad) {
    return <div className="app-loading">Loading...</div>;
  }

  const getAfterLoginPath = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/dashboard' : '/';
  };

  const isGuest = user?.role === 'guest';

  return (
    <Routes>
      {/* Login: يظهر لغير المسجلين أو الجيست؛ لو مستخدم فعلي يحوّل حسب دوره */}
      <Route
        path="/login"
        element={
          (!user || isGuest)
            ? <Login />
            : <Navigate to={getAfterLoginPath()} replace />
        }
      />

      {/* Home:
          - مسموح للجيست (يشوف الصفحة)، لكن أي كليك جوّهها يودّي للّوجين
          - المستخدم العادي يشوفها طبيعي
          - الأدمن يتحوّل للدashboard
          - غير المسجلين يتحوّلوا للّوجين */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageLayout>
                {/* هنا بنطبق الـ GuestClickCatcher على الـ Home بس */}
                <GuestClickCatcher>
                  <Home />
                </GuestClickCatcher>
              </PageLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Services:
          - ممنوع على الجيست وعلى الأدمن
          - مسموح لباقي المستخدمين */}
      <Route
        path="/services"
        element={
          user ? (
            (user.role === 'admin' || isGuest) ? (
              <Navigate to="/login" replace />
            ) : (
              <PageLayout>
                <Services />
              </PageLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/services/:doctorId"
        element={
          user ? (
            (user.role === 'admin' || isGuest) ? (
              <Navigate to="/login" replace />
            ) : (
              <PageLayout>
                <ServiceDetails />
              </PageLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Contact: الأدمن مايشوفهاش */}
      <Route
        path="/contact"
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageLayout>
                <Contact />
              </PageLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Dashboard للأدمن فقط */}
      <Route
        path="/dashboard"
        element={
          user?.role === 'admin' ? (
            <PageLayout>
              <Dashboard />
            </PageLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Charts />} />
        <Route path="users" element={<TableUsers />} />
        <Route path="doctors" element={<TableDoctors />} />
      </Route>

      {/* أي Route تاني */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/dashboard' : '/'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}