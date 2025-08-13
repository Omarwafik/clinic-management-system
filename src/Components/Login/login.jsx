import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn, UserPlus, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

// لو Bootstrap مش متستورد جلوبال، استورده هنا عشان ستايل invalid-feedback يشتغل
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const { login, register, loginAsGuest, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // هنا هنخزن أخطاء الحقول (سواء Validation أو Auth) بنفس المفتاح
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(''); // رسالة عامة اختيارية

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // لو المستخدم مش ضيف، رجعيه لصفحة مناسبة
  useEffect(() => {
    if (user && user.role !== 'guest') {
      const targetRoute = user.role === 'admin' ? '/dashboard' : '/';
      if (window.location.pathname !== targetRoute) {
        navigate(targetRoute, { replace: true });
      }
    }
  }, [user, navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // امسح بس الأخطاء القديمة، من غير ما أمسح قيم الحقول
    setFormError('');
    setErrors({});

    // Validation العادي الأول
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        // console.log('login result:', result);

        if (!result?.success) {
          const code = result?.code?.toUpperCase?.() || '';
          const msg = (result?.message || '').toLowerCase();

          // ↓↓↓ نفس مكان الـ validation: تحت الـ input
          if (
            code === 'EMAIL_NOT_FOUND' ||
            msg.includes('email not exist') ||
            msg.includes('email is not exist')
          ) {
            setErrors(prev => ({ ...prev, email: 'email is not exist' }));
          } else if (
            code === 'INVALID_PASSWORD' ||
            msg.includes('password is incorrect')
          ) {
            setErrors(prev => ({ ...prev, password: 'password is incorrect' }));
          } else {
            setFormError(result?.message || 'An error occurred during login');
          }
          return; // لا تنقّل
        }

        // نجاح — نوجّه حسب الدور
        const redirectPath = result.role === 'admin' ? '/dashboard' : '/';
        navigate(redirectPath, { replace: true });
      } else {
        const { success, message } = await register(
          formData.name,
          formData.email,
          formData.password
        );
        if (!success) {
          setFormError(message || 'Registration failed. Please try again.');
        } else {
          setFormError('Registration successful! Please sign in.');
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setErrors({});
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // حدّث القيمة
    setFormData(prev => ({ ...prev, [name]: value }));

    // امسح خطأ الحقل دا فقط عشان يظهر/يختفي بنفس سلوك الـ validation
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginAsGuest();
      if (result?.success) navigate('/', { replace: true });
      else setFormError('Failed to log in as guest. Please try again.');
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
            {isLogin ? 'Sign in to access your account' : 'Create a new account to get started'}
          </p>
        </div>

        {/* Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>{isLogin ? 'Sign In' : 'Create Account'}</h2>

          {/* رسالة عامة اختيارية */}
          {formError && <div className={styles.errorMessage} role="alert">{formError}</div>}

          {/* noValidate علشان مانستعملش رسائل المتصفح */}
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                  {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
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
                  autoComplete="username"
                />
                {/* نفس المكان بتاع الـ validation */}
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
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
                  autoComplete="current-password"
                />
                {!errors.password && (
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
                {/* نفس المكان بتاع الـ validation */}
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid pe-5' : ''}`}
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
                      onClick={(e) => { e.preventDefault(); setShowConfirmPassword(!showConfirmPassword); }}
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none shadow-none"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                  {errors.confirmPassword && (
                    <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mb-3 border-0"
              disabled={isLoading}
              style={{ outline: 'none', boxShadow: 'none' }}
            >
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

            {isLogin && (
              <button
                type="button"
                className="btn w-100 mb-3"
                onClick={handleGuestLogin}
                disabled={isLoading}
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  backgroundColor: '#e9ecef',
                  color: '#212529',
                  border: '1px solid #ced4da',
                  transition: 'background-color 0.2s ease-in-out',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ced4da'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
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
                  if (isLogin) {
                    setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
                  } else {
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                  }
                  setFormError('');
                }}
                className="btn btn-link p-0 text-decoration-underline border-0 shadow-none"
                style={{ outline: 'none', boxShadow: 'none' }}
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