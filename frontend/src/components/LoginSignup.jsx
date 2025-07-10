import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your authentication logic here
    if (isLogin) {
      console.log('Logging in with:', formData.email, formData.password);
    } else {
      console.log('Signing up with:', formData.email, formData.password);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    wrapper: {
      width: '100%',
      maxWidth: '28rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    logo: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '4rem',
      height: '4rem',
      backgroundColor: '#1e40af',
      borderRadius: '50%',
      marginBottom: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    logoText: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      border: '1px solid #e5e7eb'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    inputContainer: {
      position: 'relative'
    },
    input: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    inputWithButton: {
      paddingRight: '3rem'
    },
    icon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      width: '1.25rem',
      height: '1.25rem'
    },
    toggleButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      transition: 'color 0.2s ease-in-out'
    },
    toggleButtonHover: {
      color: '#6b7280'
    },
    forgotPassword: {
      textAlign: 'right'
    },
    forgotLink: {
      fontSize: '0.875rem',
      color: '#2563eb',
      textDecoration: 'none',
      transition: 'color 0.2s ease-in-out'
    },
    submitButton: {
      width: '100%',
      backgroundColor: '#1e40af',
      color: 'white',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '0.5rem',
      fontWeight: '500',
      fontSize: '1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      outline: 'none'
    },
    submitButtonHover: {
      backgroundColor: '#1d4ed8',
      transform: 'scale(1.02)'
    },
    submitButtonActive: {
      transform: 'scale(0.98)'
    },
    toggleSection: {
      marginTop: '1.5rem',
      textAlign: 'center'
    },
    toggleText: {
      color: '#6b7280',
      margin: 0
    },
    toggleLink: {
      marginLeft: '0.5rem',
      color: '#2563eb',
      fontWeight: '500',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: 'inherit',
      transition: 'color 0.2s ease-in-out'
    },
    footer: {
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Logo and Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoText}>G</span>
          </div>
          <h1 style={styles.title}>GatewayIIT</h1>
          <p style={styles.subtitle}>
            {isLogin ? 'Welcome back! Please sign in.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Auth Card */}
        <div style={styles.card}>
          <div style={styles.formContainer}>
            {/* Name Field (only for signup) */}
            {!isLogin && (
              <div style={styles.fieldGroup}>
                <label htmlFor="name" style={styles.label}>
                  Full Name
                </label>
                <div style={styles.inputContainer}>
                  <User style={styles.icon} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter your full name"
                    required
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#f9fafb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div style={styles.fieldGroup}>
              <label htmlFor="email" style={styles.label}>
                Email ID
              </label>
              <div style={styles.inputContainer}>
                <Mail style={styles.icon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter your email"
                  required
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.fieldGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputContainer}>
                <Lock style={styles.icon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{...styles.input, ...styles.inputWithButton}}
                  placeholder="Enter your password"
                  required
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleButton}
                  onMouseEnter={(e) => e.target.style.color = styles.toggleButtonHover.color}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                </button>
              </div>
            </div>

            {/* Confirm Password Field (only for signup) */}
            {!isLogin && (
              <div style={styles.fieldGroup}>
                <label htmlFor="confirmPassword" style={styles.label}>
                  Confirm Password
                </label>
                <div style={styles.inputContainer}>
                  <Lock style={styles.icon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Confirm your password"
                    required
                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#f9fafb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Forgot Password Link (only for login) */}
            {isLogin && (
              <div style={styles.forgotPassword}>
                <a 
                  href="#" 
                  style={styles.forgotLink}
                  onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              style={styles.submitButton}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#1e40af';
                e.target.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          {/* Toggle Mode */}
          <div style={styles.toggleSection}>
            <p style={styles.toggleText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                style={styles.toggleLink}
                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;