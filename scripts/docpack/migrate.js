
const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../../site/src/data/docsRegistry.js');
const manifestPath = path.join(__dirname, '../../site/src/data/docs.manifest.json');
const migrationDir = path.join(__dirname, '../../documentation/software/migrated');

if (!fs.existsSync(migrationDir)) fs.mkdirSync(migrationDir, { recursive: true });

const content = fs.readFileSync(registryPath, 'utf8');

// Regex to capture categories
// This regex is brittle but should work for the specific format of docsRegistry.js
const categoryRegex = /category:\s*"([^"]+)",\s*icon:\s*"([^"]+)",\s*items:\s*\[([\s\S]*?)\]/g;

const manifest = [];
let catMatch;

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

while ((catMatch = categoryRegex.exec(content)) !== null) {
    const [_, category, icon, itemsString] = catMatch;
    const items = [];

    // We split items by `{ id:` to find start of items, this is heuristic
    const itemBlocks = itemsString.split(/{\s*id:/);

    for (let i = 1; i < itemBlocks.length; i++) {
        let block = "id:" + itemBlocks[i];
        // Clean up trailing comma or bracket
        block = block.split('}')[0];

        const idMatch = block.match(/id:\s*"([^"]+)"/);
        const titleMatch = block.match(/title:\s*"([^"]+)"/);
        const descMatch = block.match(/desc:\s*"([^"]+)"/);
        // Content might be a variable or a backtick string. Backtick string might ideally be captured.
        // We match until the end of the line or structure? 
        // Logic: content: (VAR) or (`...`) or ("...")
        const contentMatch = block.match(/content:\s*(`[\s\S]*?`|"[^"]*"|[a-zA-Z0-9_]+)/);

        if (idMatch && titleMatch) {
            const id = idMatch[1];
            const title = titleMatch[1];
            const desc = descMatch ? descMatch[1] : "";
            let contentRaw = contentMatch ? contentMatch[1] : "";

            let filePath = "";

            if (contentRaw.startsWith('`') || contentRaw.startsWith('"')) {
                // Inline content
                let fileContent = contentRaw.slice(1, -1);
                // Fix escaped backticks or ${} if any? Usually backticks in template literal.
                fileContent = fileContent.replace(/\\`/g, '`');

                filePath = `documentation/software/migrated/${slugify(category)}-${slugify(title)}.md`;
                fs.writeFileSync(path.join(__dirname, '../../', filePath), fileContent);
            } else {
                // Variable reference
                const variable = contentRaw;
                const parts = variable.replace('NS_', '').split('_');
                if (parts.length >= 2) {
                    const name = parts[0];
                    let enginePath = `documentation/software/engines/NS/${name}/${variable.replace(/_/g, '-')}.md`;

                    if (!fs.existsSync(path.join(__dirname, '../../', enginePath))) {
                        const projectPath = `documentation/software/projects/${name}/${variable.replace(/_/g, '-')}.md`;
                        if (fs.existsSync(path.join(__dirname, '../../', projectPath))) {
                            filePath = projectPath;
                        } else {
                            filePath = enginePath; // specific fallback
                        }
                    } else {
                        filePath = enginePath;
                    }
                }
            }

            items.push({
                id,
                title,
                desc,
                path: filePath
            });
        }
    }

    manifest.push({
        category,
        icon,
        items
    });
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
console.log(`Manifest written to ${manifestPath}`);
