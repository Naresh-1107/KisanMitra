import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAssistant: () => void;
  language?: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAssistant, language = 'en' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="border-t border-emerald-500/15 bg-[#050d0a] text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-emerald-500/10">
          <div className="space-y-2">
            <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="text-emerald-400">KisanMitra</span>
              <span className="text-slate-400 font-light text-base">.ai</span>
            </div>
            <p className="text-slate-400 max-w-md">
              {t.footerTagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <button onClick={() => onNavigate('landing')} className="hover:text-emerald-400 transition-colors">
              {t.navLiveSession}
            </button>
            <button onClick={() => onNavigate('profile')} className="hover:text-emerald-400 transition-colors">
              {t.navProfile}
            </button>
            <button onClick={() => onNavigate('scan')} className="hover:text-emerald-400 transition-colors">
              {t.navScan}
            </button>
            <button onClick={() => onNavigate('schemes')} className="hover:text-emerald-400 transition-colors">
              {t.navSchemes}
            </button>
            <button onClick={() => onNavigate('pathway')} className="hover:text-emerald-400 transition-colors">
              {t.navPathway}
            </button>
            <button onClick={() => onNavigate('uhv')} className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{t.navUHV}</span>
            </button>
            <button onClick={onOpenAssistant} className="text-emerald-400 hover:text-emerald-300 transition-colors">
              AI Assistant
            </button>
          </div>
        </div>

        {/* Universal Human Values (UHV) Cell Attribution */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {t.footerCellAttribution}
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} {t.footerRights}
          </div>
        </div>

      </div>
    </footer>
  );
};
