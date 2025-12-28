import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOCK_USERS } from './roles';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
    const location = useLocation();
    const [activeUsers, setActiveUsers] = useState([]);
    const [securityLog, setSecurityLog] = useState([]);
    const [alert, setAlert] = useState(null);

    const getRandomLocation = () => {
        const locs = ['/dashboard', '/marketplace', '/journal', '/dreams', '/visualizer', '/docs'];
        return locs[Math.floor(Math.random() * locs.length)];
    };

    const addLog = (log) => {
        setSecurityLog(prev => [log, ...prev].slice(0, 50));
        // Trigger generic alert for visual effect
        setAlert(log);
        setTimeout(() => setAlert(null), 3000);
    };

    // Initialize mock active users
    useEffect(() => {
        // Randomly select some users to be "Online"
        const online = MOCK_USERS.map(u => ({
            ...u,
            status: Math.random() > 0.5 ? 'ONLINE' : 'OFFLINE',
            currentLocation: Math.random() > 0.5 ? getRandomLocation() : 'Disconnected',
            lastActive: new Date().toISOString()
        }));

        // Ensure John Deegan is always online for demo
        const me = online.find(u => u.email.includes('john.deegan'));
        if (me) {
            me.status = 'ONLINE';
            me.currentLocation = location.pathname;
        }

        setActiveUsers(online);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update "Me" location when route changes
    useEffect(() => {
        setActiveUsers(prev => prev.map(u => {
            if (u.email.includes('john.deegan')) {
                return { ...u, currentLocation: location.pathname };
            }
            // Randomly move other users occasionally
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
