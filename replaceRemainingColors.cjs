const fs = require('fs');
const path = require('path');

const cssVars = `
  /* Extended Global Colors */
  --text-black: #000000;
  --text-dark: #111827;
  --text-gray-dark: #525252;
  --text-gray: #757575;
  --text-gray-light: #9CA3AF;
  --text-gray-lighter: #AAAAAA;
  
  --bg-offwhite: #F9F7F2;
  --bg-muted: #F5F5F5;
  --bg-muted-dark: #E5DFD4;
  --bg-gray: #E5E7EB;
  
  --border-light: #E0E0E0;
  --border-muted: #D0D0D0;
  
  --info-color: #1E90FF;
  --info-color-light: #B2D8FF;
  --info-color-bg: #E6F2FF;
  
  --warning-color: #F85B01;
  --warning-color-alt: #E76F26;
  --warning-color-alt2: #E05000;
  --warning-color-light: #FFD4B2;
  --warning-color-bg: #FFF4EC;
  
  --success-color: #22A06B;
  --success-color-alt: #4CAF50;
  --success-color-light: #B2FFD4;
  --success-color-bg: #E6FFF2;
  --success-color-dark: #195f4e;
  --success-color-darker: #145a47;
  
  --error-color: #EF4444;
  --error-color-alt: #EF1F24;
  --error-color-alt2: #EF5350;
  --error-color-alt3: #DC2626;
  --error-color-alt4: #FF5A5F;
  --error-color-light: #FFB2B2;

  --accent-purple: #A259D9;
  --accent-purple-light: #E2B2FF;
  --accent-yellow: #F5B700;
  --accent-yellow-light: #FFF7B2;
  
  --accent-green-dark: #1F7A63;
  --accent-green-alt: #1B5E20;
  --accent-green-alt2: #1B3B1E;
  --accent-green-light: #C8E6C9;
  
  --color-brown-dark: #322822;
  --color-brown-light: #6B5E57;
  --color-beige: #D9D1C3;
  --color-beige-light: #F3EDE5;
  
  /* RGBA variants */
  --overlay-dark-4: rgba(0,0,0,0.04);
  --overlay-dark-5: rgba(0,0,0,0.05);
  --overlay-dark-6: rgba(0,0,0,0.06);
  --overlay-dark-8: rgba(0,0,0,0.08);
  --overlay-dark-10: rgba(0,0,0,0.10);
  --overlay-dark-12: rgba(0,0,0,0.12);
  --overlay-dark-15: rgba(0,0,0,0.15);
  --overlay-dark-16: rgba(0,0,0,0.16);
  --overlay-dark-20: rgb(0 0 0 / 0.1);
  --overlay-dark-45: rgba(0,0,0,0.45);
  --overlay-dark-60: rgba(0,0,0,0.6);
  --overlay-dark-80: rgba(0,0,0,0.8);
  
  --overlay-white-15: rgba(255,255,255,0.15);
  --overlay-white-85: rgba(255,255,255,0.85);
  --overlay-white-90: rgba(255,255,255,0.9);
  
  --primary-alpha-6: rgba(31,122,99,0.06);
  --primary-alpha-8: rgba(31,122,92,0.08);
  --primary-alpha-12: rgba(31,122,92,0.12);
  --primary-alpha-18: rgba(31,122,92,0.18);
  --primary-alpha-20: rgba(22, 163, 74, 0.20);
  --primary-alpha-22: rgba(31,122,92,0.22);
  --primary-alpha-22-alt: rgba(31, 122, 92, 0.22);
  --primary-alpha-25: rgba(31,122,92,0.25);
  --primary-alpha-25-alt: rgba(139,195,74,0.25);
  --primary-alpha-25-alt2: rgba(22,163,74,0.25);
  --primary-alpha-30: rgba(46,125,50,0.3);
  --primary-alpha-35: rgba(31,122,92,0.35);
  --primary-alpha-40: rgba(31,122,92,0.40);
  
  --error-alpha-80: rgba(239,68,68,0.8);
`;

const indexCssPath = 'src/styles/index.css';
let css = fs.readFileSync(indexCssPath, 'utf8');
if (!css.includes('--text-black')) {
  css = css.replace(':root {', ':root {\n' + cssVars);
  fs.writeFileSync(indexCssPath, css);
}

const colorMap = {
  '#000000': 'var(--text-black)',
  '#111827': 'var(--text-dark)',
  '#1A1816': 'var(--text-dark)',
  '#1F2933': 'var(--text-dark)',
  '#525252': 'var(--text-gray-dark)',
  '#555': 'var(--text-gray-dark)',
  '#757575': 'var(--text-gray)',
  '#737373': 'var(--text-gray)',
  '#888': 'var(--text-gray)',
  '#888888': 'var(--text-gray)',
  '#999': 'var(--text-gray-light)',
  '#9CA3AF': 'var(--text-gray-light)',
  '#9E9E9E': 'var(--text-gray-light)',
  '#AAAAAA': 'var(--text-gray-lighter)',
  '#ccc': 'var(--border-muted)',
  '#D0D0D0': 'var(--border-muted)',
  '#E5E7EB': 'var(--bg-gray)',
  '#F5F5F5': 'var(--bg-muted)',
  '#F9F7F2': 'var(--bg-offwhite)',
  '#E5DFD4': 'var(--bg-muted-dark)',

  '#1E90FF': 'var(--info-color)',
  '#B2D8FF': 'var(--info-color-light)',
  '#E6F2FF': 'var(--info-color-bg)',

  '#F85B01': 'var(--warning-color)',
  '#E76F26': 'var(--warning-color-alt)',
  '#E05000': 'var(--warning-color-alt2)',
  '#FFD4B2': 'var(--warning-color-light)',
  '#FFF4EC': 'var(--warning-color-bg)',

  '#22A06B': 'var(--success-color)',
  '#4CAF50': 'var(--success-color-alt)',
  '#B2FFD4': 'var(--success-color-light)',
  '#E6FFF2': 'var(--success-color-bg)',
  '#195f4e': 'var(--success-color-dark)',
  '#145a47': 'var(--success-color-darker)',

  '#EF4444': 'var(--error-color)',
  '#DC2626': 'var(--error-color-alt3)',
  '#EF1F24': 'var(--error-color-alt)',
  '#EF5350': 'var(--error-color-alt2)',
  '#FF5A5F': 'var(--error-color-alt4)',
  '#FFB2B2': 'var(--error-color-light)',

  '#A259D9': 'var(--accent-purple)',
  '#E2B2FF': 'var(--accent-purple-light)',
  '#F5B700': 'var(--accent-yellow)',
  '#FFF7B2': 'var(--accent-yellow-light)',

  '#1F7A63': 'var(--accent-green-dark)',
  '#1B5E20': 'var(--accent-green-alt)',
  '#1B3B1E': 'var(--accent-green-alt2)',
  '#C8E6C9': 'var(--accent-green-light)',
  '#E8F5E9': 'var(--border-color-subtle)', // reusing existing

  '#322822': 'var(--color-brown-dark)',
  '#6B5E57': 'var(--color-brown-light)',
  '#D9D1C3': 'var(--color-beige)',
  '#F3EDE5': 'var(--color-beige-light)',

  'rgb(0 0 0 / 0.1)': 'var(--overlay-dark-20)',
  'rgba(0,0,0,0.04)': 'var(--overlay-dark-4)',
  'rgba(0,0,0,0.05)': 'var(--overlay-dark-5)',
  'rgba(0,0,0,0.06)': 'var(--overlay-dark-6)',
  'rgba(0,0,0,0.08)': 'var(--overlay-dark-8)',
  'rgba(0,0,0,0.10)': 'var(--overlay-dark-10)',
  'rgba(0,0,0,0.12)': 'var(--overlay-dark-12)',
  'rgba(0,0,0,0.15)': 'var(--overlay-dark-15)',
  'rgba(0,0,0,0.16)': 'var(--overlay-dark-16)',
  'rgba(0,0,0,0.45)': 'var(--overlay-dark-45)',
  'rgba(0,0,0,0.6)': 'var(--overlay-dark-60)',
  'rgba(0,0,0,0.8)': 'var(--overlay-dark-80)',

  'rgba(255,255,255,0.15)': 'var(--overlay-white-15)',
  'rgba(255,255,255,0.85)': 'var(--overlay-white-85)',
  'rgba(255,255,255,0.9)': 'var(--overlay-white-90)',

  'rgba(31,122,99,0.06)': 'var(--primary-alpha-6)',
  'rgba(31,122,92,0.08)': 'var(--primary-alpha-8)',
  'rgba(31,122,92,0.12)': 'var(--primary-alpha-12)',
  'rgba(31,122,92,0.18)': 'var(--primary-alpha-18)',
  'rgba(22, 163, 74, 0.20)': 'var(--primary-alpha-20)',
  'rgba(31,122,92,0.22)': 'var(--primary-alpha-22)',
  'rgba(31, 122, 92, 0.22)': 'var(--primary-alpha-22-alt)',
  'rgba(31,122,92,0.25)': 'var(--primary-alpha-25)',
  'rgba(139,195,74,0.25)': 'var(--primary-alpha-25-alt)',
  'rgba(22,163,74,0.25)': 'var(--primary-alpha-25-alt2)',
  'rgba(46,125,50,0.3)': 'var(--primary-alpha-30)',
  'rgba(31,122,92,0.35)': 'var(--primary-alpha-35)',
  'rgba(31,122,92,0.40)': 'var(--primary-alpha-40)',

  'rgba(239,68,68,0.8)': 'var(--error-alpha-80)',
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx|ts)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [color, variable] of Object.entries(colorMap)) {
        // Build regex. If hex, don't match if it continues with hex letters.
        // If rgba, match exactly.
        let regex;
        if (color.startsWith('#')) {
          regex = new RegExp(escapeRegExp(color) + '(?![a-zA-Z0-9])', 'gi');
        } else {
          // Normalize spaces in rgba for matching
          const cleanColor = escapeRegExp(color).replace(/ /g, '\\s*');
          regex = new RegExp(cleanColor, 'gi');
        }
        
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
console.log('Done replacing all remaining colors.');
