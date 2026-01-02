import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOCK_USERS } from './roles';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
    const location = useLocation();
    const [activeUsers, setActiveUsers] = useState(() => {
        // Initialize mock active users
        const locs = ['/dashboard', '/marketplace', '/journal', '/dreams', '/visualizer', '/docs', '/investors', '/pricing'];
        const getRandomLoc = () => locs[Math.floor(Math.random() * locs.length)];

        return MOCK_USERS.map(u => ({
            ...u,
            status: Math.random() > 0.5 ? 'ONLINE' : 'OFFLINE',
            currentLocation: Math.random() > 0.5 ? getRandomLoc() : 'Disconnected',
            lastActive: new Date().toISOString()
        }));
    });

    const [securityLog, setSecurityLog] = useState([]);
    const [alert, setAlert] = useState(null);

    const getRandomLocation = () => {
        const locs = ['/dashboard', '/marketplace', '/journal', '/dreams', '/visualizer', '/docs', '/investors', '/pricing'];
        return locs[Math.floor(Math.random() * locs.length)];
    };

    const addLog = (log) => {
        setSecurityLog(prev => [log, ...prev].slice(0, 50));
        // Trigger generic alert for visual effect
        setAlert(log);
        setTimeout(() => setAlert(null), 3000);
    };

    // Update locations occasionally
    useEffect(() => {
        setActiveUsers(prev => prev.map(u => {
            if (u.status === 'ONLINE' && Math.random() > 0.8) {
                return { ...u, currentLocation: getRandomLocation() };
            }
            return u;
        }));

        // Log the access
        const logEntry = {
            id: Date.now(),
            type: 'TRAFFIC',
            message: `Traffic detected on ${location.pathname}`,
            timestamp: new Date().toLocaleTimeString(),
            status: 'Neutral'
        };
        addLog(logEntry);
    }, [location.pathname]);

    const value = {
        activeUsers,
        securityLog,
        alert
    };

    return (
        <SecurityContext.Provider value={value}>
            {children}
        </SecurityContext.Provider>
    );
};

export const useSecurity = () => useContext(SecurityContext);
