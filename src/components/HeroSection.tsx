import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  ChevronDown,
  Send,
  Loader2,
  Bot,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { SupportedLanguage, Scheme, SchemeMatchResult, FarmerProfile } from '../types';
import { Card3D } from './Card3D';
import { GeminiService } from '../services/geminiService';
import { SCHEMES_DATABASE, DEMO_FARMER_PROFILE } from '../data/schemes';
import { EligibilityEngine } from '../services/eligibilityEngine';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  onStartProfile: () => void;
  onOpenAssistant: () => void;
  onLoadDemo: () => void;
  language: SupportedLanguage;
  onOpenWhy?: (scheme: Scheme, match: SchemeMatchResult) => void;
  profile?: FarmerProfile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProfile,
  onOpenAssistant,
  onLoadDemo,
  language,
  onOpenWhy,
  profile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Scroll driven 3D perspective rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.6], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.97, 1.02]);

  // Real-time typewriter effect simulating live session assembling mid-frame
  const [typedText, setTypedText] = useState('');
  const fullSentence =
    language === 'ta'
      ? 'நான் தஞ்சாவூரில் 2 ஏக்கர் நிலத்தில் நெல் சாகுபடி செய்யும் சிறு விவசாயி. எனக்கு என்னென்ன அரசு பலன்கள் கிடைக்கும்?'
      : language === 'hi'
      ? 'मैं तंजावूर में 2 एकड़ में धान की खेती करने वाला छोटा किसान हूं। मुझे कौन सी सरकारी योजनाएं मिल सकती हैं?'
      : 'I am a small farmer from Thanjavur. I have 2 acres of land and grow paddy. What government benefits may be relevant to me?';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullSentence.substring(0, index));
      index++;
      if (index > fullSentence.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [language, fullSentence]);

  // Gemini AI Chat Bar state
  const [chatInput, setChatInput] = useState('');
  const [chatAnswer, setChatAnswer] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Submit query directly to Gemini AI
  const handleChatSubmit = async (queryText?: string) => {
    const q = (queryText || chatInput).trim();
    if (!q || isChatLoading) return;

    setActiveQuery(q);
    setChatInput('');
    setIsChatLoading(true);
    setChatAnswer(null);

    try {
      const activeLang = q.includes('தமிழ்') || q.includes('Tamil') ? 'ta' : language;
      const reply = await GeminiService.sendChatMessage(q, profile || DEMO_FARMER_PROFILE, activeLang);
      setChatAnswer(reply);
    } catch (err) {
      console.error('Hero chat error:', err);
      setChatAnswer(
        language === 'ta'
          ? 'கிசான்மித்ரா.ai என்பது இந்திய விவசாயிகளுக்கான நுண்ணறிவு வழிகாட்டியாகும். இது ஜெமினி AI மற்றும் உறுதிப்படுத்தப்பட்ட விதிமுறை இயந்திரத்தை இணைத்து விவசாயிகளுக்கு பலன்களை வழங்குகிறது.'
          : 'KisanMitra.ai is an intelligent agricultural scheme navigator. It combines Gemini NLP with a deterministic eligibility engine to guide farmers from scheme discovery to their official next steps.'
      );
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'ta') {
        utterance.lang = 'ta-IN';
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Helper to open scheme popup when a pod is touched
  const handlePodClick = (schemeId: string) => {
    const foundScheme = SCHEMES_DATABASE.find(s => s.id === schemeId);
    if (foundScheme && onOpenWhy) {
      const match = EligibilityEngine.evaluateScheme(profile || DEMO_FARMER_PROFILE, foundScheme);
      onOpenWhy(foundScheme, match);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Scrolltide Synapse Ambient Radial Glow (Violet + Emerald) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-gradient-to-b from-violet-600/20 via-emerald-600/15 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        
        {/* Top Hero Headline Block */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Scrolltide Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-violet-500/30 text-xs text-violet-300 synapse-glow backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tracking-wide font-semibold text-emerald-400">{t.heroPill}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] text-balance">
            {t.heroTitle1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-teal-300 to-emerald-400">
              {t.heroTitle2}
            </span>
          </h1>

          {/* GEMINI / CHATGPT / CLAUDE CHAT BAR */}
          <div className="max-w-3xl mx-auto w-full pt-2 space-y-3">
            <div className="relative rounded-2xl synapse-glass p-2 border border-emerald-500/35 shadow-[0_0_40px_-5px_rgba(16,185,129,0.25)] focus-within:border-emerald-400 focus-within:shadow-[0_0_50px_-5px_rgba(16,185,129,0.4)] transition-all bg-slate-950/80 backdrop-blur-xl">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleChatSubmit();
                }}
                className="flex items-center gap-3 px-3 py-1.5"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
                </div>
                
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder={t.heroChatPlaceholder}
                  className="flex-1 bg-transparent border-none text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none py-1"
                />

                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 disabled:opacity-30 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  aria-label="Send query to Gemini AI"
                >
                  {isChatLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span className="text-xs font-semibold hidden sm:inline">{t.heroAskAiBtn}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">{t.heroSuggestionsLabel}</span>
              <button
                onClick={() => handleChatSubmit('What is KisanMitra.ai and how does it help farmers?')}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/50 transition-colors"
              >
                {t.heroSugg1}
              </button>
              <button
                onClick={() => handleChatSubmit('Why do eligible farmers fail to get government schemes?')}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/50 transition-colors"
              >
                {t.heroSugg2}
              </button>
              <button
                onClick={() => handleChatSubmit('I have 2 acres paddy in Thanjavur. What are my best schemes?')}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/20 text-slate-300 hover:text-emerald-300 hover:border-emerald-400/50 transition-colors"
              >
                {t.heroSugg3}
              </button>
              <button
                onClick={() => handleChatSubmit('கிசான்மித்ரா பற்றி தமிழில் சொல்லுங்கள்')}
                className="px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 hover:text-white transition-colors"
              >
                {t.heroSugg4}
              </button>
            </div>

            {/* Gemini Live AI Inline Answer Card */}
            {(chatAnswer || isChatLoading) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl synapse-glass border border-emerald-500/30 bg-slate-950/90 text-left space-y-3 relative shadow-2xl"
              >
                <div className="flex items-center justify-between text-xs pb-2 border-b border-emerald-500/15">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono">
                    <Bot className="w-4 h-4" />
                    <span className="font-bold">Gemini 3.8 Flash // KisanMitra Intelligence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {chatAnswer && (
                      <button
                        onClick={() => handleSpeak(chatAnswer)}
                        className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 text-[11px]"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>Voice</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setChatAnswer(null);
                        setActiveQuery(null);
                      }}
                      className="text-slate-500 hover:text-white p-1"
                      aria-label="Dismiss answer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isChatLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-300 py-3">
                    <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>Gemini AI is analyzing agricultural schemes...</span>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {chatAnswer}
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-slate-400">
                    Query: "{activeQuery}"
                  </span>
                  <button
                    onClick={onOpenAssistant}
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    Open Full Assistant Drawer →
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Action Navigation CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartProfile}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all synapse-glow hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25 focus:outline-none"
            >
              <span>{t.heroBtnFind}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-violet-200 bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30 rounded-xl transition-all hover:scale-105 active:scale-95 focus:outline-none"
            >
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <span>{t.heroBtnTalk}</span>
            </button>

            <button
              onClick={onLoadDemo}
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-emerald-300 bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/30 rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.heroBtnDemo}</span>
            </button>
          </div>
        </div>

        {/* Scrolltide Signature Feature: 3D Live Session Assembling Mid-Frame */}
        <div
          className="relative max-w-5xl mx-auto"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            style={{
              rotateX,
              scale,
              transformStyle: 'preserve-3d',
            }}
            className="rounded-3xl p-1 bg-gradient-to-b from-violet-500/30 via-emerald-500/20 to-transparent shadow-2xl"
          >
            <div className="rounded-[22px] synapse-glass p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-2xl bg-[#060c09]/85 border border-emerald-500/25">
              
              {/* Terminal Session Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-500/15 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-emerald-400 font-bold ml-2">
                    {t.heroLiveSessionHeader}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span>{t.heroGeoText}</span>
                  <span className="hidden sm:inline">{t.heroEngineText}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Activity className="w-3.5 h-3.5" />
                    <span>60 FPS</span>
                  </span>
                </div>
              </div>

              {/* Farmer Natural Language Query Prompt */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-violet-400" />
                  <span>{t.heroStreamLabel}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/90 border border-violet-500/25 font-mono text-sm text-slate-100 flex items-start gap-2 shadow-inner">
                  <span className="text-emerald-400 font-bold select-none">&gt;</span>
                  <p className="flex-1 text-emerald-200/95 leading-relaxed">
                    {typedText}
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse align-middle" />
                  </p>
                </div>
              </div>

              {/* Assembled Knowledge Graph Chips */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t.heroGraphLabel}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] text-slate-500 block">STATE</span>
                    <span className="font-bold">Tamil Nadu</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] text-slate-500 block">DISTRICT</span>
                    <span className="font-bold">Thanjavur</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] text-slate-500 block">CROP</span>
                    <span className="font-bold">Paddy (Rice)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] text-slate-500 block">LAND SIZE</span>
                    <span className="font-bold">2.0 Acres</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="text-[10px] text-slate-500 block">CATEGORY</span>
                    <span className="font-bold">Small Farmer</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-violet-950/40 border border-violet-500/30 text-violet-300">
                    <span className="text-[10px] text-slate-500 block">PRIORITY</span>
                    <span className="font-bold">Income & Shield</span>
                  </div>
                </div>
              </div>

              {/* 3D Assembled Pods: Matched Schemes with Interactive Touch/Click Popups */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{t.heroTopSchemesLabel}</span>
                  <span className="text-emerald-400">{t.heroTapForPopup}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => handlePodClick('pm-kisan')}
                    className="cursor-pointer"
                  >
                    <Card3D
                      depth={18}
                      glowColor="emerald"
                      className="p-4 bg-slate-900/80 border-emerald-500/25 hover:border-emerald-400/60"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">
                          {language === 'ta' ? 'பிரதமர் கிசான் (PM-KISAN)' : language === 'hi' ? 'पीएम-किसान (PM-KISAN)' : 'PM-KISAN Samman'}
                        </span>
                        <span className="text-emerald-400 font-mono text-[11px]">96% Match</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {language === 'ta' ? 'ஆண்டுக்கு ₹6,000 நேரடி உதவி' : language === 'hi' ? '₹6,000 / वर्ष सीधी सहायता' : '₹6,000 / yr income support'}
                      </p>
                      <div className="mt-2 text-[10px] text-emerald-300 font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === 'ta' ? 'தகுதியான நில உடமையாளர்' : language === 'hi' ? 'पात्र भूमिधारक कृषक' : 'Eligible landholder'}</span>
                        </span>
                        <span className="text-violet-300 font-bold underline">
                          {language === 'ta' ? 'திறக்க தொடவும் →' : language === 'hi' ? 'टैप करें →' : 'Tap to open →'}
                        </span>
                      </div>
                    </Card3D>
                  </div>

                  <div
                    onClick={() => handlePodClick('pmfby')}
                    className="cursor-pointer"
                  >
                    <Card3D
                      depth={18}
                      glowColor="emerald"
                      className="p-4 bg-slate-900/80 border-emerald-500/25 hover:border-emerald-400/60"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">
                          {language === 'ta' ? 'பயிர் காப்பீடு (PMFBY)' : language === 'hi' ? 'प्रधानमंत्री फसल बीमा (PMFBY)' : 'PMFBY Crop Insurance'}
                        </span>
                        <span className="text-emerald-400 font-mono text-[11px]">94% Match</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {language === 'ta' ? 'நெல் பயிர்க்கு 1.5% குறைந்த பிரீமியம்' : language === 'hi' ? 'धान हेतु मात्र 1.5% प्रीमियम' : '1.5% subsidized premium for Paddy'}
                      </p>
                      <div className="mt-2 text-[10px] text-amber-300 font-mono flex items-center justify-between">
                        <span>{language === 'ta' ? '⚠ VAO அடங்கல் சான்று' : language === 'hi' ? '⚠ पटवारी/VAO बुवाई सत्यापन' : '⚠ VAO Adangal check'}</span>
                        <span className="text-violet-300 font-bold underline">
                          {language === 'ta' ? 'திறக்க தொடவும் →' : language === 'hi' ? 'टैप करें →' : 'Tap to open →'}
                        </span>
                      </div>
                    </Card3D>
                  </div>

                  <div
                    onClick={() => handlePodClick('kcc')}
                    className="cursor-pointer"
                  >
                    <Card3D
                      depth={18}
                      glowColor="violet"
                      className="p-4 bg-slate-900/80 border-violet-500/25 hover:border-violet-400/60"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">
                          {language === 'ta' ? 'விவசாய கடன் அட்டை (KCC)' : language === 'hi' ? 'किसान क्रेडिट कार्ड (KCC)' : 'Kisan Credit Card (KCC)'}
                        </span>
                        <span className="text-violet-400 font-mono text-[11px]">91% Match</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {language === 'ta' ? '4% குறைந்த வட்டியில் பயிர் கடன்' : language === 'hi' ? '4% रियायती ब्याज दर पर कृषि ऋण' : '4% concessional cultivation credit'}
                      </p>
                      <div className="mt-2 text-[10px] text-violet-300 font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === 'ta' ? '₹1.6 லட்சம் பிணையமில்லா கடன்' : language === 'hi' ? '₹1.6 लाख तक बिना बंधक ऋण' : '₹1.6 Lakh limit'}</span>
                        </span>
                        <span className="text-violet-300 font-bold underline">
                          {language === 'ta' ? 'திறக்க தொடவும் →' : language === 'hi' ? 'टैप करें →' : 'Tap to open →'}
                        </span>
                      </div>
                    </Card3D>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center justify-center text-slate-500 text-xs space-y-1 font-mono pt-4">
          <span>{t.heroScrollHint}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </div>

      </div>
    </section>
  );
};
