const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DOCS_ROOT = path.join(__dirname, '../documentation/software_projects');

const FILES = [
    { id: '000-CHARTER', title: 'Project Charter & Scope' },
    { id: '001-ARCH', title: 'Architecture & System Design' },
    { id: '002-DATA', title: 'Data Models & Schema' },
    { id: '003-API', title: 'API Specification' },
    { id: '004-UI', title: 'UI/UX Guidelines' },
    { id: '005-SEC', title: 'Security & Compliance' },
    { id: '006-DEVOPS', title: 'Infrastructure & DevOps' },
    { id: '007-TEST', title: 'Testing Strategy' },
    { id: '008-PROD', title: 'Production Readiness' },
    { id: '009-LOGS', title: 'Observability & Logs' },
    { id: '010-PERF', title: 'Performance & Scaling' },
    { id: '011-TEAM', title: 'Team & Responsibilities' },
    { id: '012-ROADMAP', title: 'Product Roadmap' },
    { id: '013-RUNBOOK', title: 'Operational Runbook' },
    { id: '014-PM', title: 'Project Management' },
    { id: 'MASTER', title: 'Master Documentation Index' }
];

console.log("=== Northfield Solidarity Project Scaffolder ===");

rl.question('Enter Project Name (e.g. "Firmament"): ', (name) => {
    rl.question('Enter Project Code (3-6 chars, e.g. "FRMT"): ', (code) => {
        const projectCode = code.toUpperCase();
        const projectName = name.trim();
        const dirName = code.toUpperCase(); // e.g., FRMT

        const targetDir = path.join(DOCS_ROOT, dirName);

        if (fs.existsSync(targetDir)) {
            console.error(`Error: Directory ${targetDir} already exists.`);
            rl.close();
            return;
        }

        console.log(`Creating documentation suite for ${projectName} (${projectCode}) at ${targetDir}...`);
        fs.mkdirSync(targetDir, { recursive: true });

        FILES.forEach(file => {
            const fileName = `NS-${projectCode}-${file.id}`;
            const filePath = path.join(targetDir, fileName);

            const content = `# ${projectName} - ${file.title}
**ID:** ${fileName}
**Status:** DRAFT
**Owner:** [TBD]
**Last Updated:** ${new Date().toISOString().split('T')[0]}

## 1. Overview
[Content pending initialization]

## 2. Details
[Content pending initialization]
`;
            fs.writeFileSync(filePath, content);
            console.log(`  + Created ${fileName}`);
        });

        console.log("\nSuccess. Project documentation initialized.");
        rl.close();
    });
});
