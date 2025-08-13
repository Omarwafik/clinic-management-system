import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn, UserPlus, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

/* ====== قواعد التحقق ====== */
// Email: يمنع تتابع نقط ".."، ويتأكد من TLD بطول 2+.
const EMAIL_REGEX = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Password: 8+، حرف كبير وصغير ورقم ورمز، بدون مسافات.
const STRONG_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,}$/;
// Name length bounds
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
    password: '',
    confirmPassword: ''
  });

  // لو المستخدم مسجّل (ومش guest) رجّعيه على صفحته المناسبة
  useEffect(() => {
    if (user && user.role !== 'guest') {
      const targetRoute = user.role === 'admin' ? '/dashboard' : '/';
      if (window.location.pathname !== targetRoute) {
        navigate(targetRoute, { replace: true });
      }
    }
  }, [user, navigate]);

  function validateForm() {
    const newErrors = {};

    // Email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (isLogin) {
        if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
      } else {
        if (!STRONG_PWD.test(formData.password)) {
          newErrors.password =
            'Password must be 8+ chars & include upper, lower, number, and symbol (no spaces)';
        }
      }
    }

    // شروط إضافية في وضع Sign Up فقط
    if (!isLogin) {
      // Name length validation
      var nameLen = formData.name ? formData.name.trim().length : 0;
      if (!nameLen) {
        newErrors.name = 'Name is required';
      } else if (nameLen < MIN_NAME_LEN) {
        newErrors.name = 'Name must be at least ' + MIN_NAME_LEN + ' characters';
      } else if (nameLen > MAX_NAME_LEN) {
        newErrors.name = 'Name must be at most ' + MAX_NAME_LEN + ' characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  }

  async function handleSubmit(e) {
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
        const result = await login(formData.email, formData.password);

        const ok = result && result.success ? true : false;
        if (!ok) {
          const code = result && result.code ? String(result.code).toUpperCase() : '';
          const msg = result && result.message ? String(result.message).toLowerCase() : '';

          // ✅ بدلاً من if طويلة معرضة لفقدان ||
          const isEmailNotExist =
            (code === 'EMAIL_NOT_FOUND') ||
            (msg.indexOf('email not exist') !== -1) ||
            (msg.indexOf('email is not exist') !== -1);

          const isPwdIncorrect =
            (code === 'INVALID_PASSWORD') ||
            (msg.indexOf('password is incorrect') !== -1);
            if (isEmailNotExist) {
            setErrors(function (prev) { return Object.assign({}, prev, { email: 'email is not exist' }); });
          } else if (isPwdIncorrect) {
            setErrors(function (prev) { return Object.assign({}, prev, { password: 'password is incorrect' }); });
          } else {
            setFormError(result && result.message ? result.message : 'An error occurred during login');
          }
          return;
        }

        const role = result && result.role ? result.role : 'patient';
        const redirectPath = role === 'admin' ? '/dashboard' : '/';
        navigate(redirectPath, { replace: true });
      } else {
        const reg = await register(formData.name, formData.email, formData.password);
        const ok = reg && reg.success ? true : false;

        if (!ok) {
          const msg = reg && reg.message ? reg.message : 'Registration failed. Please try again.';
          setFormError(msg);
        } else {
          setFormError('Registration successful! Please sign in.');
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setErrors({});
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setFormError('An unexpected error occurred. Please try again.');
    }
  }

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(function (prev) { return Object.assign({}, prev, { [name]: value }); });
    if (errors[name]) {
      setErrors(function (prev) {
        const next = Object.assign({}, prev);
        next[name] = '';
        return next;
      });
    }
  }

  function onToggleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  function onToggleShowConfirm(e) {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  }

  async function handleGuestLogin(e) {
    e.preventDefault();
    try {
      const result = await loginAsGuest();
      if (result && result.success) navigate('/', { replace: true });
    } catch (_) {}
  }

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
            {isLogin ? 'Sign in to access your account' : 'Create a new account to get started'}
          </p>
        </div>

        {/* Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{isLogin ? 'Sign In' : 'Create Account'}</h2>

          {formError ? <div className={styles.errorMessage} role="alert">{formError}</div> : null}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {!isLogin ? (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="position-relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={'form-control ' + (errors.name ? 'is-invalid' : '')}
                    placeholder="Enter your full name"
                  />
                  {errors.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
                </div>
              </div>
            ) : null}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="position-relative">
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
                {errors.email ? <div className="invalid-feedback d-block">{errors.email}</div> : null}
              </div>
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
                {!errors.password ? (
                  <button
                    type="button"
                    onClick={onToggleShowPassword}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                ) : null}
                {errors.password ? <div className="invalid-feedback d-block">{errors.password}</div> : null}
              </div>
            </div>

            {!isLogin ? (
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
                  {!errors.confirmPassword ? (
                    <button
                      type="button"
                      onClick={onToggleShowConfirm}
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  ) : null}
                  {errors.confirmPassword ? <div className="invalid-feedback d-block">{errors.confirmPassword}</div> : null}
                </div>
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary w-100 py-2 mb-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? <LogIn size={18} className="me-2" /> : <UserPlus size={18} className="me-2" />}
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </>
              )}
            </button>
            {isLogin ? (
              <button
                type="button"
                className="btn btn-outline-secondary w-100 mb-3"
                onClick={handleGuestLogin}
                disabled={isLoading}
              >
                Continue as Guest
              </button>
            ) : null}

            <div className="text-center mt-3">
              <span className="text-muted">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={function () {
                  setIsLogin(!isLogin);
                  setErrors({});
                  if (isLogin) {
                    setFormData(function (prev) {
                      return Object.assign({}, prev, { password: '', confirmPassword: '' });
                    });
                  } else {
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                  }
                  setFormError('');
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