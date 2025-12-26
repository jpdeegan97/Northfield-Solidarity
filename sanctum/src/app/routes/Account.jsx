import React from 'react';
import { useAuth, USER_ROLES } from '../../context/AuthContext.jsx';
import Layout from '../../components/Layout.jsx';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const { user, role, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div data-theme="water">
                <Layout>
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                        <h1 className="h1">Authentication Required</h1>
                        <p className="lead">Please log in to view your account dossier.</p>
                        <button className="btn" onClick={() => navigate('/login')} style={{ marginTop: '2rem' }}>
                            Proceed to Login
                        </button>
                    </div>
                </Layout>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Helper to format role name nicely
    const formatRole = (r) => {
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
        <div data-theme="water">
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

                        {/* Actions */}
                        <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: '1px solid var(--c-border)' }}>
                            <button className="btn ghost" onClick={handleLogout} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                                Terminate Session
                            </button>
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    );
}
