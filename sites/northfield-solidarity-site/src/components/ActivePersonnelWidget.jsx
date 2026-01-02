import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { useAuth } from '../context/AuthContext';

export default function ActivePersonnelWidget() {
    const { user } = useAuth();
    const { activeUsers } = useSecurity();

    // Permissions Check
    const allowedEmails = ['admin@northfieldsolidarity.ai', 'john.deegan@northfieldsolidarity.ai'];
    const isAllowed = user && allowedEmails.includes(user.email);

    const [isCollapsed, setIsCollapsed] = React.useState(true);

    if (!isAllowed) return null;

    return (
        <div className="fixed bottom-4 right-24 w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg z-40 shadow-2xl overflow-hidden transition-all duration-300">
            <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-[10px] font-bold text-[#00ff9d] uppercase tracking-widest">Active Personnel</h3>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-white/40">{activeUsers.filter(u => u.status === 'ONLINE').length}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse shadow-[0_0_8px_#00ff9d]" />
                    </div>
                    {/* Toggle Icon */}
                    <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`text-white/30 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                    >
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </div>
            </div>

            {!isCollapsed && (
                <div className="px-3 pb-3 space-y-3 max-h-48 overflow-y-auto custom-scrollbar border-t border-white/5 pt-2">
                    {activeUsers.filter(u => u.status === 'ONLINE').map(u => (
                        <div key={u.id} className="group">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-bold text-white group-hover:text-[#00ff9d] transition-colors truncate max-w-[120px]">
                                    {u.name}
                                </span>
                                <span className="text-[8px] font-bold text-white/20 bg-white/5 px-1 rounded uppercase tracking-wider">
                                    {u.role}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="truncate">{u.currentLocation}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
