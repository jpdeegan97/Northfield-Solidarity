
const fs = require('fs');
const path = require('path');

const templates = {
    "000-CHARTER": "# {{ID}}-000-CHARTER — Engine Charter\n\n## Mission\n{{DESCRIPTION}}\n\n## Identity\n- **Name:** {{NAME}}\n- **Type:** {{TYPE}}\n",
    "001-OVERVIEW": "# {{ID}}-001-OVERVIEW — Overview\n\n## Purpose\n{{DESCRIPTION}}\n\n## Scope\nDescribes the boundaries and primary objectives of the {{NAME}} {{TYPE}}.\n",
    "002-TAXONOMY": "# {{ID}}-002-TAXONOMY — Taxonomy\n\n## Vocabulary\nDefinitions of core terms used within this {{TYPE}}.\n",
    "003-ARCHITECTURE": "# {{ID}}-003-ARCHITECTURE — Architecture\n\n## Logical Architecture\nHigh-level components and their interactions.\n",
    "004-LIFECYCLE": "# {{ID}}-004-LIFECYCLE — Lifecycle\n\n## Phases\nExecution flow from initialization to termination.\n",
    "005-DECISION": "# {{ID}}-005-DECISION — Decision Framework\n\n## Decision Logic\nHow the {{TYPE}} makes choices and the criteria involved.\n",
    "006-VERSIONING": "# {{ID}}-006-VERSIONING — Versioning\n\n## Strategy\nRules for versioning artifacts and logic.\n",
    "007-DATAMODEL": "# {{ID}}-007-DATAMODEL — Data Model\n\n## Schema\nCore entities and their relationships.\n",
    "008-EEE": "# {{ID}}-008-EEE — Example Execution\n\n## Scenario\nWalkthrough of a typical execution path.\n",
    "009-IMPL": "# {{ID}}-009-IMPL — Implementation\n\n## Roadmap\nSteps to implement the MVP and beyond.\n",
    "010-FE": "# {{ID}}-010-FE — Frontend\n\n## UX/UI\nInterface requirements and wireframes.\n",
    "011-APIMAP": "# {{ID}}-011-APIMAP — API Map\n\n## Endpoints\nInternal and external API surfaces.\n",
    "012-STATE": "# {{ID}}-012-STATE — State Management\n\n## States\nValid states and transitions.\n",
    "013-RUNBOOK": "# {{ID}}-013-RUNBOOK — Runbook\n\n## Operations\nProcedures for maintenance and troubleshooting.\n",
    "014-DATADEF": "# {{ID}}-014-DATADEF — Data Definitions\n\n## Dictionary\nField-level definitions and types.\n"
};

const enginesDir = path.join(__dirname, 'templates/engine');
const projectsDir = path.join(__dirname, 'templates/project');

[enginesDir, projectsDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    Object.entries(templates).forEach(([key, content]) => {
        // For projects, maybe skip Charter? User said "000-014 plus master...". I'll include all.
        fs.writeFileSync(path.join(dir, `${key}.md`), content);
    });
});

console.log('Templates created.');
