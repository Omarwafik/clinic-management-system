import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn, UserPlus, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  const { login, register, loginAsGuest, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const targetRoute = user.role === 'admin' ? '/dashboard' : '/';
      if (window.location.pathname !== targetRoute) {
        navigate(targetRoute);
      }
    }
  }, [user, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setErrors({});
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        // Handle login
        const result = await login(formData.email, formData.password);
        
        if (!result.success) {
          // Handle error based on error code
          if (result.message === 'EMAIL_NOT_FOUND') {
            setErrors({ email: 'Email not found' });
          } else if (result.message === 'INVALID_PASSWORD') {
            setErrors({ password: 'Incorrect password' });
          } else {
            setFormError('An error occurred during login');
          }
          return;
        }
        
        // Handle successful login
        console.log('Login successful, user role:', result.role);
        const redirectPath = result.role === 'admin' ? '/dashboard' : '/';
        navigate(redirectPath);
      } else {
        // Handle registration
        const { success, message } = await register(
          formData.name,
          formData.email,
          formData.password
        );

        if (!success) {
          setFormError(message || 'Registration failed. Please try again.');
        } else {
          // Show success message and switch to login form
          setFormError('');
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          // Switch to login form
          setIsLogin(true);
          // Show success message
          setFormError('Registration successful! Please sign in.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAsGuest();
      if (result?.success) {
        navigate('/');
      } else {
        setFormError('Failed to log in as guest. Please try again.');
      }
    } catch (error) {
      console.error('Guest login error:', error);
      setFormError('An error occurred during guest login.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <PawPrint className={styles.logoIcon} />
            <span>PawCare Clinic</span>
          </div>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Create a new account to get started'}
          </p>
        </div>

        {/* Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          
          {formError && <div className={styles.errorMessage}>{formError}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="position-relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback d-block">{errors.name}</div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="position-relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid pe-5' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
                {!errors.password && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                    style={{ transform: 'translateY(-50%)', outline: 'none', boxShadow: 'none' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
                {errors.password && (
                  <div className="invalid-feedback d-block">{errors.password}</div>
                )}
              </div>
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid pe-5' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                  />
                  {!errors.confirmPassword && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                      style={{ transform: 'translateY(-50%)', outline: 'none', boxShadow: 'none' }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? (
                    <LogIn size={18} className="me-2" />
                  ) : (
                    <UserPlus size={18} className="me-2" />
                  )}
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </>
              )}
            </button>

            {isLogin && (
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-3"
                onClick={handleGuestLogin}
                disabled={isLoading}
              >
                Continue as Guest
              </button>
            )}

            <div className="text-center mt-3">
              <span className="text-muted">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                className="btn btn-link p-0 text-decoration-underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
