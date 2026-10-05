'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedSquares } from './AnimatedSquares';
import { TypeWriter } from './TypeWriter';
import { ViewProjectsButton } from './ViewProjectsButton';
import '../styles/Hero.css';

interface HeroProps {
  name?: string;
  subtitle?: string;
}

export function Hero({ 
  name = 'EZENWA HENRY-DANIEL', 
  subtitle = 'FullStack Web Developer',
}: HeroProps) {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, 150]);
  const scale2 = useTransform(scrollY, [0, 500], [1, 1.5]);

  return (
    <section className="hero bg-black flex items-center justify-center h-screen">
      <motion.div
        className="hero-background-layer"
        style={{ y: y2, scale: scale2 }}>
        <AnimatedSquares />
      </motion.div>
      

      <div className="hero-content flex flex-col gap-8">
        <div className=''>
           <motion.div
          className="hero-text-container "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <TypeWriter
            text={name}
            speed={100}
            deleteSpeed={50}
            pauseFor={1500}
            loop={true}
            className="big-shoulders-inline-bold"
          />
        </motion.div>

        <motion.p
          className="hero-subtitle text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}>
          {subtitle}
        </motion.p>
        </div>
       

        <motion.div
          className="relative z-20 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ y: y2, scale: scale2 }}>
          <ViewProjectsButton href="#projects" />
        </motion.div>
      </div>

    </section>
  );
}
