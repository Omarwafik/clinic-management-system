import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState(''); // no default selection
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const { login, loginAsGuest, isLoading } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  const validateForm = () => {
    const newErrors = {};

    if (isLogin && !role) newErrors.role = 'Please select a role';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters long';

    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters long';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const success = await login(formData.email, formData.password, role);
      if (!success) setErrors({ general: 'Invalid email or password. Please check and try again.' });
    } else {
      alert('Signup functionality would be implemented here');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'linear-gradient(135deg, #eff6ff, #ffffff, #ecfdf5)' }}>
      <div className="w-100" style={{ maxWidth: '28rem' }}>
        <div className="text-center mb-3">
          <h2 className="h2 fw-bold text-dark mb-1 mt-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-secondary mb-0">{isLogin ? 'Sign in to access your account' : 'Join us to manage your health'}</p>
        </div>

        <div className="card shadow-sm rounded-1 overflow-hidden m-3">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="text-start">
              {isLogin && (
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="fw-semibold">Sign in as:</span>
                    <div className="form-check me-2">
                      <input className="form-check-input" type="radio" name="role" id="rolePatient" checked={role === 'patient'} onChange={() => setRole('patient')} />
                      <label className="form-check-label" htmlFor="rolePatient">Patient</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="role" id="roleAdmin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                      <label className="form-check-label" htmlFor="roleAdmin">Admin (Doctor)</label>
                    </div>
                  </div>
                  {errors.role && <div className="text-danger small mt-1">{errors.role}</div>}
                </div>
              )}

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter your full name" />
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter your email" />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="position-relative">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} className={`form-control pe-5 ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter your password" />
                  {!errors.password && (
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      onPointerDown={(e) => e.preventDefault()}
                      onPointerUp={(e) => e.preventDefault()}
                      onFocus={(e) => e.target.blur()}
                      tabIndex={-1}
                      className="btn btn-sm p-2 position-absolute end-0 top-50 translate-middle-y text-secondary password-toggle"
                      style={{ outline: 'none', boxShadow: 'none' }}
                    >
                      {showPassword ? (
                        // outline eye-slash
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l18 18" />
                          <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
                          <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a18.68 18.68 0 0 1-5.08 5.88" />
                          <path d="M6.61 6.61A18.7 18.7 0 0 0 1 12s4 7 11 7a10.94 10.94 0 0 0 2.12-.22" />
                        </svg>
                      ) : (
                        // outline eye
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="position-relative">
                    <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleInputChange} className={`form-control pe-5 ${errors.confirmPassword ? 'is-invalid' : ''}`} placeholder="Confirm your password" />
                    {!errors.confirmPassword && (
                      <button
                        type="button"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseUp={(e) => e.preventDefault()}
                        onPointerDown={(e) => e.preventDefault()}
                        onPointerUp={(e) => e.preventDefault()}
                        onFocus={(e) => e.target.blur()}
                        tabIndex={-1}
                        className="btn btn-sm p-2 position-absolute end-0 top-50 translate-middle-y text-secondary password-toggle"
                        style={{ outline: 'none', boxShadow: 'none' }}
                      >
                        {showConfirmPassword ? (
                          // outline eye-slash
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3l18 18" />
                            <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
                            <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a18.68 18.68 0 0 1-5.08 5.88" />
                            <path d="M6.61 6.61A18.7 18.7 0 0 0 1 12s4 7 11 7a10.94 10.94 0 0 0 2.12-.22" />
                          </svg>
                        ) : (
                          // outline eye
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                </div>
              )}

              {errors.general && (
                <div className="alert alert-danger" role="alert">{errors.general}</div>
              )}

              <button type="submit" disabled={isLoading} className="btn btn-primary w-100">
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => loginAsGuest()}>
                Continue as Guest
              </button>

              <div className="text-center mt-3">
                <small className="text-secondary me-1">{isLogin ? "Don't have an account?" : 'Already have an account?'}</small>
                <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormData({ name: '', email: '', password: '', confirmPassword: '' }); setRole(''); }} className="btn btn-link p-0 align-baseline">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;