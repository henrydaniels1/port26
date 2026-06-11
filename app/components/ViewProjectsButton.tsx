'use client';

import './ViewProjectsButton.css';

const LETTERS = ['V','I','E','W',' ','P','R','O','J','E','C','T','S'];

export function ViewProjectsButton() {
  return (
    <button className="btn-view-projects">
      <span className="btn-original">View Projects</span>
      <span className="btn-letters" aria-hidden="true">
        {LETTERS.map((l, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            {l === ' ' ? '\u00A0' : l}
          </span>
        ))}
      </span>
    </button>
  );
}
