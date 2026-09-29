import React from 'react';
import { X, Check, AlertTriangle, ShieldAlert, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Scheme, SchemeMatchResult, FarmerProfile, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhySchemeModalProps {
  scheme: Scheme;
  matchResult: SchemeMatchResult;
  profile: FarmerProfile;
  language?: SupportedLanguage;
  onClose: () => void;
  onViewPathway: () => void;
}

export const WhySchemeModal: React.FC<WhySchemeModalProps> = ({
  scheme,
  matchResult,
  profile,
  language = 'en',
  onClose,
  onViewPathway,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const matchedList = matchResult?.matchedFactors || scheme?.matchedFactorsTemplate || [];
  const whyMatched = scheme?.whyDetails?.matched || [];
  const attentionList = matchResult?.needsAttentionFactors || scheme?.needsAttentionFactorsTemplate || [];
  const whyAttention = scheme?.whyDetails?.needsVerification || [];

  const displayName = language === 'ta' && scheme.localName ? scheme.localName : scheme.name;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl synapse-glass rounded-2xl border border-emerald-500/40 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl bg-[#07120e]/95"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-emerald-500/15">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                {scheme.category} · {scheme.code}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                UHV Verified
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {displayName}
            </h3>
            <p className="text-xs text-slate-300">
              Evaluated for {profile.name || 'Farmer'} · {profile.landSize} {profile.landUnit} {profile.crop} in {profile.district}, {profile.state}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout Banner */}
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm ${
            matchResult?.status === 'POTENTIALLY RELEVANT'
              ? 'bg-emerald-950/50 border-emerald-500/35 text-emerald-200'
              : matchResult?.status === 'NEEDS VERIFICATION'
              ? 'bg-amber-950/50 border-amber-500/35 text-amber-200'
              : 'bg-slate-900 border-slate-700 text-slate-300'
          }`}
        >
          <div className="font-semibold mb-1 flex items-center justify-between">
            <span>
              {language === 'ta' ? 'நிலை:' : language === 'hi' ? 'स्थिति:' : 'Status:'}{' '}
              {matchResult?.status || 'POTENTIALLY RELEVANT'}
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              {scheme.benefitAmount}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {scheme.whyDetails?.simpleExplanation || matchResult?.plainLanguageReasoning || scheme.shortExplanation}
          </p>
        </div>

        {/* Section 1: MATCHED CONDITIONS */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Check className="w-4 h-4" />
            <span>
              {language === 'ta' ? 'பொருந்திய விதிகள்' : language === 'hi' ? 'सत्यापित शर्तें' : 'Matched Conditions'} ({matchedList.length + whyMatched.length})
            </span>
          </div>

          <div className="space-y-2">
            {matchedList.map((factor, idx) => (
              <div
                key={`mf-${idx}`}
                className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/15 text-xs text-emerald-200 flex items-start gap-2"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
            {whyMatched.map((detail, idx) => (
              <div
                key={`d-${idx}`}
                className="p-3 rounded-lg bg-slate-900/60 border border-emerald-500/10 text-xs text-slate-300 flex items-start gap-2"
              >
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: NEEDS VERIFICATION */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-4 h-4" />
            <span>
              {language === 'ta' ? 'சரிபார்க்க வேண்டியவை' : language === 'hi' ? 'सत्यापन आवश्यक बिंदु' : 'Needs Verification'} ({attentionList.length + whyAttention.length})
            </span>
          </div>

          <div className="space-y-2">
            {attentionList.map((factor, idx) => (
              <div
                key={`af-${idx}`}
                className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
            {whyAttention.map((detail, idx) => (
              <div
                key={`nv-${idx}`}
                className="p-3 rounded-lg bg-slate-900/60 border border-amber-500/15 text-xs text-slate-300 flex items-start gap-2"
              >
                <span className="text-amber-400 font-bold">⚠</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* UHV Ethics & Explainability Notice */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/15 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Universal Human Values & Transparency Notice</span>
          </div>
          <p className="leading-relaxed">
            KisanMitra adheres strictly to Right Understanding: we mark schemes as{' '}
            <strong className="text-emerald-300">"Potentially Relevant"</strong> based on agricultural criteria.
            To protect cultivator dignity, we never promise automatic disbursements until official administrative verifications (e-KYC, Patta, VAO Adangal) are submitted at the designated departmental portal.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
          >
            <span>Official Portal ({scheme.officialSource})</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              {language === 'ta' ? 'மூடுக' : language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onViewPathway();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors font-mono"
            >
              <span>{language === 'ta' ? 'வழிகாட்டுப் பாதை' : language === 'hi' ? 'मार्गदर्शन पथ देखें' : 'See Next Steps'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
