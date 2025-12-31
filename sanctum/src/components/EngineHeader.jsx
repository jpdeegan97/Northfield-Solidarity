import React from 'react';

export default function EngineHeader({
    icon: Icon,
    title,
    subtitle,
    color = 'purple', // 'purple', 'orange', 'amber', 'emerald', 'blue'
    actions
}) {
    // Map simplified color names to Tailwind color classes
    const colors = {
        purple: {
            border: 'border-purple-900/30',
            iconBg: 'from-purple-500 to-indigo-600',
            iconShadow: 'shadow-purple-500/20',
            title: 'text-purple-100/90',
            subtitle: 'text-purple-400/60'
        },
        orange: {
            border: 'border-orange-900/30',
            iconBg: 'from-orange-500 to-red-600',
            iconShadow: 'shadow-orange-500/20',
            title: 'text-orange-100/90',
            subtitle: 'text-orange-400/60'
        },
        amber: {
            border: 'border-amber-900/30',
            iconBg: 'from-amber-500 to-orange-600',
            iconShadow: 'shadow-amber-500/20',
            title: 'text-amber-100/90',
            subtitle: 'text-amber-400/60'
        },
        emerald: {
            border: 'border-emerald-900/30',
            iconBg: 'from-emerald-500 to-teal-600',
            iconShadow: 'shadow-emerald-500/20',
            title: 'text-emerald-100/90',
            subtitle: 'text-emerald-400/60'
        },
        blue: {
            border: 'border-blue-900/30',
            iconBg: 'from-blue-500 to-cyan-600',
            iconShadow: 'shadow-blue-500/20',
            title: 'text-blue-100/90',
            subtitle: 'text-blue-400/60'
        }
    };

    const theme = colors[color] || colors.purple;

    return (
        <div className={`h-14 border-b ${theme.border} bg-black/20 flex items-center justify-between px-6 flex-shrink-0`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded bg-gradient-to-br ${theme.iconBg} flex items-center justify-center shadow-lg ${theme.iconShadow}`}>
                    {Icon && <Icon size={16} className="text-white" />}
                </div>
                <div>
                    <h1 className={`text-sm font-bold tracking-widest uppercase ${theme.title}`}>{title}</h1>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${theme.subtitle}`}>{subtitle}</span>
                </div>
            </div>

            {actions && (
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}
