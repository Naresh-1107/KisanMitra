import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Building2, MessageSquare } from 'lucide-react';
import { PersonalizedStep, FarmerProfile, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PersonalizedPathwayViewProps {
  profile: FarmerProfile;
  initialSteps: PersonalizedStep[];
  language?: SupportedLanguage;
  onOpenAssistant: () => void;
}

export const PersonalizedPathwayView: React.FC<PersonalizedPathwayViewProps> = ({
  profile,
  initialSteps,
  language = 'en',
  onOpenAssistant,
}) => {
  const [steps, setSteps] = useState<PersonalizedStep[]>(initialSteps);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const toggleStep = (stepNumber: number) => {
    setSteps(prev =>
      prev.map(s => {
        if (s.stepNumber === stepNumber) {
          const nextStatus =
            s.status === 'completed'
              ? 'in_progress'
              : s.status === 'in_progress'
              ? 'completed'
              : 'in_progress';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.pathwayStage}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.pathwayTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          {t.pathwaySubtitle} ({profile.name || 'Farmer'} · {profile.landSize} {profile.landUnit} {profile.crop} in {profile.district}, {profile.state})
        </p>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-2xl synapse-glass border-emerald-500/25 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-white text-sm">{t.pathwayProgress}</span>
            <p className="text-slate-400">
              {completedCount} of {steps.length} milestones completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-emerald-500/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-500/20">
        {steps.map(step => {
          const isDone = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <div
              key={step.stepNumber}
              className={`relative rounded-2xl synapse-glass p-6 sm:p-7 border transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : isInProgress
                  ? 'border-emerald-400/50 bg-slate-900/90 synapse-glow'
                  : 'border-slate-800 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Step indicator node on timeline */}
              <div
                onClick={() => toggleStep(step.stepNumber)}
                className={`absolute -left-6 sm:-left-8 top-7 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-md ${
                  isDone
                    ? 'bg-emerald-400 text-slate-950 font-bold'
                    : isInProgress
                    ? 'bg-emerald-950 border-2 border-emerald-400 text-emerald-400 animate-pulse'
                    : 'bg-slate-900 border border-slate-700 text-slate-500'
                }`}
                title="Click to toggle completion"
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-mono font-bold">{step.stepNumber}</span>}
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-emerald-400 font-bold">MILESTONE 0{step.stepNumber}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{step.schemeTag}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors self-start shrink-0 font-mono ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    {isDone ? 'Completed ✓' : t.pathwayStepComplete}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Practical Advice & Official Channel */}
                <div className="pt-3 border-t border-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.pathwayChannelLabel} <strong className="text-slate-200">{step.channel}</strong></span>
                  </div>

                  {step.actionText && (
                    <div className="text-[11px] text-emerald-300/90 bg-emerald-950/30 px-3 py-1 rounded-lg border border-emerald-500/15">
                      <span className="text-emerald-400 font-bold">{t.pathwayTipLabel}</span> {step.actionText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assistant Help Banner */}
      <div className="p-6 rounded-2xl synapse-glass border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need personalized local clarification?</span>
          </div>
          <h4 className="text-base font-bold text-white">
            Ask KisanMitra Assistant in English, Tamil, or Hindi
          </h4>
          <p className="text-xs text-slate-300">
            Get instant answers on where to submit documents in Thanjavur.
          </p>
        </div>

        <button
          onClick={onOpenAssistant}
          className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-slate-950" />
          <span>Talk to KisanMitra</span>
        </button>
      </div>

    </div>
  );
};
