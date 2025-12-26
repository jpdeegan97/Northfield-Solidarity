import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx';
import Layout from '../../components/Layout.jsx';
import '../../styles/contact.css';

export default function WSPContact() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: ''
    });
    const [status, setStatus] = useState('idle'); // idle, checking, failed, success

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('checking');

        // Dummy check logic
        setTimeout(() => {
            // Log them in as WSP Partner
            // login(formData.email, USER_ROLES.INVESTOR); // Assuming login takes role, or relies on mock now

            // NOTE: The new login(email) function determines role from email if it exists in mocks.
            // But we might want to force a role for the "contact" form flow if the email isn't in mocks?
            // For now, let's stick to the new login(email) signature which ignores the second arg.
            // Wait, looking at AuthContext.jsx step 323, login(email) DOES NOT take a role argument anymore.
            // It looks up the user.
            // So we need to ensure the user types a valid investor email, OR we update login to fallback?
            // Actually, in step 323 login() falls back to GUEST if not found.
            // If the user enters a random email, they become GUEST.
            // We should probably just call login(formData.email).

            login(formData.email);

            setStatus('success');

            setTimeout(() => {
                navigate('/wsp/investors');
            }, 1000);
        }, 1500);
    };

    // WSP Custom Nav (Copied from other WSP pages for consistency)
    const nav = [
        { label: "Northfield Solidarity", to: "/" },
        { label: "South Lawn", to: "/southlawn" },
        { label: "WSP", to: "/wsp" },
        { type: "divider" },
        { label: "Documentation", to: "/wsp/docs" },
        { label: "Pricing", to: "/wsp/pricing" },
        { label: "System", to: "/wsp/system" },
        { label: "Investor Relations", to: "/wsp/investors" },
    ];

    return (
        <div data-theme="gold">
            <Layout
                nav={nav}
                brand={{
                    title: "WSP",
                    tagline: "Architecture for the next epoch.",
                    footerLine: "WSP • Strategic Operations",
                    footerNote: "Limited Disclosure.",
                }}
            >
                <div className="contact-page">
                    <div className="contact-container" style={{ maxWidth: '600px' }}>
                        <div className="contact-header" style={{ marginBottom: '3rem' }}>
                            <div className="badge ir-badge" style={{ background: 'var(--c-brand)', color: '#fff', marginBottom: '1rem', display: 'inline-block' }}>Private Access</div>
                            <h1 className="h1">WSP Portal Access</h1>
                            <p className="lead" style={{ color: 'var(--c-text-sub)' }}>
                                Identity verification required. Please enter your authorized operator ID or partner email to proceed to the secure communications channel.
                            </p>
                        </div>

                        <div className="contact-form-wrapper">
                            {status === 'success' ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3 className="h3">Identity Verified.</h3>
                                    <p>Redirecting to secure channel...</p>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Operator ID / Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="ID-XXXX-XXXX or name@partner.com"
                                            style={{ fontSize: '1.2rem', padding: '1rem' }}
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className={`btn full-width ${status === 'checking' ? 'loading' : ''}`}
                                            disabled={status === 'checking'}
                                            style={{ minHeight: '60px', fontSize: '1.1rem' }}
                                        >
                                            {status === 'checking' ? 'Verifying Identity...' : 'Verify Access'}
                                        </button>
                                    </div>

                                    <div className="terms-text" style={{ textAlign: 'center', marginTop: '2rem' }}>
                                        Unauthorized access attempts are logged.
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
