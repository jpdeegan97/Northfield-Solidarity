import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import Layout from '../../components/Layout.jsx';

export default function Checkout() {
    const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // If empty, suggest browsing
    if (cart.items.length === 0 && !isComplete) {
        return (
            <div data-theme="water">
                <Layout>
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                        <h1 className="h1">Your cart is empty.</h1>
                        <p className="lead" style={{ marginBottom: '2rem' }}>
                            Configure your subscriptions to proceed with checkout.
                        </p>
                        <Link to="/pricing" className="btn">View Plans</Link>
                    </div>
                </Layout>
            </div>
        );
    }

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
            clearCart();
        }, 2000);
    };

    return (
        <div data-theme="water">
            <Layout>
                <div className="checkout-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>

                    {isComplete ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                            <h1 className="h1">Payment Successful.</h1>
                            <p className="lead">You are now ready to operate.</p>
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Link to="/account" className="btn">Go to Dashboard</Link>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }}>

                            {/* LEFT COLUMN: Payment Details */}
                            <div className="checkout-form">
                                <h1 className="h2" style={{ marginBottom: '2rem' }}>Secure Checkout</h1>

                                <form onSubmit={handlePayment} style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div className="section-label" style={{ fontWeight: 600, borderBottom: '1px solid var(--c-border)', paddingBottom: '0.5rem' }}>Billing Contact</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input type="text" placeholder="First Name" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                                        <input type="text" placeholder="Last Name" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                                    </div>
                                    <input type="email" placeholder="Email Address" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />

                                    <div className="section-label" style={{ fontWeight: 600, borderBottom: '1px solid var(--c-border)', paddingBottom: '0.5rem', marginTop: '1rem' }}>Payment Method</div>
                                    <input type="text" placeholder="Card Number" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <input type="text" placeholder="MM / YY" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                                        <input type="text" placeholder="CVC" required className="input-field" style={{ padding: '0.8rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '4px' }} />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn full-width ${isProcessing ? 'loading' : ''}`}
                                        disabled={isProcessing}
                                        style={{ marginTop: '1rem' }}
                                    >
                                        {isProcessing ? 'Processing...' : `Pay $${getCartTotal()}`}
                                    </button>
                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>
                                        Secured by Northfield Payments.
                                    </p>
                                </form>
                            </div>

                            {/* RIGHT COLUMN: Order Summary */}
                            <div className="order-summary" style={{ background: 'var(--c-surface)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--c-border)', height: 'fit-content' }}>
                                <h3 className="h3" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Order Summary</h3>
                                <div className="cart-items" style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                                    {cart.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--c-text-sub)' }}>
                                                    Billed {item.billingCycle}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div>${item.price}</div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total-row" style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem' }}>
                                    <span>Total</span>
                                    <span>${getCartTotal()}</span>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
}
