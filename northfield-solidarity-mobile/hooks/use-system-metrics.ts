
import { useState, useEffect } from 'react';

export function useSystemMetrics() {
    const [metrics, setMetrics] = useState({
        cpu: '12%',
        mem: '34%',
        net: '1.2Gb',
        latency: '24ms',
        uptime: '99.9%'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                cpu: `${Math.floor(Math.random() * 30 + 10)}%`,
                mem: `${Math.floor(Math.random() * 20 + 30)}%`,
                net: `${(Math.random() * 2 + 0.5).toFixed(1)}Gb`,
                latency: `${Math.floor(Math.random() * 20 + 15)}ms`,
                uptime: '99.9%'
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return metrics;
}
