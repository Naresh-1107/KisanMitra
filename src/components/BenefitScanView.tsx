import React, { useState, useEffect } from 'react';
import { Check, Loader2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { BenefitScanSummary, FarmerProfile, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BenefitScanViewProps {
  profile: FarmerProfile;
  summary: BenefitScanSummary;
  language?: SupportedLanguage;
  onViewSchemes: () => void;
  onViewPathway: () => void;
}

export const BenefitScanView: React.FC<BenefitScanViewProps> = ({
  profile,
  summary,
  language = 'en',
  onViewSchemes,
  onViewPathway,
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isScanningComplete, setIsScanningComplete] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    // Stepped scanning progression animation (~1.8 seconds)
    const timers = [
      setTimeout(() => setAnimationStep(1), 350),
      setTimeout(() => setAnimationStep(2), 700),
      setTimeout(() => setAnimationStep(3), 1100),
      setTimeout(() => setAnimationStep(4), 1500),
      setTimeout(() => setIsScanningComplete(true), 1800),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const scanningSteps =
    language === 'ta'
      ? [
          'உங்கள் விவசாயத் தேவைகள் மற்றும் தட்பவெப்ப மண்டலத்தைப் புரிந்துகொள்கிறது...',
          'பொருத்தமான மத்திய மற்றும் மாநில அரசு திட்டங்களை ஒப்பிடுகிறது...',
          'நில அளவு மற்றும் சட்டப்பூர்வ தகுதி நிபந்தனைகளைச் சரிபார்க்கிறது...',
          'உங்கள் தனிப்பயனாக்கப்பட்ட வழிகாட்டுப் பாதையைத் தயாரிக்கிறது...',
        ]
      : language === 'hi'
      ? [
          'आपकी कृषि आवश्यकताओं एवं जलवायु क्षेत्र का विश्लेषण किया जा रहा है...',
          'अनुकूल केंद्रीय एवं राज्य योजनाओं का मिलान किया जा रहा है...',
          'भूमि जोत एवं वैधानिक पात्रता नियमों का सत्यापन किया जा रहा है...',
          'व्यक्तिगत मार्गदर्शन एवं सत्यापन सूची तैयार की जा रही है...',
        ]
      : [
          'Understanding your farming needs & agro-climatic zone...',
          'Matching relevant central & state government schemes...',
          'Checking land size & statutory eligibility conditions...',
          'Preparing your personalized pathway & verification checklist...',
        ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Scanning Animation Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.scanStage}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.scanTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Scanned for <span className="text-emerald-400 font-semibold">{profile.name || 'Farmer'}</span> · {profile.landSize} {profile.landUnit} {profile.crop} in {profile.district}, {profile.state}
        </p>
      </div>

      {/* Progress Animation Box */}
      {!isScanningComplete ? (
        <div className="p-8 rounded-2xl synapse-glass border-emerald-500/25 max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
            <h3 className="text-lg font-bold text-white">Analyzing your farmer profile...</h3>
          </div>

          <div className="space-y-3">
            {scanningSteps.map((stepText, idx) => {
              const isDone = animationStep > idx;
              const isCurrent = animationStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                    isDone
                      ? 'text-emerald-300 font-medium'
                      : isCurrent
                      ? 'text-white'
                      : 'text-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      isDone
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : isCurrent
                        ? 'border border-emerald-400 text-emerald-400'
                        : 'border border-slate-700 text-slate-600'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>
                  <span>{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Results Summary Deck */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Headline Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Analyzed */}
            <div className="p-6 rounded-2xl synapse-glass border-emerald-500/15 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Total Analyzed
              </span>
              <div className="text-4xl font-extrabold text-white font-mono tabular-nums">
                {summary.totalAnalyzed}
              </div>
              <p className="text-xs text-slate-400">
                Central & State schemes checked against your farm criteria.
              </p>
            </div>

            {/* Potentially Relevant */}
            <div className="p-6 rounded-2xl synapse-glass border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t.scanRelevantCount}</span>
              </span>
              <div className="text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
                {summary.potentiallyRelevant}
              </div>
              <p className="text-xs text-emerald-300/80">
                Core conditions match (holding, location & crop).
              </p>
            </div>

            {/* Needs Verification */}
            <div className="p-6 rounded-2xl synapse-glass border-amber-500/30 bg-amber-950/20 space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{t.scanVerificationCount}</span>
              </span>
              <div className="text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                {summary.needsVerification}
              </div>
              <p className="text-xs text-amber-200/80">
                Statutory documents (Patta / e-KYC / VAO Adangal) pending.
              </p>
            </div>

            {/* Does Not Match */}
            <div className="p-6 rounded-2xl synapse-glass border-slate-700/40 bg-slate-900/30 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>{t.scanNotMatchingCount}</span>
              </span>
              <div className="text-4xl font-extrabold text-slate-400 font-mono tabular-nums">
                {summary.noMatch}
              </div>
              <p className="text-xs text-slate-500">
                Outside acreage limits, other states, or alternate crops.
              </p>
            </div>

          </div>

          {/* Model Disclosure & Public Guidance Notice */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/15 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-white">Universal Human Values & Explainability Standard:</span>
              <p className="text-slate-400 leading-relaxed">
                The results indicate <strong>"Potential Relevance"</strong> based on verified government criteria.
                Formal statutory disbursement requires administrative verification at designated government portals or local agricultural offices.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onViewSchemes}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md focus:outline-none"
            >
              <span>{t.scanViewSchemesBtn}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              onClick={onViewPathway}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/20 rounded-xl transition-all"
            >
              <span>{t.scanViewPathwayBtn}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
