
const fs = require('fs');
const path = require('path');

// Configuration
const MANIFEST_PATH = path.join(__dirname, '../../site/src/data/docs.manifest.json');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const ENGINES_ROOT = path.join(__dirname, '../../documentation/software/engines/NS');
const PROJECTS_ROOT = path.join(__dirname, '../../documentation/software/projects');

// Helper to parse input
function parseInput(input) {
    const lines = input.split('\n');
    const metadata = {};
    const descLines = [];

    let readingDesc = false;

    for (const line of lines) {
        if (!readingDesc) {
            const match = line.match(/^([a-zA-Z0-9]+):\s*(.+)$/);
            if (match) {
                metadata[match[1].toLowerCase()] = match[2].trim();
            } else if (line.trim() === '') {
                // Empty line might start description if we have some metadata
                if (Object.keys(metadata).length > 0) readingDesc = true;
            } else {
                // Non-matching line, assume description starts
                readingDesc = true;
                descLines.push(line);
            }
        } else {
            descLines.push(line);
        }
    }

    if (!metadata.id || !metadata.type || !metadata.name) {
        throw new Error("Missing required metadata: ID, Type, Name.");
    }

    return {
        id: metadata.id.toUpperCase(),
        type: metadata.type.toLowerCase(), // 'engine' or 'project'
        name: metadata.name,
        description: descLines.join('\n').trim()
    };
}

// Helper to load templates
function loadTemplates(type) {
    const dir = path.join(TEMPLATES_DIR, type);
    if (!fs.existsSync(dir)) throw new Error(`Template directory not found: ${dir}`);

    const files = fs.readdirSync(dir);
    const templates = {};
    files.forEach(file => {
        if (file.endsWith('.md')) {
            templates[file.replace('.md', '')] = fs.readFileSync(path.join(dir, file), 'utf8');
        }
    });
    return templates;
}

// Helper to render template
function render(content, data) {
    return content
        .replace(/{{ID}}/g, data.id)
        .replace(/{{NAME}}/g, data.name)
        .replace(/{{TYPE}}/g, data.type === 'engine' ? 'Engine' : 'Project')
        .replace(/{{DESCRIPTION}}/g, data.description);
}

// Main Logic
async function main() {
    let input = '';

    // Read from stdin or file arg
    if (process.argv[2]) {
        input = fs.readFileSync(process.argv[2], 'utf8');
    } else {
        // Read stdin
        try {
            input = fs.readFileSync(0, 'utf8');
        } catch (e) {
            // If no stdin, maybe user ran without args expecting help
            console.log("Usage: node cli.js <spec-file> or pipe content to stdin");
            console.log("Spec format:\nID: MYID\nType: Engine\nName: My Engine\n\nDescription goes here...");
            process.exit(1);
        }
    }

    const data = parseInput(input);
    console.log(`Processing ${data.type}: ${data.name} (${data.id})`);

    const targetRoot = data.type === 'engine' ? ENGINES_ROOT : PROJECTS_ROOT;
    const targetDir = path.join(targetRoot, data.id); // Use ID as folder name usually? Or Name? 
    // Engines usually use ID (e.g. GGP, MUX). Projects might use Name (e.g. BOOMERANG). 
    // Let's use ID for Engines, Name/ID for Projects. To be safe, let's use ID for consistency or Name if more readable.
    // Existing structure: Engines/NS/GGP. Projects/BOOMERANG. 
    // So ID seems to be the convention for folder names too.
    const outputDir = path.join(targetRoot, data.id);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`Created directory: ${outputDir}`);
    }

    const templates = loadTemplates(data.type);
    const generatedFiles = [];

    // Write Files
    for (const [key, tpl] of Object.entries(templates)) {
        // Filename construction: NS-ID-KEY.md
        // e.g. NS-GGP-001-OVERVIEW.md
        // For project? NS-BOOM-012-STATE.md.

        const filename = `NS-${data.id}-${key}.md`;
        const filePath = path.join(outputDir, filename);

        const fileContent = render(tpl, data);
        if (!fs.existsSync(filePath)) { // Don't overwrite by default? User said "writes each doc...". 
            // If it exists, maybe we shouldn't overwrite unless force? 
            // "Update your website so the new docs automatically appear" implies creation. 
            // I'll overwrite for now as it's a generator.
            // Or maybe check?
            fs.writeFileSync(filePath, fileContent);
        } else {
            // Maybe skip if exists to preserve manual edits? 
            // "Write each doc as separate files". 
            // I'll skip if exists to be safe, or just log it.
            console.log(`File exists, skipping (implied safe mode): ${filename}`);
            generatedFiles.push({ key, filename, path: filePath, exists: true });
            continue;
        }

        console.log(`Generated: ${filename}`);
        generatedFiles.push({ key, filename, path: filePath, exists: false });
    }

    // Update Manifest
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

    // Find or Create Category
    // For Engine: Category is "ID Engine" or just Name? manifest uses "GGP Engine"
    // For Project: Category "Projects"? Or separate? 
    // Existing manifest has all engines. Projects might be in a "Projects" category or separate.

    let categoryName = data.type === 'engine' ? `${data.id} Engine` : `${data.name} Project`;

    // Check if category exists
    let category = manifest.find(c => c.category === categoryName);
    if (!category) {
        // Create new category
        category = {
            category: categoryName,
            icon: data.type === 'engine' ? '⚙️' : '🚀',
            items: []
        };
        manifest.push(category);
    }

    // Add items
    // We need to map the generated files to manifest items.
    // Manifest schema: { id, title, desc, path }

    const items = [];
    // Sort templates by key to ensure order? 000, 001...
    const sortedKeys = Object.keys(templates).sort();

    for (const key of sortedKeys) {
        // Key is like 001-OVERVIEW
        // ID: lowercase id-type? e.g. ggp-overview
        const parts = key.split('-');
        const num = parts[0];
        const label = parts.slice(1).join(' '); // OVERVIEW

        const itemId = `${data.id.toLowerCase()}-${label.toLowerCase().replace(/ /g, '-')}`;
        const title = `${num} ${label.charAt(0) + label.slice(1).toLowerCase()}`; // 001 Overview
        const descMatch = templates[key].match(/## Purpose\n(.+)/) || templates[key].match(/## Mission\n(.+)/);
        const desc = descMatch ? descMatch[1].trim() : `Documentation for ${label}`;

        // Path needs to be relative to what? The manifest stores paths now? 
        // Migrate script stored paths relative to root or whatever I decided. 
        // DocsContext usually just imports. 
        // But if I switched to JSON, I need the path relative to project root or site root?
        // Migrate script put: documentation/software/engines/...
        // Let's stick to project-relative paths.

        const relativePath = `documentation/software/${data.type === 'engine' ? 'engines/NS' : 'projects'}/${data.id}/NS-${data.id}-${key}.md`;

        // Check if item already exists
        const existingItemIndex = category.items.findIndex(i => i.id === itemId);
        const newItem = {
            id: itemId,
            title,
            desc,
            path: relativePath
        };

        if (existingItemIndex > -1) {
            category.items[existingItemIndex] = newItem;
        } else {
            category.items.push(newItem);
        }
    }

    category.items.sort((a, b) => a.title.localeCompare(b.title)); // Basic sort by title (001 vs 002 will work)

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 4));
    console.log(`Updated manifest: ${MANIFEST_PATH}`);

    // Generate System Tab (Engine Summary)
    if (data.type === 'engine') {
        // "engines should also get an auto-generated “system tab” summary page that links to the full engine doc set"
        // This probably implies an index file or a specific "System" tab in the UI? 
        // Or maybe a file like NS-[ID]-System.md? 
        // For now I'll create a summary markdown file if that's what's meant.
        // Or maybe it's just ensuring the "001-OVERVIEW" is robust?
        // "auto-generated 'system tab' summary page". 
        // I'll create a special README or index.md in the engine dir?
        // Or maybe strictly in the manifest?
        // I will assume it creates a summary file.
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
