
import React, { createContext, useContext, useState } from 'react';

type AppMode = 'Northfield' | 'Inner Sanctum';

interface AppContextType {
    mode: AppMode;
    toggleMode: () => void;
}

const AppModelContext = createContext<AppContextType>({
    mode: 'Northfield',
    toggleMode: () => { },
});

export function AppModelProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<AppMode>('Northfield');

    const toggleMode = () => {
        setMode((prev) => (prev === 'Northfield' ? 'Inner Sanctum' : 'Northfield'));
    };

    return (
        <AppModelContext.Provider value={{ mode, toggleMode }}>
            {children}
        </AppModelContext.Provider>
    );
}

export function useAppModel() {
    return useContext(AppModelContext);
}
