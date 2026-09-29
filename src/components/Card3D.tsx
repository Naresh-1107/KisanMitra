import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: 'emerald' | 'violet' | 'amber';
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  depth = 20,
  glowColor = 'emerald',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const glowBorder =
    glowColor === 'violet'
      ? 'border-violet-500/30 hover:border-violet-400/60 shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)]'
      : glowColor === 'amber'
      ? 'border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]'
      : 'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]';

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className={`transition-transform duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${depth}px) scale(1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative overflow-hidden rounded-2xl synapse-glass transition-colors ${glowBorder} ${className}`}
      >
        {/* Specular Glare Overlay */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.15), transparent)`,
            }}
          />
        )}
        <div style={{ transform: 'translateZ(10px)' }}>{children}</div>
      </div>
    </div>
  );
};
