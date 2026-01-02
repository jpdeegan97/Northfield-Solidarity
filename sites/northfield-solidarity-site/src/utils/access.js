import { NS_PROJECTS } from '../data/projectRegistry';

export const hasJournalAccess = (user) => {
    // Logic to determine access. For now, let's assume admins and maybe operators have access.
    // Or if "Journal" is a project, check if the user has access to that project.
    // Since roles are simulated, we'll check role level.
    if (!user) return false;
    const allowedRoles = ['admin', 'operator', 'special_guest'];
    return allowedRoles.includes(user.role);
};
