import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Layout from '../../components/Layout.jsx';
import '../../styles/signup.css'; // Reusing signup styles for consistency

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('idle'); // idle, auth, success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('auth');

        // Simulate API call
        setTimeout(() => {
            login(formData.email);
            setStatus('success');
            // Auto redirect after short delay
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }, 1500);
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="signup-page">
                    <div className="signup-container">

                        <div className="signup-header">
                            <h1 className="h1">Access System.</h1>
                            <p className="lead">
                                Authenticate with your Northfield Solidarity operator ID.
                            </p>
                        </div>

                        <div className="signup-form-wrapper">
                            {status === 'success' ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3 className="h3">Authenticated.</h3>
                                    <p>Redirecting to dashboard...</p>
                                    <Link to="/" className="btn">Enter System</Link>
                                </div>
                            ) : (
                                <form className="signup-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Work Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@company.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className={`btn ${status === 'auth' ? 'loading' : ''}`}
                                            disabled={status === 'auth'}
                                        >
                                            {status === 'auth' ? 'Verifying...' : 'Authenticate'}
                                        </button>
                                    </div>

                                    <div className="terms-text" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                                        No ID? <Link to="/signup" style={{ color: 'var(--c-brand)', fontWeight: 'bold' }}>Initialize Identity</Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
