import React, { useState } from 'react';
import { Check, AlertTriangle, ExternalLink, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SchemeMatchResult, MatchStatus, Scheme, SupportedLanguage } from '../types';
import { Card3D } from './Card3D';
import { TRANSLATIONS } from '../data/translations';
import { getLocalizedSchemeData } from '../data/schemeTranslations';
import { Scroll3DGridItem } from './Scroll3DGrid';

interface SchemeCardsViewProps {
  results: SchemeMatchResult[];
  language?: SupportedLanguage;
  onOpenWhy: (scheme: Scheme, result: SchemeMatchResult) => void;
  onOpenPathway: () => void;
  onOpenRequirements: (scheme: Scheme) => void;
}

export const SchemeCardsView: React.FC<SchemeCardsViewProps> = ({
  results,
  language = 'en',
  onOpenWhy,
  onOpenPathway,
  onOpenRequirements,
}) => {
  const [filter, setFilter] = useState<'ALL' | MatchStatus>('ALL');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const filteredResults = filter === 'ALL'
    ? results
    : results.filter(r => r.status === filter);

  const getStatusBadge = (status: MatchStatus) => {
    switch (status) {
      case 'POTENTIALLY RELEVANT':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {language === 'ta' ? 'பொருந்தக்கூடியது' : language === 'hi' ? 'संभावित अनुकूल' : 'Potentially Relevant'}
            </span>
          </span>
        );
      case 'NEEDS VERIFICATION':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              {language === 'ta' ? 'சரிபார்ப்பு தேவை' : language === 'hi' ? 'सत्यापन आवश्यक' : 'Needs Verification'}
            </span>
          </span>
        );
      case 'DOES NOT MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>
              {language === 'ta' ? 'தற்போது பொருந்தாதவை' : language === 'hi' ? 'अनुपयुक्त' : "Doesn't Match"}
            </span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-emerald-500/15">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
            {t.schemesStage}
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {t.schemesTitle}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            {t.schemesSubtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-emerald-500/20 text-xs self-start md:self-auto overflow-x-auto max-w-full font-mono">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              filter === 'ALL'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.schemesFilterAll} ({results.length})
          </button>
          <button
            onClick={() => setFilter('POTENTIALLY RELEVANT')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              filter === 'POTENTIALLY RELEVANT'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.schemesFilterRelevant} ({results.filter(r => r.status === 'POTENTIALLY RELEVANT').length})
          </button>
          <button
            onClick={() => setFilter('NEEDS VERIFICATION')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              filter === 'NEEDS VERIFICATION'
                ? 'bg-amber-500/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.schemesFilterVerification} ({results.filter(r => r.status === 'NEEDS VERIFICATION').length})
          </button>
          <button
            onClick={() => setFilter('DOES NOT MATCH')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
              filter === 'DOES NOT MATCH'
                ? 'bg-slate-700/40 text-slate-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.schemesFilterNotMatch} ({results.filter(r => r.status === 'DOES NOT MATCH').length})
          </button>
        </div>
      </div>

      {/* Scheme Cards Grid with 3D Scroll Rearrangement & Touch Popup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((match, idx) => {
          const s = match.scheme;
          const isMatch = match.status === 'POTENTIALLY RELEVANT';
          const isPending = match.status === 'NEEDS VERIFICATION';
          const loc = getLocalizedSchemeData(s, language);

          return (
            <Scroll3DGridItem key={s.id} index={idx} total={filteredResults.length}>
              <Card3D
                depth={20}
                glowColor={isMatch ? 'emerald' : isPending ? 'amber' : 'violet'}
                className="p-6 flex flex-col justify-between space-y-6 cursor-pointer shadow-lg bg-[#07130f]/90 h-full"
                onClick={() => onOpenWhy(s, match)}
              >
              {/* Card Header: Metadata + Status */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium font-mono">
                      <span>{loc.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{s.code}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                        UHV Aligned
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {loc.name}
                    </h3>
                  </div>

                  {getStatusBadge(match.status)}
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/15 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {language === 'ta' ? 'உதவி / ஆதரவு மதிப்பு' : language === 'hi' ? 'अनुदान / सहायता राशि' : 'Assistance / Support'}
                  </span>
                  <span className="font-bold text-emerald-300 font-mono">
                    {loc.benefitAmount}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {loc.shortExplanation}
                </p>
              </div>

              {/* Factors Breakdown */}
              <div className="space-y-4 pt-4 border-t border-emerald-500/15">
                
                {/* Matched Factors */}
                {loc.matchedFactors.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                      {language === 'ta' ? 'பொருந்திய விதிகள்' : language === 'hi' ? 'सत्यापित शर्तें' : 'Matched Factors'} ({loc.matchedFactors.length})
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {loc.matchedFactors.slice(0, 3).map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Attention Required Factors */}
                {loc.needsAttentionFactors.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider font-mono">
                      {language === 'ta' ? 'சரிபார்க்க வேண்டியவை' : language === 'hi' ? 'सत्यापन आवश्यक बिंदु' : 'Needs Attention / Verification'} ({loc.needsAttentionFactors.length})
                    </span>
                    <ul className="space-y-1.5 text-xs text-amber-200/90">
                      {loc.needsAttentionFactors.slice(0, 2).map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reason summary */}
                <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-emerald-500/10">
                  <span className="text-slate-300 font-medium">
                    {language === 'ta' ? 'இது ஏன் முக்கியம்: ' : language === 'hi' ? 'यह क्यों महत्वपूर्ण है: ' : 'Why it matters: '}
                  </span>
                  <span>{loc.plainReasoning}</span>
                </div>

                {/* Buttons: "Why?" and "View Pathway" */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWhy(s, match);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition-colors focus:outline-none"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.schemesWhyBtn}</span>
                  </button>

                  {match.status !== 'DOES NOT MATCH' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRequirements(s);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 rounded-lg transition-colors focus:outline-none"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.schemesRequirementsBtn}</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPathway();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors focus:outline-none"
                  >
                    <span>{t.schemesPathwayBtn}</span>
                    <ArrowRight className="w-3 h-3 text-slate-950" />
                  </button>

                  <a
                    href={s.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title={`Open official portal (${s.officialUrl})`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </Card3D>
          </Scroll3DGridItem>
        );
      })}
      </div>

    </div>
  );
};
