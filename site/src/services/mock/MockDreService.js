
// Mock DRE Service
// Simulates a backend for Deep Research Engine

const MOCK_NODES = [
    { id: 'RES-001', title: 'Ethereum L2 Scaling', category: 'INFRASTRUCTURE', confidence: 0.98, updated: '4h ago', sources: 12, content: 'The rapid evolution of Ethereum L2 scaling suggests a fundamental shift...' },
    { id: 'RES-005', title: 'Modular Governance Models', category: 'GOVERNANCE', confidence: 0.85, updated: '1d ago', sources: 8, content: 'Modular governance decouples voting from execution...' },
    { id: 'RES-012', title: 'Zero-Knowledge Privacy', category: 'CRYPTOGRAPHY', confidence: 0.92, updated: '2d ago', sources: 15, content: 'ZK proofs offer a way to verify computation without revealing inputs...' },
    { id: 'RES-044', title: 'AI Agent Swarms', category: 'EMERGING_TECH', confidence: 0.77, updated: '12h ago', sources: 5, content: 'Autonomous agent swarms are showing emergent behavior in complex environments...' },
];

const MOCK_CITATIONS = [
    { id: 'CIT-01', nodeId: 'RES-001', title: 'Vitalik Blog: Endgame', type: 'BLOG', relevance: 'HIGH' },
    { id: 'CIT-02', nodeId: 'RES-001', title: 'Arxiv: Optimistic Rollups', type: 'PAPER', relevance: 'CRITICAL' },
    { id: 'CIT-03', nodeId: 'RES-001', title: 'Flashbots Docs', type: 'DOCS', relevance: 'MEDIUM' },
    { id: 'CIT-04', nodeId: 'RES-005', title: 'DAO Constitution 2.0', type: 'GOV', relevance: 'HIGH' },
];

class MockDreService {
    constructor() {
        this.nodes = [...MOCK_NODES];
        this.citations = [...MOCK_CITATIONS];
    }

    async getResearchData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            nodes: [...this.nodes],
            citations: [...this.citations] // In a real app, we'd filter by selected Node
        };
    }

    async getCitationsForNode(nodeId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.citations.filter(c => c.nodeId === nodeId);
    }

    async updateCitation(id, updates) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const idx = this.citations.findIndex(c => c.id === id);
        if (idx !== -1) {
            this.citations[idx] = { ...this.citations[idx], ...updates };
            return this.citations[idx];
        }
        return null;
    }

    // Feature 4: Magic Paste / Auto-Extraction
    async analyzeUrl(input) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate scraping

        // Mock scraping logic
        const type = input.includes('pdf') || input.includes('arxiv') ? 'PAPER' :
            input.includes('github') ? 'DOCS' : 'BLOG';

        return {
            title: `Scraped: ${input.split('/').pop() || 'Untitled Source'}`,
            type: type,
            relevance: 'HIGH', // Auto-rank high
            tags: ['#AUTO', `#${type}`, '#ETH']
        };
    }

    // Feature 3: Ask the Corpus
    async askQuestion(nodeId, query) {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Thinking time
        return `Based on analyzed sources, the consensus is that ${query.split(' ').slice(-1)[0]} is critical for scalability, though 2 sources dissent regarding implementation specifics.`;
    }

    async addSource(nodeId, sourceData) {
        await new Promise(resolve => setTimeout(resolve, 600));
        const newSource = {
            id: `CIT-${Math.floor(Math.random() * 1000)}`,
            nodeId,
            ...sourceData,
            relevance: sourceData.relevance || 'MEDIUM'
        };
        this.citations.push(newSource);

        // Update node source count
        const nodeIdx = this.nodes.findIndex(n => n.id === nodeId);
        if (nodeIdx !== -1) {
            this.nodes[nodeIdx].sources += 1;
        }

        return newSource;
    }
}

export const dreService = new MockDreService();
