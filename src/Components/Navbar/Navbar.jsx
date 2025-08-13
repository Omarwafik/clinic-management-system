import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, User, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const { user, logout, updateAvatar, removeAvatar } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isGuest = !!user && user.role === 'guest';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact Us' }
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/dashboard', label: 'Dashboard' });
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const result = await updateAvatar(dataUrl);
      if (!result.success) {
        alert('Failed to update avatar. Please try again.');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <header className="sticky-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-md navbar-light bg-white" aria-label="Main navigation">
        <div className="container">
          {/* Brand → لو Guest يروح /login غير كده Home */}
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
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  {/* أي لينك (ماعدا Home) يروح login لو Guest */}
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
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center">
                      <div className="position-relative">
                        {user.avatar ? (
                          <div className="position-relative">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="rounded-circle me-2"
                              style={{ 
                                width: 32, 
                                height: 32, 
                                objectFit: 'cover',
                                border: '1px solid #dee2e6'
                              }}
                            />
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                const result = await removeAvatar();
                                if (!result.success) {
                                  alert(result.message || 'Failed to remove avatar');
                                }
                              }}
                              className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: '16px',
                                height: '16px',
                                fontSize: '10px',
                                lineHeight: '1',
                                border: '1px solid white',
                              }}
                              title="Remove avatar"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                               style={{ 
                                 width: 32, 
                                 height: 32, 
                                 fontSize: '0.9rem',
                                 border: '1px solid #dee2e6'
                               }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                        )}
                      </div>
                      <span className="text-muted small ms-2 me-3">{user.name}</span>
                      
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
                          style={{ 
                            whiteSpace: 'nowrap',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.8rem'
                          }}
                          title={user.avatar ? 'Change avatar' : 'Upload avatar'}
                        >
                          <Camera size={14} />
                          <span>{user.avatar ? 'Change' : 'Upload'}</span>
                        </label>
                      </div>
                    </div>
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
  );
};

export default Navbar;