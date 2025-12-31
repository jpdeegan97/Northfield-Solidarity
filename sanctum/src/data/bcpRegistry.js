
export const BCP_TYPES = {
    DATABASE: {
        code: 'DB',
        label: 'Database System',
        icon: 'Database', // Lucide icon name ref
        color: 'emerald',
        metrics: [
            { label: 'Replication Lag', unit: 'ms' },
            { label: 'Connections', unit: '%' },
            { label: 'IOPS', unit: 'k' }
        ],
        actions: ['Force Failover', 'Flush Cache', 'Snapshot']
    },
    SECURITY: {
        code: 'SEC',
        label: 'Security Module',
        icon: 'Shield',
        color: 'blue',
        metrics: [
            { label: 'Key Rotations', unit: 'h' },
            { label: 'Auth Rate', unit: 'req/s' },
            { label: 'Threat Level', unit: '' }
        ],
        actions: ['Rotate Keys', 'Lockdown', 'Audit Log']
    },
    NETWORK: {
        code: 'NET',
        label: 'Network Infrastructure',
        icon: 'Globe',
        color: 'sky',
        metrics: [
            { label: 'Throughput', unit: 'Gbps' },
            { label: 'Error Rate', unit: '%' },
            { label: 'Active Routes', unit: '#' }
        ],
        actions: ['Reroute Traffic', 'Clear DNS', 'DDoS Mode']
    },
    POWER: {
        code: 'PWR',
        label: 'Power Systems',
        icon: 'Zap',
        color: 'orange',
        metrics: [
            { label: 'Load', unit: 'kW' },
            { label: 'Fuel Level', unit: '%' },
            { label: 'Runtime', unit: 'h' }
        ],
        actions: ['Start Generator', 'Grid Sync', 'Load Shed']
    },
    STORAGE: {
        code: 'STR',
        label: 'Cold Storage',
        icon: 'Archive',
        color: 'slate',
        metrics: [
            { label: 'Usage', unit: 'TB' },
            { label: 'Retrieval Time', unit: 's' },
            { label: 'Integrity', unit: '%' }
        ],
        actions: ['Verify Checksum', 'Archive Now', 'Prune']
    }
};

export const BCP_ASSETS = [
    {
        id: 'BCP-01',
        type: 'DATABASE',
        system: 'Primary Database (US-EAST)',
        region: 'us-east-1',
        status: 'HEALTHY',
        latency: '45ms',
        redundancy: '3 AZs',
        details: {
            version: 'PostgreSQL 16.2',
            uptime: '99.999%',
            lastBackup: '10m ago'
        }
    },
    {
        id: 'BCP-02',
        type: 'SECURITY',
        system: 'Key Management (HSM)',
        region: 'global',
        status: 'HEALTHY',
        latency: '120ms',
        redundancy: 'Global',
        details: {
            hardware: 'CloudHSM v2',
            compliance: 'FIPS 140-2 L3',
            keysActive: 4096
        }
    },
    {
        id: 'BCP-03',
        type: 'NETWORK',
        system: 'CDN Edge Network',
        region: 'global-edge',
        status: 'DEGRADED',
        latency: '210ms',
        redundancy: 'Partial',
        details: {
            provider: 'Fastly + Cloudflare',
            popCount: 142,
            cacheHitRate: '88%'
        }
    },
    {
        id: 'BCP-04',
        type: 'POWER',
        system: 'Backup Generator (Power)',
        region: 'us-east-1a',
        status: 'STANDBY',
        latency: '-',
        redundancy: 'N/A',
        details: {
            fuelType: 'Diesel',
            tankLevel: '98%',
            lastTest: '3 days ago'
        }
    }
];
