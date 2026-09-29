import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Scroll3DSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  depth?: number;
  rearrangeStyle?: 'perspective' | 'fold' | 'helix' | 'fanned';
}

export const Scroll3DSection: React.FC<Scroll3DSectionProps> = ({
  children,
  className = '',
  id,
  depth = 30,
  rearrangeStyle = 'perspective',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth out progress with physical spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Calculate 3D transforms based on scroll position
  // 0.0 = section just entered bottom of screen
  // 0.5 = section is centered in viewport (aligned, crystal sharp)
  // 1.0 = section is leaving top of screen

  // 1. Perspective Tilt (rotateX): tilts back on entry, straightens in center, tilts forward on exit
  const rawRotateX = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [depth * 0.45, depth * 0.15, 0, -depth * 0.15, -depth * 0.35]
  );
  const rotateX = useSpring(rawRotateX, { stiffness: 90, damping: 20 });

  // 2. Scale: subtly scales up to 1.0 in focus, slightly compacts on edges
  const rawScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.93, 0.98, 1, 0.98, 0.94]
  );
  const scale = useSpring(rawScale, { stiffness: 100, damping: 22 });

  // 3. Y Translation: smoothly slides into place as you scroll
  const rawY = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.8, 1],
    [50, 15, 0, -15, -45]
  );
  const y = useSpring(rawY, { stiffness: 95, damping: 22 });

  // 4. Z translation (Depth): pushes back into z-space when out of center
  const rawZ = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [-80, -20, 0, -25, -70]
  );
  const z = useSpring(rawZ, { stiffness: 90, damping: 22 });

  // 5. Opacity: smooth atmospheric fade on extremes
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.65, 1, 1, 0.7]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative ${className}`}
      style={{
        perspective: '1300px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          z,
          opacity,
          transformStyle: 'preserve-3d',
          transformOrigin: '50% 50%',
        }}
        className="w-full transform-gpu transition-shadow duration-300"
      >
        {children}
      </motion.div>
    </div>
  );
};
