import React, { createContext, useContext, useState, useEffect } from 'react';

const OwnershipContext = createContext();

export const OwnershipProvider = ({ children }) => {
    const [ownedIds, setOwnedIds] = useState(() => {
        const stored = localStorage.getItem('sanctum_owned');
        // Default to empty, or maybe some starter items if desired
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('sanctum_owned', JSON.stringify(ownedIds));
    }, [ownedIds]);

    const addPurchasedAssets = (items) => {
        const newIds = items.map(i => i.id);
        setOwnedIds(prev => [...new Set([...prev, ...newIds])]);
    };

    const isOwned = (id) => ownedIds.includes(id);

    return (
        <OwnershipContext.Provider value={{ ownedIds, addPurchasedAssets, isOwned }}>
            {children}
        </OwnershipContext.Provider>
    );
};

export const useOwnership = () => useContext(OwnershipContext);
