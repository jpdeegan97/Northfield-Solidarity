export const USER_ROLES = {
    GUEST: 'guest',           // Level 0
    STARTER: 'starter',       // Level 40
    BUILDER: 'builder',       // Level 60
    INVESTOR: 'investor',     // Level 75
    OPERATOR: 'operator',     // Level 80
    SPECIAL_GUEST: 'special_guest', // Level 90
    ADMIN: 'admin'            // Level 100
};

export const MOCK_USERS = [
    // Starter (2)
    { id: 'STR-001', email: 'starter2@northfieldsolidarity.ai', role: USER_ROLES.STARTER, name: 'Starter One' },
    { id: 'STR-002', email: 'starter2@northfieldsolidarity.ai', role: USER_ROLES.STARTER, name: 'Starter Two' },

    // Builder (2)
    { id: 'BLD-001', email: 'builder1@northfieldsolidarity.ai', role: USER_ROLES.BUILDER, name: 'Builder One' },
    { id: 'BLD-002', email: 'builder2@northfieldsolidarity.ai', role: USER_ROLES.BUILDER, name: 'Builder Two' },

    // Operator (2)
    { id: 'OPR-001', email: 'operator1@northfieldsolidarity.ai', role: USER_ROLES.OPERATOR, name: 'Operator One' },
    { id: 'OPR-002', email: 'operator2@northfieldsolidarity.ai', role: USER_ROLES.OPERATOR, name: 'Operator Two' },

    // Investor (2)
    { id: 'INV-001', email: 'investor1@northfieldsolidarity.ai', role: USER_ROLES.INVESTOR, name: 'Investor One' },
    { id: 'INV-002', email: 'investor2@northfieldsolidarity.ai', role: USER_ROLES.INVESTOR, name: 'Investor Two' },

    // Admin (1)
    { id: 'ADM-001', email: 'admin@northfieldsolidarity.ai', role: USER_ROLES.ADMIN, name: 'System Admin', password: 'admin1234' },

    // Special Guest (2)
    { id: 'SPG-001', email: 'kiran.pampari@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest One' },
    { id: 'SPG-002', email: 'pete.deegan@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' },
    { id: 'SPG-003', email: 'kalp.oza@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Threeq' },
    { id: 'SPG-004', email: 'effie.deegan@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' },
    { id: 'SPG-005', email: 'kelsey.bagen@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' },
    { id: 'SPG-006', email: 'melody.ector@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' }, 
    { id: 'SPG-007', email: 'rory.stello@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' }
];

export const getMockUser = (email) => {
    return MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
};
