
// Shared Data for Inner Sanctum

export interface Email {
    id: number;
    sender: string; // For drafts, this might be the recipient
    subject: string;
    snippet: string;
    time: string;
    read: boolean;
    body?: string;
    avatarInitials: string;
    avatarColor: string; // e.g., 'from-purple-500 to-blue-600' or hex for mobile
    folder: 'inbox' | 'drafts' | 'sent';
}

export const INNER_SANCTUM_EMAILS: Email[] = [
    {
        id: 1,
        sender: 'System Notification',
        subject: 'Security Alert: Unrecognized Login Attempt',
        snippet: 'We detected access to your Inner Sanctum account...',
        time: '10:42 AM',
        read: false,
        avatarInitials: 'SN',
        avatarColor: '#8b5cf6', // purple-500
        folder: 'inbox',
        body: `We detected access to your Inner Sanctum account from an unrecognized device.

Location: Unknown Sector 7G

Please verify your identity via the Firmament console or contact support immediately if this was not you.`
    },
    {
        id: 2,
        sender: 'Archives',
        subject: 'Weekly Reflection Digest',
        snippet: 'Your weekly compilation of thoughts and logs is ready.',
        time: 'Yesterday',
        read: true,
        avatarInitials: 'AR',
        avatarColor: '#3b82f6', // blue-500
        folder: 'inbox',
        body: `Hello Traveler,

Your weekly reflection digest has been compiled. 

- 3 Journal Entries
- 12 Micro-thoughts
- 1 Epiphany

Access the full report in the Journal module.`
    },
    {
        id: 3,
        sender: 'The Architect',
        subject: 'Project Update: Firmament',
        snippet: 'The grid alignment is nearing completion.',
        time: 'Dec 28',
        read: true,
        avatarInitials: 'TA',
        avatarColor: '#10b981', // emerald-500
        folder: 'inbox',
        body: `All systems are nominal. 

The Firmament grid alignment is 98.2% complete. Please review the latest telemetry data in the Cockpit.

- Architect`
    },
    {
        id: 4,
        sender: 'Operations',
        subject: 'Draft: Q4 Resource Allocation',
        snippet: 'Notes on sector 4 expansion...',
        time: '11:00 AM',
        read: true,
        avatarInitials: 'ME',
        avatarColor: '#64748b', // slate-500
        folder: 'drafts',
        body: `[DRAFT]
        
Proposed allocation for Q4:
- 40% to Infrastructure
- 30% to R&D (Firmament)
- 30% to Reserves

Need to double check the energy consumption metrics before finalizing.`
    }
];
