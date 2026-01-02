import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import '../../styles/signup.css';

export default function Signup() {
    const [searchParams] = useSearchParams();
    const planParam = searchParams.get('plan');

    // Map plan IDs to display names
    const plans = {
        starter: 'Starter Plan',
        builder: 'Builder Plan',
        operator: 'Operator Plan'
    };



    const [formData, setFormData] = useState({
        email: '',
        password: '',
        orgName: ''
    });

    const [status, setStatus] = useState('idle'); // idle, creating, success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('creating');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            console.log('Account created:', { ...formData, plan: planParam });
        }, 1500);
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="signup-page">
                    <div className="signup-container">

                        <div className="signup-header">
                            <h1 className="h1">Initialize Identity.</h1>
                            <p className="lead">
                                Create your Northfield Solidarity operator ID.
                            </p>
                            {planParam && plans[planParam] && (
                                <div className="plan-notice">
                                    Selected: {plans[planParam]}
                                </div>
                            )}
                        </div>

                        <div className="signup-form-wrapper">
                            {status === 'success' ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3 className="h3">Identity Established.</h3>
                                    <p>Your workspace is being provisioned. Please check your email for the activation link.</p>
                                    <Link to="/" className="btn">Return to System</Link>
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
                                        <label htmlFor="orgName">Organization Name</label>
                                        <input
                                            type="text"
                                            id="orgName"
                                            name="orgName"
                                            required
                                            value={formData.orgName}
                                            onChange={handleChange}
                                            placeholder="Entity Name"
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
                                            className={`btn ${status === 'creating' ? 'loading' : ''}`}
                                            disabled={status === 'creating'}
                                        >
                                            {status === 'creating' ? 'Provisioning...' : 'Create Operator ID'}
                                        </button>
                                    </div>

                                    <div className="terms-text">
                                        By provisioning an ID, you agree to the <a href="#">Master Services Agreement</a> and <a href="#">Governance Charter</a>.
                                    </div>
                                    <div className="text-center mt-6 text-sm text-white/50">
                                        Already have an Operator ID? <Link to="/login" className="text-brand hover:underline">Log In</Link>
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
