import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES, getMockUser, MOCK_USERS } from './roles';

export { USER_ROLES }; // Re-export for consumers

const AuthContext = createContext();

const INITIAL_STATE = {
    user: null, // { id, name, email, role }
    isAuthenticated: false,
    role: USER_ROLES.GUEST
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        const stored = localStorage.getItem('ns_auth');
        return stored ? JSON.parse(stored) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem('ns_auth', JSON.stringify(authState));
    }, [authState]);

    const login = (email) => {
        // Find in mock data
        let user = getMockUser(email);

        // If not found in mock data, default to GUEST or generic LOGIN (fallback)
        if (!user) {
            console.warn(`User ${email} not found in mock DB. Creating session as Guest.`);
            user = {
                id: 'guest_' + Math.random().toString(36).substr(2, 5),
                name: 'Guest User',
                email,
                role: USER_ROLES.GUEST
            };
        }

        setAuthState({
            user,
            isAuthenticated: true,
            role: user.role
        });

        return user;
    };

    const logout = () => {
        setAuthState(INITIAL_STATE);
        localStorage.removeItem('ns_auth');
    };

    const hasPermission = (requiredRole) => {
        const currentRole = authState.role;

        if (currentRole === USER_ROLES.ADMIN) return true;
        if (requiredRole === USER_ROLES.GUEST) return true;

        // Hierarchy: Admin > Operator > Builder > Starter > Special Guest > Guest
        // Note: Special Guest is tricky, let's say they see Specific things only.
        // For general hierarchy:

        const levels = {
            [USER_ROLES.ADMIN]: 100,
            [USER_ROLES.SPECIAL_GUEST]: 90,
            [USER_ROLES.OPERATOR]: 80,
            [USER_ROLES.INVESTOR]: 75,
            [USER_ROLES.BUILDER]: 60,
            [USER_ROLES.STARTER]: 40,
            [USER_ROLES.GUEST]: 0
        };

        const currentLevel = levels[currentRole] || 0;
        const requiredLevel = levels[requiredRole] || 0;

        return currentLevel >= requiredLevel;
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
