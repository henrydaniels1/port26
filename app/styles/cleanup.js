import fs from 'fs';
const path = 'c:/Users/HENRY-DANIEL/Desktop/HENRY/Projects/Personal/sample/NewPort/my-portfolio/app/styles/About.css';
let c = fs.readFileSync(path, 'utf8');

// Remove duplicate content
c = c.replace(/letter-spacing: 0\.02em;\s*text-transform: uppercase;\s*color: var\(--foreground\);\s*\n}/g, '');
c = c.replace(/\.about-card__lede \{\s*margin: 0;\s*font-size: 0\.92rem;\s*line-height: 1\.7;\s*color: var\(--text-muted\);\s*\n}/g, '');
c = c.replace(/\.about-card__bullets \{\s*margin: 0;\s*padding-left: 1\.1rem;\s*display: flex;\s*flex-direction: column;\s*gap: 0\.6rem;\s*\n}/g, '');
c = c.replace(/\.about-card__bullets li \{\s*font-size: 0\.88rem;\s*line-height: 1\.65;\s*color: var\(--text-muted\);\s*position: relative;\s*padding-left: 0\.9rem;\s*\n}/g, '');
c = c.replace(/\.about-card__bullets li::before \{\s*content: ".*?";\s*position: absolute;\s*left: 0;\s*color: var\(--accent-strong\);\s*font-weight: 700;\s*\n}/g, '');
c = c.replace(/\.about-hero__actions \{\s*display: flex;\s*flex-wrap: wrap;\s*align-items: center;\s*gap: 1rem;\s*\n}/g, '');

fs.writeFileSync(path, c, 'utf8');
console.log('Cleaned. Lines:', c.split('\n').length);
