import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import TableUsers from "./Components/Dashboard/TableUsers/TableUsers";
import TableDoctors from "./Components/Dashboard/TableDoctors/TableDoctors";
import Charts from "./Components/Dashboard/Charts/Charts";
import Services from "./Components/Servicess/Services";
import ServiceDetails from "./Components/ServiceDetails/ServiceDetails";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import UserReservation from "./Components/UserReservation/UserReservation";
import { useEffect, useState } from "react";
import "./App.css";
import "./Styles/animations.css";
import { ReservationProvider } from "./context/ReservationContext";
import { ToastProvider } from "./context/ToastContext";
import ReservationTable from "./Components/Dashboard/ReservationTable/ReservationTable";
import TableContact from "./Components/Dashboard/TableContact/TableContact";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./Components/Animations/AnimationComponents";
import LoadingAnimation from "./Components/Animations/LoadingAnimation";

// Wrapper بسيط للصفحات اللي فيها Navbar
const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
};

// GuestClickCatcher
const GuestClickCatcher = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isGuest = user?.role === "guest";

  const handleClickCapture = (e) => {
    if (!isGuest) return;
    e.preventDefault();
    e.stopPropagation();
    navigate("/login");
  };

  return <div onClickCapture={handleClickCapture}>{children}</div>;
};

function AppContent() {
  const { user, isLoading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  if (isLoading || initialLoad) {
    return <LoadingAnimation />;
  }

  const getAfterLoginPath = () => {
    if (!user) return "/";
    return user.role === "admin" ? "/dashboard" : "/";
  };

  const isGuest = user?.role === "guest";

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            !user || isGuest ? (
              <PageTransition key="login">
                <Login />
              </PageTransition>
            ) : (
              <Navigate to={getAfterLoginPath()} replace />
            )
          }
        />

        {/* Home */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <PageLayout>
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

        {/* Services */}
        <Route
          path="/services"
          element={
            user ? (
              user.role === "admin" || isGuest ? (
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
              user.role === "admin" || isGuest ? (
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

        {/* Contact */}
        <Route
          path="/contact"
          element={
            user ? (
              user.role === "admin" ? (
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

        {/* User Reservation */}
        <Route
          path="/reservations"
          element={
            user ? (
              user.role !== "admin" && user.role !== "guest" ? (
                <PageLayout>
                  <UserReservation />
                </PageLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user?.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Charts />} />
          <Route path="users" element={<TableUsers />} />
          <Route path="doctors" element={<TableDoctors />} />
          <Route path="reservations" element={<ReservationTable />} />
          <Route path="messages" element={<TableContact />} />
        </Route>

        {/* Any other path */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate
                to={user.role === "admin" ? "/dashboard" : "/"}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/clinic-management-system">
      <ToastProvider>
        <ReservationProvider>
          <AppContent />
        </ReservationProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
