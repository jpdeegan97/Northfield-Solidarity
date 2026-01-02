export const NS_GOV_001_ROLES = `
# Northfield Solidarity Role & Permission Protocol

## Overview
This document outlines the hierarchical role-based access control (RBAC) system governing the Northfield Solidarity ecosystem. The system is designed to provide granular access control while enabling users to "stack" capabilities through enrollment programs.

## The Hierarchy
The permission model is linear, meaning higher levels inherit the permissions of lower levels.

| Level | Role | Description |
| :--- | :--- | :--- |
| **0** | **GUEST** | Unauthenticated users. Limited to public-facing site content. |
| **10** | **OPERATOR** | The base authenticated user. Access to general dashboard and standard user features. |
| **20** | **ARCHITECT** | Users with design-focused privileges for structuring project concepts. |
| **30** | **SOVEREIGN** | Independent entities with enhanced autonomy and asset management capabilities. |
| **40** | **DEVELOPER** | **(The Dev Extension)** Users with technical access to the Dev Console, API keys, and node provisioning. |
| **50** | **INVESTOR** | Capital partners. Includes full Developer access plus financial reporting and equity management. |
| **90** | **SPECIAL GUEST** | VIP access with specialized permissions tailored to strategic partners. |
| **100** | **ADMIN** | System super-users with effectively unlimited access. |

## The "Developer Extension" Concept
The **Developer** role (Level 40) is treated as a specialized "extension" or "arm" that can be acquired by users at lower levels (Operator, Architect, Sovereign).

### How it Works
A user identity is defined by their highest clearance level. To access the **Developer Console** (\`/developers/access\`), a user must hold a clearance of **Level 40** or higher.

- **Operator + Developer**: An Operator (Level 10) who wishes to build on the platform must enroll in the Developer Program. Upon enrollment, their clearance is raised to **Developer (Level 40)**. They retain all Operator privileges but gain Developer capabilities.
- **Sovereign + Developer**: A Sovereign entity (Level 30) must similarly enroll to gain access. Their status upgrades to Developer (Level 40), allowing them to provision nodes while keeping their sovereignty.
- **Investor**: Investors (Level 50) stand above the Developer threshold. They automatically possess the Developer Extension without needing separate enrollment, reflecting their high-level stake in the ecosystem.

### Enrollment Protocol
When a user with insufficient privileges (e.g., Operator) attempts to access the Developer Console:
1.  **Detection**: The system identifies the user's current level (e.g., Level 10).
2.  **Auth Challenge**: Security protocols flag the deficiency (Requires Level 40+).
3.  **Enrollment Trigger**: The user is presented with the "Developer Program Enrollment" workflow.
4.  **Elevation**: Upon confirmation, the user's role is promoted, effectively "installing" the Developer Extension onto their identity.
`;
