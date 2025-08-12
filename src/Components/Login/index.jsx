import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn, PawPrint } from 'lucide-react';
import styles from './login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Determine role based on email domain
  const getRoleFromEmail = (email) => {
    if (email.endsWith('@clinic.com') || email.endsWith('@doctor.com')) {
      return 'admin';
    }
    return 'patient';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters long';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      const role = getRoleFromEmail(formData.email);
      const success = await login(formData.email, formData.password, role);
      if (!success) {
        setErrors({ general: 'Invalid email or password. Please check and try again.' });
      }
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <PawPrint size={28} className={styles.logoIcon} />
            PawCare Clinic
          </div>
          <p className={styles.subtitle}>Your pet's health is our top priority</p>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Full Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className={`${styles.formControl} ${errors.name ? styles.invalid : ''}`} 
                  placeholder="Enter your full name" 
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className={`${styles.formControl} ${errors.email ? styles.invalid : ''}`} 
                placeholder="Enter your email" 
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.formControl} ${errors.password ? styles.invalid : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseUp={(e) => e.preventDefault()}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                <div className={styles.passwordInput}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`${styles.formControl} ${errors.confirmPassword ? styles.invalid : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
            )}

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btnPrimary} disabled={isLoading}>
                {isLoading ? (
                  <span className={styles.spinner} role="status" aria-hidden="true"></span>
                ) : (
                  <LogIn size={18} className={styles.icon} />
                )}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              {isLogin && (
                <button
                  type="button"
                  className={`${styles.btnPrimary} ${styles.guestButton}`}
                  onClick={loginAsGuest}
                  disabled={isLoading}
                >
                  Continue as Guest
                </button>
              )}
            </div>

            <div className={styles.divider}>
              <span className={styles.dividerText}>OR</span>
            </div>

            <div className={styles.footer}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
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
                className={styles.toggleFormButton}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;