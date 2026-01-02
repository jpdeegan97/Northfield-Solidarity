import React, { useState } from 'react';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx';
import Layout from '../../components/Layout.jsx';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const { user, role, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState({
        latency: 'Real-time (WebSocket)',
        theme: 'System Sync',
        notifications: 'Important Only'
    });
    const [isSaving, setIsSaving] = useState(false);

    if (!isAuthenticated) {
        return (
            <Layout>
                <div style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1 className="h1">Authentication Required</h1>
                    <p className="lead">Please log in to view your account dossier.</p>
                    <button className="btn" onClick={() => navigate('/login')} style={{ marginTop: '2rem' }}>
                        Proceed to Login
                    </button>
                </div>
            </Layout>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSavePreferences = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Preferences saved successfully to local operational config.');
        }, 800);
    };

    // Helper to format role name nicely
    const formatRole = (r) => {
        if (!r) return 'Unknown';
        return r.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    // Determine badge color based on role
    const getBadgeColor = (r) => {
        switch (r) {
            case USER_ROLES.ADMIN: return '#ef4444'; // Red for Admin
            case USER_ROLES.SPECIAL_GUEST: return '#f59e0b'; // Amber
            case USER_ROLES.OPERATOR: return '#10b981'; // Green
            case USER_ROLES.INVESTOR: return '#8b5cf6'; // Purple
            case USER_ROLES.BUILDER: return '#3b82f6'; // Blue
            default: return 'var(--c-text-sub)';
        }
    };

    return (
        <Layout>
            <div className="account-page" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>

                {/* Header Section */}
                <div className="account-header" style={{ marginBottom: '4rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 className="h1">Operator Dossier</h1>
                            <p className="lead" style={{ marginBottom: 0 }}>Identity & Access Management</p>
                        </div>
                        <div className="role-badge" style={{
                            background: getBadgeColor(role),
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                        }}>
                            {formatRole(role)}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="account-grid" style={{ display: 'grid', gap: '2rem' }}>

                    {/* Identity Card */}
                    <section className="card" style={{ padding: '2rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                        <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Identity Profile</h3>
                        <div className="field-group" style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--c-text-sub)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Operator Name</label>
                                <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>{user?.name || 'Unknown'}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--c-text-sub)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>System ID</label>
                                <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{user?.id}</div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--c-text-sub)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email Handle</label>
                                <div style={{ fontSize: '1.1rem' }}>{user?.email}</div>
                            </div>
                        </div>
                    </section>

                    {/* Permissions Card */}
                    <section className="card" style={{ padding: '2rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                        <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Clearance Level</h3>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--c-text-sub)' }}>
                            Your current session grants you access to the following system domains:
                        </p>
                        <ul className="permission-list" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: '#10b981' }}>✓</span> Public Documentation
                            </li>
                            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: role !== USER_ROLES.GUEST ? '#10b981' : 'var(--c-text-sub)' }}>
                                    {role !== USER_ROLES.GUEST ? '✓' : '✗'}
                                </span>
                                Community Access
                            </li>
                            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: [USER_ROLES.ADMIN, USER_ROLES.SPECIAL_GUEST, USER_ROLES.INVESTOR].includes(role) ? '#10b981' : 'var(--c-text-sub)' }}>
                                    {[USER_ROLES.ADMIN, USER_ROLES.SPECIAL_GUEST, USER_ROLES.INVESTOR].includes(role) ? '✓' : '✗'}
                                </span>
                                WSP Deal Flow
                            </li>
                            <li style={{ padding: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: role === USER_ROLES.ADMIN ? '#10b981' : 'var(--c-text-sub)' }}>
                                    {role === USER_ROLES.ADMIN ? '✓' : '✗'}
                                </span>
                                System Administration
                            </li>
                        </ul>
                    </section>

                    {/* Preferences Card */}
                    <section className="card" style={{ padding: '2rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="h3" style={{ fontSize: '1.2rem', margin: 0 }}>System Preferences</h3>
                            {isSaving && <span style={{ fontSize: '0.8rem', color: '#10b981' }}>Saving...</span>}
                        </div>
                        <div className="field-group" style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <label style={{ fontSize: '0.9rem' }}>Data Stream Latency</label>
                                <select
                                    value={preferences.latency}
                                    onChange={(e) => setPreferences({ ...preferences, latency: e.target.value })}
                                    style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.85rem' }}
                                >
                                    <option>Real-time (WebSocket)</option>
                                    <option>Buffered (5s)</option>
                                    <option>Snapshot (On Demand)</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <label style={{ fontSize: '0.9rem' }}>Interface Theme</label>
                                <select
                                    value={preferences.theme}
                                    onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                                    style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.85rem' }}
                                >
                                    <option>System Sync</option>
                                    <option>Water (Deep Blue)</option>
                                    <option>Green (South Lawn)</option>
                                    <option>Gold (Wall Street)</option>
                                </select>
                            </div>
                            <button
                                onClick={handleSavePreferences}
                                className="btn"
                                style={{ marginTop: '1rem', justifySelf: 'end' }}
                            >
                                Update Preferences
                            </button>
                        </div>
                    </section>

                    {/* Security Card */}
                    <section className="card" style={{ padding: '2rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '8px' }}>
                        <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Security Protocols</h3>
                        <div className="field-group" style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Multi-Factor Authentication</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)' }}>Hardware key required for Level 4+ access</span>
                                </div>
                                <button
                                    onClick={() => alert('MFA Enrollment is currently managed by IT Support.')}
                                    style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, background: 'none', border: '1px solid #ef4444', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}
                                >
                                    DISABLED (Configure)
                                </button>
                            </div>
                            <div style={{ width: '100%', height: '1px', background: 'var(--c-border)' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Session Encryption</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)' }}>AES-256-GCM enforced</span>
                                </div>
                                <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>ACTIVE</div>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: '1px solid var(--c-border)' }}>
                        <button className="btn ghost" onClick={handleLogout} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                            Terminate Session
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
