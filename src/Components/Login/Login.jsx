import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff,  PawPrint } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

/* ===== Regex===== */
const EMAIL_REGEX = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const STRONG_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/;
const MIN_NAME_LEN = 3;
const MAX_NAME_LEN = 50;

const Login = () => {
  const { login, register, loginAsGuest, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
const location = useLocation();

useEffect(() => {
  if (user && user.role !== 'guest' && location.state?.fromLogin) {
    const targetRoute = user.role === 'admin' ? '/dashboard' : '/';
    navigate(targetRoute, { replace: true });
  }
}, [user, navigate, location.state]);


  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    // Password
    // Password
if (!formData.password) {
  newErrors.password = 'Password is required';
} else if (!STRONG_PWD.test(formData.password)) {
  newErrors.password = 'Password must be 8+ chars & include upper, lower, number, and symbol (no spaces)';
}

    // Sign Up only
    if (!isLogin) {
      const nameLen = formData.name ? formData.name.trim().length : 0;
      if (!nameLen) newErrors.name = 'Name is required';
      else if (nameLen < MIN_NAME_LEN) newErrors.name = `Name must be at least ${MIN_NAME_LEN} characters`;
      else if (nameLen > MAX_NAME_LEN) newErrors.name = `Name must be at most ${MAX_NAME_LEN} characters`;

      if (!formData.phone) newErrors.phone = 'Phone number is required';
      else if (!PHONE_REGEX.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setFormError('');

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    if (isLogin) {
  const result = await login(formData.email, formData.password);
  if (!result.success) {
    if (result.errors) {
      setErrors(prev => ({ ...prev, ...result.errors }));
    } else {
      setFormError(result.message || 'Login failed');
    }
    return;
  }
  const redirectPath = result.role === 'admin' ? '/dashboard' : '/';
  navigate(redirectPath, { replace: true, state: { fromLogin: true } });
} else {
      const result = await register(formData.name, formData.email, formData.phone, formData.password);
      if (!result.success) {
        if (result.errors) {
          setErrors(prev => ({ ...prev, ...result.errors }));
        } else {
          setFormError(result.message || 'Registration failed');
        }
        return;
      }
      setFormError('Registration successful! Please sign in.');
      setIsLogin(true);
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }
  } catch (err) {
    console.error(err);
    setFormError('An unexpected error occurred. Please try again.');
  }
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <PawPrint className={styles.logoIcon} />
            <span>PawCare Clinic</span>
          </div>
          <p className={styles.subtitle}>
            {isLogin ? 'Sign in to access your account' : 'Create a new account to get started'}
          </p>
        </div>

        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          {formError && <div className={styles.errorMessage}>{formError}</div>}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {!isLogin && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={'form-control ' + (errors.name ? 'is-invalid' : '')}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={'form-control ' + (errors.phone ? 'is-invalid' : '')}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                </div>
              </>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={'form-control ' + (errors.email ? 'is-invalid' : '')}
                placeholder="Enter your email"
                autoComplete="username"
              />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={'form-control ' + (errors.password ? 'is-invalid pe-5' : '')}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                {!errors.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={'form-control ' + (errors.confirmPassword ? 'is-invalid pe-5' : '')}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  {!errors.confirmPassword && (
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                  {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 py-2 mb-3" disabled={isLoading}>
              {isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            {isLogin && (
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-3"
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await loginAsGuest();
                  if (result?.success) navigate('/', { replace: true });
                }}
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
                  setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
                  setFormError('');
                }}
                className={styles.toggleFormButton}
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
