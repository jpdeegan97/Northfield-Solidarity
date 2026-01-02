export const USER_ROLES = {
    GUEST: 'guest',           // Level 0
    OPERATOR: 'operator',     // Level 10
    ARCHITECT: 'architect',   // Level 20
    SOVEREIGN: 'sovereign',   // Level 30
    DEVELOPER: 'developer',   // Level 40
    INVESTOR: 'investor',     // Level 50
    SPECIAL_GUEST: 'special_guest', // Level 90
    ADMIN: 'admin'            // Level 100
};

export const ROLE_LEVELS = {
    [USER_ROLES.GUEST]: 0,
    [USER_ROLES.OPERATOR]: 10,
    [USER_ROLES.ARCHITECT]: 20,
    [USER_ROLES.SOVEREIGN]: 30,
    [USER_ROLES.DEVELOPER]: 40,
    [USER_ROLES.INVESTOR]: 50,
    [USER_ROLES.SPECIAL_GUEST]: 90,
    [USER_ROLES.ADMIN]: 100
};

export const MOCK_USERS = [
    // Operator (Level 10)
    { id: 'OPR-001', email: 'operator1@northfieldsolidarity.ai', role: USER_ROLES.OPERATOR, name: 'Operator One' },

    // Architect (Level 20)
    { id: 'ARC-001', email: 'architect1@northfieldsolidarity.ai', role: USER_ROLES.ARCHITECT, name: 'Architect One' },

    // Developer (Level 40)
    { id: 'DEV-001', email: 'dev1@northfieldsolidarity.ai', role: USER_ROLES.DEVELOPER, name: 'Developer One' },

    // Investor (Level 50)
    { id: 'INV-001', email: 'investor1@northfieldsolidarity.ai', role: USER_ROLES.INVESTOR, name: 'Investor One' },

    // Admin (Level 100)
    { id: 'ADM-001', email: 'admin@northfieldsolidarity.ai', role: USER_ROLES.ADMIN, name: 'System Admin', password: 'admin1234' },

    // Special Guest (Level 90)
    { id: 'SPG-001', email: 'kiran.pampari@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest One' },
    { id: 'SPG-002', email: 'pete.deegan@northfieldsolidarity.ai', role: USER_ROLES.SPECIAL_GUEST, name: 'Special Guest Two' },
    { id: 'ADM-002', email: 'john.deegan@northfieldsolidarity.ai', role: USER_ROLES.ADMIN, name: 'John Deegan' }
];

export const getMockUser = (email) => {
    return MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
};
