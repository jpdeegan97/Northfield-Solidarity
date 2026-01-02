/**
 * NS Financial Projection Engine
 * 
 * A deterministic logic layer for generating financial projections based on
 * defined growth drivers, unit economics, and churn assumptions.
 * 
 * @version 1.2.0 (High Velocity Update)
 */

export const SCENARIOS = {
    CONSERVATIVE: {
        label: 'Conservative',
        growthRate: 0.08, // 8% MoM
        arpu: 250, // Discounted early access
        churn: 0.05, // Higher churn initially
        serviceRevenueAttachRate: 0.20 // 20% of deals need help
    },
    BASE: {
        label: 'Base Case',
        growthRate: 0.15, // 15% MoM
        arpu: 450, // Standard Enterprise
        churn: 0.03,
        serviceRevenueAttachRate: 0.35
    },
    AGGRESSIVE: {
        label: 'Viral / Blitzscale',
        growthRate: 1.15, // 115% MoM (Doubling every month)
        arpu: 150, // Lower price point for mass adoption friction reduction
        churn: 0.08, // Higher churn with mass adoption
        serviceRevenueAttachRate: 0.05 // Self-serve focus
    }
};

export class FinancialModel {
    constructor(scenarioKey = 'BASE', startMonthStr = "Jan '26") {
        this.config = SCENARIOS[scenarioKey] || SCENARIOS.BASE;
        this.startMonth = startMonthStr;
        this.projectionMonths = 24; // 2 Year Lookahead
        // Adjust starting users based on scenario
        this.initialUsers = scenarioKey === 'AGGRESSIVE' ? 100 : 12;
    }

    /**
     * Generates a month-by-month financial manifest.
     */
    runProjection() {
        let activeUsers = this.initialUsers;
        const timeline = [];
        let cumulativeRevenue = 0;

        // Helper to generate quarter labels
        // NOW Starts Jan '26
        const getLabel = (idx) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const yearStart = 26;
            const totalM = idx;
            const year = yearStart + Math.floor(totalM / 12);
            const m = months[totalM % 12];
            return `${m}'${year}`;
        };

        for (let i = 0; i < this.projectionMonths; i++) {
            // 1. Calculate Base Revenue
            const subscriptionRevenue = activeUsers * this.config.arpu;

            // New users this month
            // For AGGRESSIVE, we apply a viral coefficient logic where growth dampens as we hit scale, 
            // but accelerates early.
            let growthRate = this.config.growthRate;

            // Logistic dampener for viral scenario to prevent infinite explosion
            if (this.config.label === 'Viral / Blitzscale') {
                if (activeUsers > 1000) growthRate = 0.40; // Slow to 40% MoM after 1k
                if (activeUsers > 5000) growthRate = 0.20; // Slow to 20% MoM after 5k
                if (activeUsers > 10000) growthRate = 0.10; // Slow to 10% MoM after 10k
            }

            const netNewUsers = Math.max(1, activeUsers * growthRate);

            // Service Revenue (Implementation fees)
            const serviceRevenue = (netNewUsers * this.config.serviceRevenueAttachRate) * 5000;

            // Expansion Revenue
            const expansionRevenue = (activeUsers * 0.10) * (this.config.arpu * 0.20 / 12);

            const totalMonthlyRevenue = subscriptionRevenue + serviceRevenue + expansionRevenue;
            cumulativeRevenue += totalMonthlyRevenue;

            // 2. Push Data Point
            timeline.push({
                monthIndex: i,
                label: getLabel(i),
                metrics: {
                    activeUsers: Math.floor(activeUsers),
                    mrr: Math.floor(subscriptionRevenue + expansionRevenue),
                    arr: Math.floor((subscriptionRevenue + expansionRevenue) * 12),
                    serviceRevenue: Math.floor(serviceRevenue),
                    expansionRevenue: Math.floor(expansionRevenue),
                    totalRevenue: Math.floor(totalMonthlyRevenue),
                    cumulativeRevenue: Math.floor(cumulativeRevenue)
                }
            });

            // 3. Evolve State for Next Month
            const churned = activeUsers * this.config.churn;
            activeUsers = activeUsers + netNewUsers - churned;
        }

        return {
            scenario: this.config.label,
            arpuUsed: this.config.arpu,
            timeline
        };
    }
}
