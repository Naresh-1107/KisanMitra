import React, { useState } from 'react';
import { Check, AlertTriangle, ArrowRight, ShieldCheck, MapPin, Building2, PhoneCall } from 'lucide-react';
import { Scheme, SchemeMatchResult, FarmerProfile, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RequirementCheckViewProps {
  profile: FarmerProfile;
  results: SchemeMatchResult[];
  selectedScheme?: Scheme | null;
  language?: SupportedLanguage;
  onViewPathway: () => void;
}

export const RequirementCheckView: React.FC<RequirementCheckViewProps> = ({
  profile,
  results,
  selectedScheme,
  language = 'en',
  onViewPathway,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Filter schemes needing attention or potentially relevant
  const relevantSchemes = results.filter(
    r => r.status === 'POTENTIALLY RELEVANT' || r.status === 'NEEDS VERIFICATION'
  );

  const [activeSchemeId, setActiveSchemeId] = useState<string>(
    selectedScheme?.id || (relevantSchemes[0] ? relevantSchemes[0].scheme.id : 'pm-kisan')
  );

  const activeMatch = results.find(r => r.scheme.id === activeSchemeId) || results[0];
  const activeScheme = activeMatch?.scheme;

  if (!activeScheme) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t.requirementsStage}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.requirementsTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          {t.requirementsSubtitle}
        </p>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-emerald-500/20 text-xs overflow-x-auto font-mono">
        {relevantSchemes.map(r => (
          <button
            key={r.scheme.id}
            onClick={() => setActiveSchemeId(r.scheme.id)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap font-medium ${
              activeSchemeId === r.scheme.id
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {r.scheme.code}
          </button>
        ))}
      </div>

      {/* Main Checklist Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Already Verified Baseline */}
        <div className="lg:col-span-5 p-6 rounded-2xl synapse-glass border-emerald-500/15 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              Profile Baseline Verified
            </span>
            <span className="text-xs font-mono text-emerald-300">{t.requirementsStatusVerified}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-semibold text-white block">Farmer Category & Holding Size</span>
                <p className="text-slate-300">
                  {profile.farmerCategory} · {profile.landSize} {profile.landUnit}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-semibold text-white block">Geographic Territory</span>
                <p className="text-slate-300">
                  {profile.district}, {profile.state} (Notified Cauvery Delta Zone)
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-semibold text-white block">Cultivated Commodity</span>
                <p className="text-slate-300">
                  {profile.crop} (Eligible for agricultural input support & PMFBY)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 leading-relaxed font-mono">
            These baseline parameters confirm your eligibility window. Now focus on resolving the specific departmental checks on the right.
          </div>
        </div>

        {/* Right Column: Attention Required Requirements for Active Scheme */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Required Checks for {activeScheme.code}</span>
              <span className="text-xs text-amber-400 font-normal">
                ({activeScheme.requirementsChecklist.filter(r => r.status === 'attention_required').length} items need attention)
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {activeScheme.requirementsChecklist.map(req => {
              const needsAttention = req.status === 'attention_required';

              return (
                <div
                  key={req.id}
                  className={`p-6 rounded-2xl synapse-glass border space-y-4 transition-all ${
                    needsAttention
                      ? 'border-amber-500/30 bg-amber-950/10'
                      : 'border-emerald-500/20 bg-emerald-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          needsAttention
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {needsAttention ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-white">
                        {req.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        needsAttention
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {needsAttention ? t.requirementsStatusAttention : t.requirementsStatusVerified}
                    </span>
                  </div>

                  {/* Why It Matters */}
                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">
                      {t.requirementsWhyMatters}:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {req.whyItMatters}
                    </p>
                  </div>

                  {/* Action Needed */}
                  <div className="space-y-1 text-xs">
                    <span className="text-amber-400 font-semibold uppercase tracking-wider block text-[10px]">
                      {t.requirementsActionNeeded}:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {req.actionNeeded}
                    </p>
                  </div>

                  {/* Official Channel / Authority */}
                  <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.requirementsChannel}: <strong className="text-slate-200">{req.channel}</strong></span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={onViewPathway}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md"
            >
              <span>{t.schemesPathwayBtn}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
