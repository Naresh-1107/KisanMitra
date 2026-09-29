import React from 'react';
import { HelpCircle, Check, ArrowRight, ShieldCheck, Database, FileCheck2, Cpu } from 'lucide-react';

export const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="py-20 border-t border-emerald-500/15 bg-[#050d0a]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: The Problem — The Last-Mile Farmer Support Gap */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            The Agricultural Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Last-Mile Farmer Support Gap
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Dozens of central and state government schemes exist for Indian farmers, yet eligible smallholders
            frequently miss out. Information is scattered across fragmented department portals, documentation requirements
            are obscure, and eligibility criteria are difficult to interpret without expert guidance.
          </p>
        </div>

        {/* 3 Pillars of the Gap vs KisanMitra Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl synapse-glass border-emerald-500/15 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Fragmented Portals</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Schemes are spread across Central ministries, State agriculture departments, cooperative societies,
              and banks, with no unified navigator.
            </p>
            <div className="pt-2 border-t border-emerald-500/10 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4" />
              <span>Unified single-window scanner</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl synapse-glass border-emerald-500/15 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Hidden Eligibility Hurdles</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              A farmer may qualify by land size, but gets stalled due to missing e-KYC, VAO adangal verification,
              or unrecognized bank account seeding.
            </p>
            <div className="pt-2 border-t border-emerald-500/10 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4" />
              <span>Proactive requirement gap detection</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl synapse-glass border-emerald-500/15 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white">No Actionable Next Step</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard chatbots output long generic essays without telling the farmer where to walk, what form to ask for,
              or who to contact next.
            </p>
            <div className="pt-2 border-t border-emerald-500/10 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4" />
              <span>Tailored 5-step official pathway</span>
            </div>
          </div>
        </div>

        {/* Section 2: Architecture Integrity (Gemini NLP + Deterministic Rule Engine) */}
        <div className="rounded-3xl p-8 lg:p-10 synapse-glass border-emerald-500/20 space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              System Architecture
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why We Separate Gemini NLP from the Eligibility Engine
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Large language models should never independently invent or assume statutory government welfare rules.
              KisanMitra enforces strict architectural separation for 100% explainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Cpu className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">1. Gemini 3.8 Flash</span>
              </div>
              <h4 className="text-base font-semibold text-white">Natural Language Intelligence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Listens to the farmer in English, Tamil, or Hindi. Extracts structured parameters: State, District, Crop, Holding Size, Farmer Category, and Priority Need.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-teal-400">
                <Database className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">2. Eligibility Engine</span>
              </div>
              <h4 className="text-base font-semibold text-white">Deterministic Rule Matching</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applies exact statutory conditions: land ceilings, notified agro-climatic zones, and seasonal cut-offs. Generates MATCH, NEEDS VERIFICATION, or NO MATCH.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <FileCheck2 className="w-5 h-5" />
                <span className="font-bold text-sm uppercase">3. Explainable Pathway</span>
              </div>
              <h4 className="text-base font-semibold text-white">Transparent Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explains "Why?" in simple words without false promises, details what document is pending, and maps the farmer's next step to the official channel.
              </p>
            </div>
          </div>

          {/* Core User Flow Diagram */}
          <div className="pt-6 border-t border-emerald-500/15">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-4 font-semibold">
              The Connected Core User Flow
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Farmer Question</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Gemini NLP</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Farmer Profile</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Scheme Matching</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Eligibility Explanation</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">Requirement Check</span>
              <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="px-3 py-1.5 rounded-lg bg-emerald-400 font-bold text-slate-950">Personalized Pathway</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
