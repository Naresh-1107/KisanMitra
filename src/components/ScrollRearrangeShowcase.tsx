import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Check, AlertTriangle, ArrowRight, HelpCircle, Layers, Orbit, Grid3X3, Sparkles, Sliders, Play, Maximize2 } from 'lucide-react';
import { SchemeMatchResult, Scheme, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getLocalizedSchemeData } from '../data/schemeTranslations';
import { Card3D } from './Card3D';

interface ScrollRearrangeShowcaseProps {
  results: SchemeMatchResult[];
  language?: SupportedLanguage;
  onOpenWhy: (scheme: Scheme, match: SchemeMatchResult) => void;
  onOpenPathway: () => void;
  onOpenRequirements: (scheme: Scheme) => void;
}

export const ScrollRearrangeShowcase: React.FC<ScrollRearrangeShowcaseProps> = ({
  results,
  language = 'en',
  onOpenWhy,
  onOpenPathway,
  onOpenRequirements,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactiveMode, setInteractiveMode] = useState<'scroll' | 'manual'>('scroll');
  const [manualProgress, setManualProgress] = useState(0.5);
  const [activeStageIndex, setActiveStageIndex] = useState(1);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Track scroll position through the tall 250vh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (interactiveMode === 'scroll') {
      const unsub = smoothScrollProgress.on('change', v => {
        const clamped = Math.min(Math.max(v, 0), 1);
        setCurrentProgress(clamped);
        if (clamped < 0.35) setActiveStageIndex(0);
        else if (clamped < 0.72) setActiveStageIndex(1);
        else setActiveStageIndex(2);
      });
      return () => unsub();
    } else {
      setCurrentProgress(manualProgress);
    }
  }, [interactiveMode, manualProgress, smoothScrollProgress]);

  // Focus on top 6 matched schemes
  const topSchemes = results.slice(0, 6);

  // Compute exact 3D spatial coordinate for each card based on continuous progress (0.0 -> 1.0)
  // Stage 0 (0.0 - 0.35): Deep 3D Fanned Stack / Angled Deck
  // Stage 1 (0.35 - 0.72): 3D Orbital Swirl & Cylindrical Helix
  // Stage 2 (0.72 - 1.0): 3D Aligned Matrix / Final Comparison Grid
  const get3DTransform = (index: number, progress: number) => {
    const total = topSchemes.length;
    const centerOffset = index - (total - 1) / 2;

    if (progress < 0.35) {
      // Phase 1: Deep 3D Fanned Deck Stack
      // Cards overlap in deep 3D perspective, angled on X & Y axes
      const localProg = progress / 0.35; // 0 -> 1
      const x = centerOffset * (70 - localProg * 25);
      const y = centerOffset * (14 - localProg * 10);
      const z = -Math.abs(centerOffset) * (85 - localProg * 35) + 30;
      const rotY = centerOffset * (15 - localProg * 8);
      const rotX = 24 - localProg * 10;
      const rotZ = centerOffset * (-4 + localProg * 2);
      const scale = 0.9 + (1 - Math.abs(centerOffset) * 0.08) * 0.12;

      return {
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
        zIndex: Math.round(total - Math.abs(centerOffset) * 2 + 10),
        opacity: 0.88 + (1 - Math.abs(centerOffset) * 0.1) * 0.12,
      };
    } else if (progress < 0.72) {
      // Phase 2: 3D Orbital Swirl Helix
      // Cards fan out into a cylindrical 3D circle with glowing orbital dynamic
      const localProg = (progress - 0.35) / (0.72 - 0.35); // 0 -> 1
      const angle = (index / total) * Math.PI * 1.8 - Math.PI * 0.9;
      const radius = 320 + Math.sin(localProg * Math.PI) * 40;
      const x = Math.sin(angle + localProg * 0.5) * radius;
      const z = Math.cos(angle + localProg * 0.5) * (radius * 0.75) - 120;
      const y = Math.sin(index * 1.5 + localProg * 2) * 35;
      const rotY = (-angle * 180) / Math.PI + (localProg - 0.5) * 20;
      const rotX = 8 * Math.cos(angle);
      const scale = 0.94 + (z > 0 ? 0.08 : -0.05);

      return {
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`,
        zIndex: Math.round(z + 400),
        opacity: 0.92 + (z > 0 ? 0.08 : 0),
      };
    } else {
      // Phase 3: Smooth snap into 3D Aligned Matrix
      // Cards lock into clean 3D grid layout
      const localProg = (progress - 0.72) / (1 - 0.72); // 0 -> 1
      const col = index % 3;
      const row = Math.floor(index / 3);

      const gridTargetX = (col - 1) * 360;
      const gridTargetY = (row - 0.5) * 310;
      const rotX = (1 - localProg) * 6;
      const rotY = (1 - localProg) * (col - 1) * 8;
      const z = (1 - localProg) * -50;
      const scale = 0.98 + localProg * 0.02;

      return {
        transform: `translate3d(${gridTargetX}px, ${gridTargetY}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
        zIndex: 20 + index,
        opacity: 1,
      };
    }
  };

  const setStage = (stageIdx: number) => {
    setActiveStageIndex(stageIdx);
    setInteractiveMode('manual');
    if (stageIdx === 0) setManualProgress(0.12);
    else if (stageIdx === 1) setManualProgress(0.52);
    else setManualProgress(0.96);
  };

  return (
    <section
      ref={containerRef}
      id="schemes-3d-rearrange"
      className="relative min-h-[250vh]"
    >
      {/* Pinned Viewport Container (Sticky to viewport while user scrolls through the 250vh track) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
        
        {/* Ambient 3D Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-violet-600/20 via-emerald-600/20 to-teal-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Section Header & HUD */}
        <div className="text-center max-w-4xl mx-auto space-y-3 shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-violet-500/30 text-xs font-semibold text-violet-300 backdrop-blur-md synapse-glow">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">{t.rearrangeBadge}</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-mono font-bold">SCROLLTIDE SYNAPSE 3D</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.rearrangeTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-teal-300 to-emerald-300">
              {t.rearrangeTitleSpan}
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto line-clamp-2">
            {t.rearrangeSubtitle}
          </p>

          {/* 3D Motion Stage Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              onClick={() => {
                setInteractiveMode('scroll');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold font-mono transition-all ${
                interactiveMode === 'scroll'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25'
                  : 'bg-slate-900/80 text-slate-300 border border-emerald-500/20 hover:text-white'
              }`}
            >
              <span>{t.rearrangeAutoScroll} ({Math.round(currentProgress * 100)}%)</span>
            </button>

            <button
              onClick={() => setStage(0)}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold font-mono transition-all ${
                interactiveMode === 'manual' && activeStageIndex === 0
                  ? 'bg-violet-400 text-slate-950 shadow-md shadow-violet-500/25'
                  : 'bg-slate-900/80 text-slate-300 border border-violet-500/20 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>01 · {t.rearrangeFannedStack}</span>
            </button>

            <button
              onClick={() => setStage(1)}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold font-mono transition-all ${
                interactiveMode === 'manual' && activeStageIndex === 1
                  ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-500/25'
                  : 'bg-slate-900/80 text-slate-300 border border-teal-500/20 hover:text-white'
              }`}
            >
              <Orbit className="w-3 h-3" />
              <span>02 · {t.rearrangeOrbital}</span>
            </button>

            <button
              onClick={() => setStage(2)}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold font-mono transition-all ${
                interactiveMode === 'manual' && activeStageIndex === 2
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25'
                  : 'bg-slate-900/80 text-slate-300 border border-emerald-500/20 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3 h-3" />
              <span>03 · {t.rearrangeAlignedGrid}</span>
            </button>
          </div>
        </div>

        {/* 3D Kinetic Stage (Perspective Viewport) */}
        <div
          className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2"
          style={{
            perspective: '1400px',
            perspectiveOrigin: '50% 48%',
            transformStyle: 'preserve-3d',
          }}
        >
          {topSchemes.map((match, idx) => {
            const s = match.scheme;
            const style3D = get3DTransform(idx, currentProgress);
            const isMatch = match.status === 'POTENTIALLY RELEVANT';
            const loc = getLocalizedSchemeData(s, language);

            return (
              <div
                key={s.id}
                style={{
                  ...style3D,
                  position: 'absolute',
                  width: '330px',
                  transition: interactiveMode === 'manual' 
                    ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease' 
                    : 'transform 0.06s ease-out, opacity 0.15s ease',
                  transformStyle: 'preserve-3d',
                }}
                className="transform-gpu cursor-pointer"
                onClick={() => onOpenWhy(s, match)}
              >
                <Card3D
                  depth={24}
                  glowColor={isMatch ? 'emerald' : 'amber'}
                  className="p-5 flex flex-col justify-between border-emerald-500/25 hover:border-emerald-400/80 shadow-2xl bg-[#06120e]/95 backdrop-blur-2xl transition-all"
                  onClick={() => onOpenWhy(s, match)}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-violet-400 tracking-wider uppercase font-mono">
                          {loc.category} · {s.code}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                          {loc.name}
                        </h3>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                          isMatch
                            ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/40'
                            : 'text-amber-300 bg-amber-950/80 border border-amber-500/40'
                        }`}
                      >
                        {isMatch
                          ? language === 'ta'
                            ? 'பொருந்தும்'
                            : language === 'hi'
                            ? 'अनुकूल'
                            : 'RELEVANT'
                          : language === 'ta'
                          ? 'சரிபார்ப்பு'
                          : language === 'hi'
                          ? 'सत्यापन'
                          : 'CHECK REQ'}
                      </span>
                    </div>

                    {/* Benefit value badge */}
                    <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-emerald-500/20 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">{t.rearrangeAssistanceValue}</span>
                      <span className="font-bold text-emerald-300 font-mono text-[11px]">
                        {loc.benefitAmount}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                      {loc.shortExplanation}
                    </p>

                    {/* Key Factors */}
                    <div className="space-y-1 text-[11px]">
                      {loc.matchedFactors.slice(0, 1).map((factor, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-emerald-300/90">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="truncate">{factor}</span>
                        </div>
                      ))}
                      {loc.needsAttentionFactors.slice(0, 1).map((attn, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-1.5 text-amber-300/90">
                          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span className="truncate">{attn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-3 mt-3 border-t border-emerald-500/15 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhy(s, match);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-semibold text-violet-300 bg-violet-950/50 hover:bg-violet-900/60 border border-violet-500/30 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{t.rearrangeWhyBtn}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRequirements(s);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
                    >
                      <span>{t.rearrangeActionStepsBtn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned HUD & Scrubber Bar */}
        <div className="max-w-xl mx-auto w-full space-y-2 pt-2 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <Sliders className="w-3 h-3" />
              <span>3D CHOREOGRAPHY PROGRESS</span>
            </span>
            <span>{Math.round(currentProgress * 100)}%</span>
          </div>

          {/* Interactive Range Scrubber */}
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={currentProgress}
              onChange={e => {
                setInteractiveMode('manual');
                setManualProgress(parseFloat(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>STAGE 01 · FANNED STACK</span>
            <span>STAGE 02 · ORBITAL HELIX</span>
            <span>STAGE 03 · MATRIX LOCK</span>
          </div>
        </div>

      </div>
    </section>
  );
};
