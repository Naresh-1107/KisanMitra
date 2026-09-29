import React from 'react';
import { Heart, Compass, Leaf, Users, ShieldCheck, SunMedium, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Card3D } from './Card3D';
import { Scroll3DGridItem } from './Scroll3DGrid';

interface UHVCellSectionProps {
  language: SupportedLanguage;
}

export const UHVCellSection: React.FC<UHVCellSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const principles = [
    {
      icon: Compass,
      color: 'violet' as const,
      tag: 'Gyan & Darshan',
      title: t.uhvPrinciple1Title,
      description: t.uhvPrinciple1Desc,
      dimension: 'Individual & Intellectual Dimension',
    },
    {
      icon: Leaf,
      color: 'emerald' as const,
      tag: 'Sah-Astitva',
      title: t.uhvPrinciple2Title,
      description: t.uhvPrinciple2Desc,
      dimension: 'Ecological & Environmental Harmony',
    },
    {
      icon: Users,
      color: 'amber' as const,
      tag: 'Parasparikta',
      title: t.uhvPrinciple3Title,
      description: t.uhvPrinciple3Desc,
      dimension: 'Social & Societal Fulfillment',
    },
    {
      icon: Heart,
      color: 'emerald' as const,
      tag: 'Mulya-Nishtha',
      title: t.uhvPrinciple4Title,
      description: t.uhvPrinciple4Desc,
      dimension: 'Human Values & Ethical Governance',
    },
  ];

  return (
    <section
      id="uhv-section"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-600/10 via-amber-600/10 to-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-semibold text-amber-300 synapse-glow">
          <SunMedium className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.uhvBadge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {t.uhvTitle}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300">
            {t.uhvTitleSpan}
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {t.uhvSubtitle}
        </p>
      </div>

      {/* 4 UHV Pillars Cards with 3D Scroll Rearrangement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <Scroll3DGridItem key={idx} index={idx} total={4}>
              <Card3D
                depth={20}
                glowColor={p.color}
                className="p-7 flex flex-col justify-between space-y-6 h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300">
                      {p.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                      {p.dimension}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-500/15 flex items-center gap-2 text-xs text-emerald-400 font-medium font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>UHV Cell Ethical Benchmark Verified</span>
                </div>
              </Card3D>
            </Scroll3DGridItem>
          );
        })}
      </div>

      {/* Co-existence & Agricultural Harmony Callout */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl synapse-glass border border-emerald-500/25 bg-gradient-to-r from-emerald-950/40 via-slate-950/60 to-violet-950/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Universal Human Values in Practice</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            Cultivating Right Understanding for Every Indian Farmer
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Technology is truly meaningful when it serves human well-being and natural harmony. KisanMitra ensures no farmer remains uninformed, neglected, or dependent on intermediaries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-center font-mono">
            <span className="text-lg font-bold text-emerald-400 block">100%</span>
            <span className="text-[10px] text-slate-400 uppercase">Transparent</span>
          </div>
          <div className="px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center font-mono">
            <span className="text-lg font-bold text-amber-400 block">Zero</span>
            <span className="text-[10px] text-slate-400 uppercase">Middlemen</span>
          </div>
          <div className="px-4 py-3 rounded-xl bg-slate-900 border border-violet-500/30 text-center font-mono">
            <span className="text-lg font-bold text-violet-400 block">Dignity</span>
            <span className="text-[10px] text-slate-400 uppercase">First</span>
          </div>
        </div>
      </div>
    </section>
  );
};
