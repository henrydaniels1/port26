'use client';

import { useEffect, useRef } from 'react';

import './TypeWriter.css';

interface TypeWriterProps {
  text: string;
  speed?: number;
  deleteSpeed?: number;
  pauseFor?: number;
  loop?: boolean;
  className?: string;
}

export function TypeWriter({ 
  text, 
  speed = 100, 
  deleteSpeed = 50,
  pauseFor = 1500,
  loop = true,
  className = '',
}: TypeWriterProps) {
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const TypewriterLib = require('typewriter-effect/dist/core');
      const TypewriterClass = TypewriterLib.default ?? TypewriterLib;
      const typewriter = new TypewriterClass(typewriterRef.current, {
        loop,
        cursor: '_',
        delay: speed,
        deleteSpeed,
      });

      typewriter.typeString(text).pauseFor(pauseFor).deleteAll(deleteSpeed).start();

      return () => {
        typewriter.stop();
      };
    }
  }, [text, speed, deleteSpeed, pauseFor, loop]);

  return (
    <div className={`typewriter-container ${className}`}>
      <div className="typewriter-wrapper" ref={typewriterRef} />
    </div>
  );
}
