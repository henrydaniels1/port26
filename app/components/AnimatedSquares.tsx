'use client';

import '../styles/AnimatedSquares.css';

/* --- Inline SVG icons shown inside a few of the floating squares.
       Feather/lucide style (stroke = currentColor) to match the rest of the UI. --- */

function AngleBracketsIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='m16 18 6-6-6-6' />
      <path d='m8 6-6 6 6 6' />
    </svg>
  );
}

function BracesIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1' />
      <path d='M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <circle cx='12' cy='12' r='10' />
      <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
      <path d='M2 12h20' />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <ellipse cx='12' cy='5' rx='9' ry='3' />
      <path d='M3 5v14a9 3 0 0 0 18 0V5' />
      <path d='M3 12a9 3 0 0 0 18 0' />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <rect width='20' height='8' x='2' y='2' rx='2' ry='2' />
      <rect width='20' height='8' x='2' y='14' rx='2' ry='2' />
      <line x1='6' x2='6.01' y1='6' y2='6' />
      <line x1='6' x2='6.01' y1='18' y2='18' />
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <rect width='16' height='16' x='4' y='4' rx='2' />
      <rect width='6' height='6' x='9' y='9' />
      <path d='M9 1v3' /><path d='M15 1v3' />
      <path d='M9 20v3' /><path d='M15 20v3' />
      <path d='M20 9h3' /><path d='M20 15h3' />
      <path d='M1 9h3' /><path d='M1 15h3' />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <polyline points='4 17 10 11 4 5' />
      <line x1='12' x2='20' y1='19' y2='19' />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <line x1='6' x2='6' y1='3' y2='15' />
      <circle cx='18' cy='6' r='3' />
      <circle cx='6' cy='18' r='3' />
      <path d='M18 9a9 9 0 0 1-9 9' />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'
      strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
      <path d='m3.3 7 8.7 5 8.7-5' />
      <path d='M12 22V12' />
    </svg>
  );
}

export function AnimatedSquares() {
  return (
    <div className="squares-container">
      <div className="squares-wrapper">
        <div className="icon-square icon-square-1"><AngleBracketsIcon /></div>
        <div className="icon-square icon-square-2"><BracesIcon /></div>
        <div className="icon-square icon-square-3"><CloudIcon /></div>
        <div className="icon-square icon-square-4"><GlobeIcon /></div>
        <div className="icon-square icon-square-5"><DatabaseIcon /></div>
        <div className="icon-square icon-square-6"><ServerIcon /></div>
        <div className="icon-square icon-square-7"><CpuIcon /></div>
        <div className="icon-square icon-square-8"><TerminalIcon /></div>
        <div className="icon-square icon-square-9"><GitBranchIcon /></div>
        <div className="icon-square icon-square-10"><BoxIcon /></div>
      </div>
    </div>
  );
}
