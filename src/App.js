import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from "./Components/Dashboard/Dashboard";
import TableUsers from "./Components/Dashboard/TableUsers";
import TableDoctors from "./Components/Dashboard/TableDoctors";
import Charts from "./Components/Dashboard/Charts";
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
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

// Note: Removed localStorage clearing to maintain user session on refresh
function AppContent() {
  const { user, isLoading } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  // Handle initial load
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  // Show loading state
  if (isLoading || initialLoad) {
    return <div className="app-loading">Loading...</div>;
  }

  // Determine where to redirect after login based on user role
  const getAfterLoginPath = () => {
    if (!user) return '/';
    return user.role === 'admin' ? '/dashboard' : '/';
  };

  return (
    <Routes>
      {/* Login route - always show login, redirect after successful login */}
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
      
      {/* Home route - only accessible to logged-in non-admin users */}
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
      
      {/* Protected admin routes */}
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
      
      {/* Add more routes here as needed */}
      
      {/* Catch all other routes - redirect based on auth status */}
      <Route 
        path="*" 
        element={
          user ? (
            <Navigate to={
              user.role === 'admin' ? '/dashboard' : '/'
            } replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  );
}

// Global styles for the app
const globalStyles = `
  :root {
    --primary-color: #3182ce;
    --primary-hover: #2c5282;
    --text-color: #2d3748;
    --text-secondary: #4a5568;
    --border-color: #e2e8f0;
    --bg-color: #f8fafc;
    --error-color: #e53e3e;
    --success-color: #38a169;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text-color);
    background-color: #f8fafc;
    line-height: 1.5;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding-top: 80px; /* Space for fixed navbar */
    padding-bottom: 2rem;
  }
  
  .auth-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f4f8;
    padding: 1rem;
  }
  
  .app-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
  
  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid transparent;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }
  
  .btn-primary:hover {
    background-color: var(--primary-hover);
  }
  
  .btn-outline {
    background-color: transparent;
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .btn-outline:hover {
    background-color: rgba(49, 130, 206, 0.1);
  }
  
  /* Form styles */
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }
  
  .form-control {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .form-control:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
  
  .error-message {
    color: var(--error-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .success-message {
    color: var(--success-color);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

// Add global styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
