
// Mock IDN Service
// Simulates a backend for Identity Management

const MOCK_ENTITIES = [
    { id: 'USR-001', name: 'J. Deegan', type: 'HUMAN', role: 'ROOT_ADMIN', status: 'ACTIVE', lastSeen: 'Now' },
    { id: 'SVC-042', name: 'GGP_Orchestrator', type: 'SERVICE', role: 'SYSTEM_WRITE', status: 'ACTIVE', lastSeen: '0s ago' },
    { id: 'BOT-991', name: 'Arb_Sentinel_v4', type: 'BOT', role: 'EXECUTION', status: 'PAUSED', lastSeen: '4h ago' },
    { id: 'USR-004', name: 'Guest_Auditor', type: 'HUMAN', role: 'READ_ONLY', status: 'IDLE', lastSeen: '2d ago' },
];

class MockIdnService {
    constructor() {
        this.entities = [...MOCK_ENTITIES];
    }

    async getEntities() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...this.entities];
    }

    async addEntity(entity) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newEntity = {
            ...entity,
            id: entity.id || `USR-${Math.floor(Math.random() * 1000)}`,
            lastSeen: 'Just now',
            status: entity.status || 'ACTIVE'
        };
        this.entities.push(newEntity);
        return newEntity;
    }

    async updateStatus(id, newStatus) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const idx = this.entities.findIndex(e => e.id === id);
        if (idx !== -1) {
            this.entities[idx] = { ...this.entities[idx], status: newStatus };
            return this.entities[idx];
        }
        throw new Error(`Entity ${id} not found`);
    }
}

export const idnService = new MockIdnService();
