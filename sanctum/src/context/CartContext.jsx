import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const INITIAL_CART = {
    items: [], // { id, name, price, type, period, billingCycle }
    total: 0,
    billingCycle: 'monthly' // 'monthly' or 'annual'
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('ns_cart');
        return stored ? JSON.parse(stored) : INITIAL_CART;
    });

    useEffect(() => {
        localStorage.setItem('ns_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart(prev => {
            // If adding a plan, remove existing plan (can only have one main plan)
            let newItems = [...prev.items];
            if (item.type === 'plan') {
                newItems = newItems.filter(i => i.type !== 'plan');
            }
            // Check if item already exists
            const exists = newItems.find(i => i.id === item.id);
            if (!exists) {
                newItems.push(item);
            }

            return {
                ...prev,
                items: newItems,
                billingCycle: item.billingCycle || prev.billingCycle
            };
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== itemId)
        }));
    };

    const clearCart = () => {
        setCart(INITIAL_CART);
    };

    const getCartTotal = () => {
        return cart.items.reduce((total, item) => total + item.price, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
