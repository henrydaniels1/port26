'use client';

import { useCallback, useRef } from 'react';
import type { MouseEvent } from 'react';
import '../styles/ViewProjectsButton.css';

interface ViewProjectsButtonProps {
  /** Button text — also used for the duplicated roll track. */
  label?: string;
  /** Where the button navigates. */
  href?: string;
  className?: string;
}

export function ViewProjectsButton({
  label = 'View Projects',
  href = '#projects',
  className = '',
}: ViewProjectsButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  /**
   * Feeds the pointer position into CSS custom properties so the spotlight
   * follows the cursor. Writing straight to the element style keeps this
   * off the React render path, so the animation stays at frame rate.
   */
  const handlePointerMove = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--vp-mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--vp-my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`vp-btn ${className}`.trim()}
      onMouseMove={handlePointerMove}>
      <span className='vp-btn__spot' aria-hidden='true' />

      <span className='vp-btn__label'>
        <span className='vp-btn__roll'>
          <span>{label}</span>
          <span aria-hidden='true'>{label}</span>
        </span>
      </span>

      <span className='vp-btn__icon' aria-hidden='true'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.25'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M5 12h13' />
          <path d='m12 6 6 6-6 6' />
        </svg>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.25'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path d='M5 12h13' />
          <path d='m12 6 6 6-6 6' />
        </svg>
      </span>
    </a>
  );
}
