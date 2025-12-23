import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout.jsx';
import '../../styles/contact.css';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const initialTopic = searchParams.get('topic') || 'general';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        org: '',
        topic: initialTopic,
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, transmitting, transmitted

    useEffect(() => {
        const topicParam = searchParams.get('topic');
        if (topicParam) {
            setFormData(prev => ({ ...prev, topic: topicParam }));
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('transmitting');
        // Simulate network request
        setTimeout(() => {
            setStatus('transmitted');
            console.log('Form payload:', formData);
        }, 1500);
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="contact-page">
                    <div className="contact-container">

                        <div className="contact-header">
                            <h1 className="h1">Open a channel.</h1>
                            <p className="lead">
                                Direct line to Northfield Solidarity operators. <br />
                                Use this for enterprise inquiries, system integration, or governance support.
                            </p>

                            <div className="contact-meta">
                                <div className="meta-item">
                                    <span className="meta-label">Response Time</span>
                                    <span className="meta-value">Asynchronous (12-24h)</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Encryption</span>
                                    <span className="meta-value">Standard TLS 1.3</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            {status === 'transmitted' ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3 className="h3">Signal Received.</h3>
                                    <p>Your transmission has been logged in our intake queue. We will respond shortly.</p>
                                    <button
                                        className="btn ghost small"
                                        onClick={() => setStatus('idle')}
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Operator Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. J. Doe"
                                            />
                                        </div>
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
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="org">Organization / Entity</label>
                                        <input
                                            type="text"
                                            id="org"
                                            name="org"
                                            value={formData.org}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="topic">Signal Type</label>
                                        <div className="select-wrapper">
                                            <select
                                                id="topic"
                                                name="topic"
                                                value={formData.topic}
                                                onChange={handleChange}
                                            >
                                                <option value="general">General Inquiry</option>
                                                <option value="enterprise">Enterprise / Dedicated VPC</option>
                                                <option value="integration">Integration Support</option>
                                                <option value="audit">Governance Audit</option>
                                                <option value="clarification">Documentation Clarification</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Transmission</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Describe your requirements or request..."
                                        ></textarea>
                                    </div>

                                    <div className="form-actions">
                                        <button
                                            type="submit"
                                            className={`btn ${status === 'transmitting' ? 'loading' : ''}`}
                                            disabled={status === 'transmitting'}
                                        >
                                            {status === 'transmitting' ? 'Transmitting...' : 'Transmit Signal'}
                                        </button>
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
