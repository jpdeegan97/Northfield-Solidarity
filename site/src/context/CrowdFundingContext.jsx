import React, { createContext, useContext, useState, useEffect } from 'react';
import { NS_PROJECTS } from '../data/projectRegistry';

const CrowdFundingContext = createContext();

export const useCrowdFunding = () => useContext(CrowdFundingContext);

export const CrowdFundingProvider = ({ children }) => {
    // Initialize projects with local state to allow updates
    const [projects, setProjects] = useState(NS_PROJECTS);

    // Track all pledges: { id, projectCode, userEmail, amount, timestamp }
    const [pledges, setPledges] = useState([]);

    // Leaderboard derivation (memoized)
    const leaderboard = React.useMemo(() => {
        const stats = {}; // userEmail -> totalAmount

        pledges.forEach(p => {
            if (!stats[p.userEmail]) stats[p.userEmail] = 0;
            stats[p.userEmail] += p.amount;
        });

        return Object.entries(stats)
            .map(([email, total]) => ({ email, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10); // Top 10
    }, [pledges]);

    // Function to handle a new pledge
    const makePledge = (projectCode, amount, user) => {
        if (!user) return { success: false, error: 'User must be logged in' };

        const newPledge = {
            id: Date.now(),
            projectCode,
            userEmail: user.email,
            userName: user.name || user.email.split('@')[0],
            amount: parseFloat(amount),
            timestamp: new Date()
        };

        setPledges(prev => [newPledge, ...prev]);

        // Update project stats locally
        setProjects(prevProjects => prevProjects.map(p => {
            if (p.code === projectCode) {
                return {
                    ...p,
                    raised: (p.raised || 0) + parseFloat(amount),
                    backers: (p.backers || 0) + 1
                };
            }
            return p;
        }));

        return { success: true };
    };

    return (
        <CrowdFundingContext.Provider value={{
            projects,
            pledges,
            leaderboard,
            makePledge
        }}>
            {children}
        </CrowdFundingContext.Provider>
    );
};
