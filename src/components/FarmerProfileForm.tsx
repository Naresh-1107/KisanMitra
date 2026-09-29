import React, { useState } from 'react';
import { Sparkles, ArrowRight, MapPin, Wheat, Layers, HelpCircle, Check, Loader2 } from 'lucide-react';
import { FarmerProfile, SupportedLanguage } from '../types';
import {
  POPULAR_INDIAN_STATES,
  POPULAR_CROPS,
  FARMER_CATEGORIES,
  FARMING_NEEDS,
  DEMO_FARMER_PROFILE,
} from '../data/schemes';
import { GeminiService } from '../services/geminiService';
import { TRANSLATIONS } from '../data/translations';

interface FarmerProfileFormProps {
  initialProfile: FarmerProfile | null;
  onSubmit: (profile: FarmerProfile) => void;
  language: SupportedLanguage;
}

export const FarmerProfileForm: React.FC<FarmerProfileFormProps> = ({
  initialProfile,
  onSubmit,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [profile, setProfile] = useState<FarmerProfile>(
    initialProfile || {
      name: 'Ravi Kumar',
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      crop: 'Paddy',
      landSize: 2,
      landUnit: 'acres',
      farmerCategory: 'Small Farmer (1-2 ha / 2.5-5 acres)',
      need: 'Financial Support',
    }
  );

  const [naturalQuery, setNaturalQuery] = useState(
    'I am a small farmer from Thanjavur. I have 2 acres of land and grow paddy. What government benefits may be relevant to me?'
  );
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractSuccess, setExtractSuccess] = useState(false);

  // Handle Natural Language Extraction via Gemini API
  const handleExtractFromNL = async () => {
    if (!naturalQuery.trim()) return;
    setIsExtracting(true);
    setExtractSuccess(false);

    try {
      const extracted = await GeminiService.extractProfile(naturalQuery);
      setProfile(prev => ({
        ...prev,
        ...extracted,
        name: prev.name || 'Ravi Kumar',
      }));
      setExtractSuccess(true);
      setTimeout(() => setExtractSuccess(false), 3000);
    } catch (err) {
      console.error('NLP extraction failed:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  // Pre-fill default demo values (Ravi Kumar, Thanjavur, Paddy, 2 acres)
  const handlePreFillDemo = () => {
    setProfile({ ...DEMO_FARMER_PROFILE });
    setNaturalQuery(DEMO_FARMER_PROFILE.queryRaw);
    setExtractSuccess(true);
    setTimeout(() => setExtractSuccess(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.profileStage}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.profileTitle}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          {t.profileSubtitle}
        </p>
      </div>

      <div className="space-y-8">
        {/* NLP Natural Language Input Box */}
        <div className="p-6 rounded-2xl synapse-glass border-emerald-500/25 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.profileAiExtractLabel}</span>
            </label>
            <button
              type="button"
              onClick={handlePreFillDemo}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline focus:outline-none self-start sm:self-auto font-mono"
            >
              {t.profileDemoNotice}
            </button>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={naturalQuery}
              onChange={e => setNaturalQuery(e.target.value)}
              placeholder={t.profileAiExtractPlaceholder}
              className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-mono">
              Gemini AI: Location · Crop · Land holding · Need
            </div>
            <button
              type="button"
              onClick={handleExtractFromNL}
              disabled={isExtracting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors font-mono"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : extractSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Extracted to Form!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.profileAiExtractBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Structured Form Fields */}
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl synapse-glass border-emerald-500/15 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Farmer Name (Optional) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Farmer Name
              </label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                placeholder="Ravi Kumar"
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>State</span>
              </label>
              <select
                value={profile.state}
                onChange={e => setProfile({ ...profile, state: e.target.value })}
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                {POPULAR_INDIAN_STATES.map(s => (
                  <option key={s} value={s} className="bg-slate-900 text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                District
              </label>
              <input
                type="text"
                value={profile.district}
                onChange={e => setProfile({ ...profile, district: e.target.value })}
                placeholder="e.g. Thanjavur"
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            {/* Primary Crop */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-emerald-400" />
                <span>Primary Crop</span>
              </label>
              <select
                value={profile.crop}
                onChange={e => setProfile({ ...profile, crop: e.target.value })}
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Paddy" className="bg-slate-900 text-white">Paddy (Rice / நெல்)</option>
                <option value="Wheat" className="bg-slate-900 text-white">Wheat</option>
                <option value="Sugarcane" className="bg-slate-900 text-white">Sugarcane</option>
                <option value="Cotton" className="bg-slate-900 text-white">Cotton</option>
                <option value="Pulses" className="bg-slate-900 text-white">Pulses (Blackgram / Greengram)</option>
                <option value="Millets" className="bg-slate-900 text-white">Millets</option>
                <option value="Vegetables" className="bg-slate-900 text-white">Vegetables & Fruits</option>
              </select>
            </div>

            {/* Land Size & Unit */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Land Size</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={profile.landSize}
                  onChange={e => setProfile({ ...profile, landSize: parseFloat(e.target.value) || 1 })}
                  className="w-2/3 bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono"
                  required
                />
                <select
                  value={profile.landUnit}
                  onChange={e => setProfile({ ...profile, landUnit: e.target.value as 'acres' | 'hectares' })}
                  className="w-1/3 bg-slate-900/80 border border-emerald-500/20 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="acres" className="bg-slate-900 text-white">Acres</option>
                  <option value="hectares" className="bg-slate-900 text-white">Hectares</option>
                </select>
              </div>
            </div>

            {/* Farmer Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Farmer Category
              </label>
              <select
                value={profile.farmerCategory}
                onChange={e => setProfile({ ...profile, farmerCategory: e.target.value })}
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                {FARMER_CATEGORIES.map(fc => (
                  <option key={fc} value={fc} className="bg-slate-900 text-white">
                    {fc}
                  </option>
                ))}
              </select>
            </div>

            {/* What do you need help with? */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>What do you need help with?</span>
              </label>
              <select
                value={profile.need}
                onChange={e => setProfile({ ...profile, need: e.target.value })}
                className="w-full bg-slate-900/80 border border-emerald-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                {FARMING_NEEDS.map(need => (
                  <option key={need} value={need} className="bg-slate-900 text-white">
                    {need}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Submit CTA Button */}
          <div className="pt-4 border-t border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Demo values pre-configured for Tamil Nadu Thanjavur paddy farming.
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all synapse-glow hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              <span>{t.profileScanBtn}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
