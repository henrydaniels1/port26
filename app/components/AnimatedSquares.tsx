'use client';

import '../styles/AnimatedSquares.css';

export function AnimatedSquares() {
  return (
    <div className="squares-container">
      <div className="squares-wrapper">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`square square-${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
