import React from 'react';
import { Globe, UserCheck, Sparkles, Heart } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onLoadDemo: () => void;
  hasProfile: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  language,
  onLanguageChange,
  onLoadDemo,
  hasProfile,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3.5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
        
        {/* Zone 1: Brand Wordmark with Synapse Ambient Marker */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl synapse-glass border border-white/10 hover:border-violet-500/40 transition-all focus:outline-none group shadow-lg"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-emerald-400 flex items-center justify-center font-black text-[11px] text-slate-950">
            K
          </div>
          <span className="text-lg font-black tracking-tight text-white flex items-center">
            <span>KisanMitra</span>
            <span className="text-violet-400">.ai</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
        </button>

        {/* Zone 2: Floating Synapse Segmented Nav Island */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl synapse-glass border border-white/10 shadow-xl text-xs font-medium">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentTab === 'landing'
                ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.navLiveSession}
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentTab === 'profile'
                ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.navProfile}
          </button>
          <button
            onClick={() => onNavigate('scan')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentTab === 'scan'
                ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.navScan}
          </button>
          <button
            onClick={() => onNavigate('schemes')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentTab === 'schemes'
                ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.navSchemes}
          </button>
          <button
            onClick={() => onNavigate('pathway')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentTab === 'pathway'
                ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.navPathway}
          </button>
          <button
            onClick={() => onNavigate('uhv')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              currentTab === 'uhv'
                ? 'bg-amber-500/30 text-amber-200 font-bold border border-amber-500/40 shadow-md'
                : 'text-amber-300/80 hover:text-amber-200 hover:bg-amber-950/30'
            }`}
          >
            <Heart className="w-3 h-3 text-amber-400" />
            <span>{t.navUHV}</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Multilingual Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="flex items-center synapse-glass rounded-xl p-1 border border-white/10 text-xs">
            <Globe className="w-3.5 h-3.5 text-violet-400 ml-1 mr-1 hidden sm:inline" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-lg transition-colors font-semibold ${
                language === 'en'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2 py-0.5 rounded-lg transition-colors font-semibold ${
                language === 'ta'
                  ? 'bg-violet-500/40 text-violet-200 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-0.5 rounded-lg transition-colors font-semibold ${
                language === 'hi'
                  ? 'bg-emerald-500/40 text-emerald-200 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Quick Demo Button */}
          <button
            onClick={onLoadDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 synapse-glass border border-emerald-500/30 rounded-xl hover:bg-emerald-950/40 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.navLoadDemo}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 rounded-xl transition-all shadow-md focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{t.navFindBenefits}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
