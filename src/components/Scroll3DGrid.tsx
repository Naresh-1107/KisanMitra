import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Scroll3DGridItemProps {
  children: React.ReactNode;
  index: number;
  total?: number;
  className?: string;
  onClick?: () => void;
}

export const Scroll3DGridItem: React.FC<Scroll3DGridItemProps> = ({
  children,
  index,
  total = 4,
  className = '',
  onClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate whether this item is on the left or right side of grid
  const isLeft = index % 2 === 0;
  const colFactor = isLeft ? -1 : 1;

  // Stagger factor based on row index
  const rowFactor = Math.floor(index / 2) * 0.08;

  // 3D Rotation Y: Left items start angled inward (+8deg), right items (-8deg), straightening to 0
  const rawRotateY = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.75, 1],
    [colFactor * 14, colFactor * 4, 0, -colFactor * 3, -colFactor * 10]
  );
  const rotateY = useSpring(rawRotateY, { stiffness: 90, damping: 20 });

  // 3D Rotation X: Tilts back on approach, straightens in view
  const rawRotateX = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.75, 1],
    [10, 3, 0, -3, -8]
  );
  const rotateX = useSpring(rawRotateX, { stiffness: 90, damping: 20 });

  // X Translation: Rearranges inward into column position as you scroll
  const rawX = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.75, 1],
    [colFactor * 35, colFactor * 8, 0, -colFactor * 6, -colFactor * 25]
  );
  const x = useSpring(rawX, { stiffness: 90, damping: 22 });

  // Y Translation: Slides up into place
  const rawY = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.8, 1],
    [40, 10, 0, -8, -30]
  );
  const y = useSpring(rawY, { stiffness: 95, damping: 22 });

  // Scale: zooms subtly into 1.0
  const rawScale = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.8, 1],
    [0.94, 0.98, 1, 0.98, 0.95]
  );
  const scale = useSpring(rawScale, { stiffness: 100, damping: 24 });

  // Depth Z: pushes outward in 3D
  const rawZ = useTransform(
    smoothProgress,
    [0, 0.35 + rowFactor, 0.5, 0.8, 1],
    [-45, -10, 0, -10, -35]
  );
  const z = useSpring(rawZ, { stiffness: 90, damping: 22 });

  return (
    <div
      ref={itemRef}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className={`h-full ${className}`}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateY,
          rotateX,
          x,
          y,
          z,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
