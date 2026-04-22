const fs = require('fs');
const path = require('path');

const replacements = {
  '#1A1A1A': 'var(--text-color)',
  '#16A34A': 'var(--primary-color)',
  '#15803D': 'var(--primary-color-hover)',
  '#F0F0F0': 'var(--secondary-color)',
  '#E0E0E0': 'var(--border-color)',
  '#666666': 'var(--text-color-muted)',
  '#E8EDE6': 'var(--border-color-subtle)',
  '#1F7A5C': 'var(--accent-color)',
  '#FFFFFF': 'var(--background-color)',
  '#FFF': 'var(--background-color)'
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx|ts)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [hex, variable] of Object.entries(replacements)) {
        // Regex to match the hex color case-insensitively, making sure it isn't part of a larger hex
        const regex = new RegExp(hex + '(?![a-zA-Z0-9])', 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, variable);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

walk('src');
console.log('Done replacing colors.');
