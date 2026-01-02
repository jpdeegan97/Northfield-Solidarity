
// Mock GGP Service
// Simulates a backend for Global Governance Platform

const MOCK_EXECUTIONS = [
    { id: 'GOV-8821', type: 'SOP_UPDATE', status: 'CLEARED', timestamp: '09:15:22 UTC', initiator: 'SYSTEM', summary: 'Routine policy re-indexing for Sector 4.' },
    { id: 'GOV-8820', type: 'ACCESS_REQ', status: 'PENDING', timestamp: '09:14:05 UTC', initiator: 'J.DOE', summary: 'Requesting write access to IDN-Production.' },
    { id: 'GOV-8819', type: 'EXCEPTION', status: 'FLAGGED', timestamp: '09:10:00 UTC', initiator: 'AUTO_SENTINEL', summary: 'Traffic spike anomaly detected in MUX-Gateway.' },
    { id: 'GOV-8818', type: 'DEPLOYMENT', status: 'CLEARED', timestamp: '08:55:12 UTC', initiator: 'CI/CD', summary: 'Deployment batch #4402 authorized.' },
];

const MOCK_POLICIES = [
    { id: 'POL-001', name: 'Zero Trust Root', level: 'L0', enforcement: 'HARD', status: 'ACTIVE' },
    { id: 'POL-024', name: 'Vendor API Rate Limits', level: 'L2', enforcement: 'SOFT', status: 'ACTIVE' },
    { id: 'POL-109', name: 'Emergency Shutdown', level: 'L0', enforcement: 'MANUAL', status: 'DORMANT' },
];

class MockGgpService {
    constructor() {
        this.executions = [...MOCK_EXECUTIONS];
        this.policies = [...MOCK_POLICIES];
    }

    async getDashboardData() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
            executions: [...this.executions],
            policies: [...this.policies]
        };
    }

    async approveExecution(id) {
        await new Promise(resolve => setTimeout(resolve, 600));
        const idx = this.executions.findIndex(e => e.id === id);
        if (idx !== -1) {
            this.executions[idx] = { ...this.executions[idx], status: 'CLEARED' };
            return this.executions[idx];
        }
        throw new Error("Execution not found");
    }

    async flagExecution(id) {
        await new Promise(resolve => setTimeout(resolve, 400));
        const idx = this.executions.findIndex(e => e.id === id);
        if (idx !== -1) {
            this.executions[idx] = { ...this.executions[idx], status: 'FLAGGED' };
            return this.executions[idx];
        }
    }
}

export const ggpService = new MockGgpService();
