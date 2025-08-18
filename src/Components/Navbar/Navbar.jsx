import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, User, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReservations } from '../../context/ReservationContext';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';

const Navbar = () => {
  const { toasts } = useToast();
  const { user, logout, updateAvatar, removeAvatar } = useAuth();
  const { reservations } = useReservations(); 
  const location = useLocation();
  const navigate = useNavigate();

  const userReservationsCount = reservations.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isGuest = !!user && user.role === 'guest';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact Us' },
  ];

  if (user?.role === 'admin') navItems.push({ path: '/dashboard', label: 'Dashboard' });

  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!user || (!user.id && !user._id)) {
  console.error("No user logged in or user ID missing");
  return;
}


  const formData = new FormData();
  formData.append('avatar', file);

  try {
    setUploading(true);

    const userId = user.id || user._id;
const response = await axios.post(
  `https://clinic-management-system-d9b4.vercel.app/api/users/upload-avatar/${userId}`,
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);


    console.log("Upload successful:", response.data);

    if (response.data.user?.avatar) {
      updateAvatar(response.data.user.avatar); // بس حدث الـ context
    }
  } catch (error) {
    console.error("Upload error:", error.response || error.message);
  } finally {
    setUploading(false);
  }
};

return (
      <>
    <header className="sticky-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-md navbar-light bg-white">
        <div className="container">
          <Link
            to={isGuest ? '/login' : '/'}
            className="navbar-brand d-flex align-items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Heart className="text-primary" size={28} />
            <span className="fw-bold text-dark">PawCare Clinic</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="mainNavbar"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link
                    to={isGuest && item.path !== '/' ? '/login' : item.path}
                    className={`nav-link ${isActive(item.path) ? 'active text-primary fw-semibold' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {user ? (
                user.role === 'guest' ? (
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">Guest</span>
                    <Link to="/login" className="d-inline-flex align-items-center gap-1 text-decoration-none text-dark">
                      <User size={18} />
                      <span>Login</span>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2" ref={dropdownRef}>
                    {/* Avatar */}
                    <div className="d-flex align-items-center">
                      {user.avatar ? (
                        <div className="position-relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-circle me-2"
                            style={{ width: 32, height: 32, objectFit: 'cover', border: '1px solid #dee2e6' }}
                          />
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const result = await removeAvatar(user.id || user._id);
                                if (!result.success) alert(result.message || 'Failed to remove avatar');
                            }}
                            aria-label="Remove avatar"
                            className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-danger p-0 d-flex align-items-center justify-content-center"
                            style={{ width: '16px', height: '16px', fontSize: '10px', border: '1px solid white' }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-0"
                          style={{ width: 32, height: 32, fontSize: '0.9rem', border: '1px solid #dee2e6' }}
                        >
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>

                    {/* Dropdown */}
                    <div className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle ms-0 me-1"
                        href="#"
                        role="button"
                        aria-expanded={isDropdownOpen}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                      >
                        {user.name}
                      </a>
                      <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                        <Link
                          className="dropdown-item d-flex justify-content-between align-items-center"
                          to="/reservations"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Your Reservation
                          {userReservationsCount > 0 && (
                            <span className="badge bg-danger ms-2">{userReservationsCount}</span>
                          )}
                        </Link>
                        <div className="dropdown-divider"></div>
                      </div>
                    </div>

                    {/* Upload Avatar */}
                    <div className="position-relative">
                      <input
                        id="avatarUpload"
                        type="file"
                        accept="image/*"
                        className="d-none"
                        onChange={handleAvatarUpload}
                      />
                      <label
                        htmlFor="avatarUpload"
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
                        style={{ whiteSpace: 'nowrap', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        title={user.avatar ? 'Change avatar' : 'Upload avatar'}
                      >
                        <Camera size={14} />
                        <span>{user.avatar ? 'Change' : 'Upload'}</span>
                      </label>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={async () => {
                        await logout();
                        navigate('/login', { replace: true });
                      }}
                      className="btn btn-link text-danger p-0"
                    >
                      Logout
                    </button>
                  </div>
                )
              ) : (
                <Link to="/login" className="d-inline-flex align-items-center gap-1 text-decoration-none text-dark">
                  <User size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
      <div style={{ position: "fixed", top: "70px", right: "20px", zIndex: 1050 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`alert alert-${toast.type} alert-dismissible fade show`}
            role="alert"
            style={{ minWidth: "250px", marginBottom: "10px" }}
          >
            {toast.text}
          </div>
        ))}
      </div>
      </>
  );
};

export default Navbar;
