import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import './App.css';

// Simple layout wrapper for pages that need the Navbar
const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">{children}</main>
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

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={
          !user ? (
            <Login />
          ) : (
            <Navigate to={getAfterLoginPath()} replace />
          )
        }
      />

      {/* Home route - only for non-admin users */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageLayout>
                <Home />
              </PageLayout>
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Services routes - not accessible to admin */}
      <Route
        path="/services"
        element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
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
            user.role === 'admin' ? (
              <Navigate to="/dashboard" replace />
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

      {/* Admin dashboard routes */}
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

      {/* Catch all other routes */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate
              to={user.role === 'admin' ? '/dashboard' : '/'}
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

// ... (keep the existing global styles and style element code)

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;