import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SynapseCanvas3D } from './components/SynapseCanvas3D';
import { ScrollRearrangeShowcase } from './components/ScrollRearrangeShowcase';
import { UHVCellSection } from './components/UHVCellSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { FarmerProfileForm } from './components/FarmerProfileForm';
import { BenefitScanView } from './components/BenefitScanView';
import { SchemeCardsView } from './components/SchemeCardsView';
import { WhySchemeModal } from './components/WhySchemeModal';
import { RequirementCheckView } from './components/RequirementCheckView';
import { PersonalizedPathwayView } from './components/PersonalizedPathwayView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { Scroll3DSection } from './components/Scroll3DSection';
import { Footer } from './components/Footer';
import {
  FarmerProfile,
  Scheme,
  SchemeMatchResult,
  BenefitScanSummary,
  PersonalizedStep,
  SupportedLanguage,
} from './types';
import { DEMO_FARMER_PROFILE } from './data/schemes';
import { EligibilityEngine } from './services/eligibilityEngine';
import { PathwayGenerator } from './services/pathwayGenerator';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Active Farmer Profile & Eligibility State
  const [profile, setProfile] = useState<FarmerProfile>(DEMO_FARMER_PROFILE);
  const [scanSummary, setScanSummary] = useState<BenefitScanSummary | null>(null);
  const [matchResults, setMatchResults] = useState<SchemeMatchResult[]>([]);
  const [pathwaySteps, setPathwaySteps] = useState<PersonalizedStep[]>([]);

  // Modal states
  const [selectedWhyScheme, setSelectedWhyScheme] = useState<{
    scheme: Scheme;
    match: SchemeMatchResult;
  } | null>(null);
  const [selectedRequirementScheme, setSelectedRequirementScheme] = useState<Scheme | null>(null);

  // Initialize baseline scan on first mount with demo profile
  useEffect(() => {
    const { results, summary } = EligibilityEngine.runFullScan(DEMO_FARMER_PROFILE);
    setMatchResults(results);
    setScanSummary(summary);
    setPathwaySteps(PathwayGenerator.generatePathway(DEMO_FARMER_PROFILE, results));
  }, []);

  // When farmer profile updates/submits
  const handleProfileSubmit = (newProfile: FarmerProfile) => {
    setProfile(newProfile);
    const { results, summary } = EligibilityEngine.runFullScan(newProfile);
    setMatchResults(results);
    setScanSummary(summary);
    setPathwaySteps(PathwayGenerator.generatePathway(newProfile, results));
    
    // Smooth scroll to the 3D rearrange and results section
    const el = document.getElementById('schemes-3d-rearrange');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentTab('schemes');
    }
  };

  // Pre-fill demo profile
  const handleLoadDemo = () => {
    setProfile(DEMO_FARMER_PROFILE);
    const { results, summary } = EligibilityEngine.runFullScan(DEMO_FARMER_PROFILE);
    setMatchResults(results);
    setScanSummary(summary);
    setPathwaySteps(PathwayGenerator.generatePathway(DEMO_FARMER_PROFILE, results));
    
    const el = document.getElementById('schemes-3d-rearrange');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhy = (scheme: Scheme, match: SchemeMatchResult) => {
    setSelectedWhyScheme({ scheme, match });
  };

  const handleOpenRequirements = (scheme: Scheme) => {
    setSelectedRequirementScheme(scheme);
    const el = document.getElementById('requirements-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentTab('requirements');
    }
  };

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetMap: Record<string, string> = {
      profile: 'profile-section',
      scan: 'scan-section',
      schemes: 'schemes-section',
      pathway: 'pathway-section',
      requirements: 'requirements-section',
      uhv: 'uhv-section',
    };
    const targetId = targetMap[tab];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col synapse-bg text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Three.js 3D Ambient Synaptic Neural Canvas */}
      <SynapseCanvas3D />

      {/* Floating Island Navigation with Multilingual Support */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        onLoadDemo={handleLoadDemo}
        hasProfile={Boolean(profile)}
      />

      {/* Main Continuous 3D Scroll Journey */}
      <main className="flex-1 relative z-10 space-y-16">
        
        {/* Section 1: Hero with 3D perspective and Gemini AI chat bar */}
        <section id="hero-section">
          <HeroSection
            onStartProfile={() => handleNavigate('profile')}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onLoadDemo={handleLoadDemo}
            language={language}
            onOpenWhy={handleOpenWhy}
            profile={profile}
          />
        </section>

        {/* Section 2: Marquee 3D Scroll Rearrange Showcase (all cards reliably touchable/clickable) */}
        <section id="schemes-3d-rearrange">
          <ScrollRearrangeShowcase
            results={matchResults}
            language={language}
            onOpenWhy={handleOpenWhy}
            onOpenPathway={() => handleNavigate('pathway')}
            onOpenRequirements={handleOpenRequirements}
          />
        </section>

        {/* Section 3: Universal Human Values (UHV) Cell & Agricultural Ethics */}
        <Scroll3DSection id="uhv-section" depth={24} className="scroll-mt-24">
          <UHVCellSection language={language} />
        </Scroll3DSection>

        {/* Section 4: Farmer Profile Input Studio */}
        <Scroll3DSection id="profile-section" depth={26} className="scroll-mt-24">
          <FarmerProfileForm
            initialProfile={profile}
            onSubmit={handleProfileSubmit}
            language={language}
          />
        </Scroll3DSection>

        {/* Section 5: Benefit Scan Analysis Dashboard */}
        {scanSummary && (
          <Scroll3DSection id="scan-section" depth={28} className="scroll-mt-24">
            <BenefitScanView
              profile={profile}
              summary={scanSummary}
              language={language}
              onViewSchemes={() => handleNavigate('schemes')}
              onViewPathway={() => handleNavigate('pathway')}
            />
          </Scroll3DSection>
        )}

        {/* Section 6: Statutory Scheme Results Matrix */}
        <Scroll3DSection id="schemes-section" depth={28} className="scroll-mt-24">
          <SchemeCardsView
            results={matchResults}
            language={language}
            onOpenWhy={handleOpenWhy}
            onOpenPathway={() => handleNavigate('pathway')}
            onOpenRequirements={handleOpenRequirements}
          />
        </Scroll3DSection>

        {/* Section 7: Requirement Check Matrix */}
        <Scroll3DSection id="requirements-section" depth={24} className="scroll-mt-24">
          <RequirementCheckView
            profile={profile}
            results={matchResults}
            selectedScheme={selectedRequirementScheme}
            language={language}
            onViewPathway={() => handleNavigate('pathway')}
          />
        </Scroll3DSection>

        {/* Section 8: Personalized Pathway 5-Step Journey */}
        <Scroll3DSection id="pathway-section" depth={26} className="scroll-mt-24">
          <PersonalizedPathwayView
            profile={profile}
            initialSteps={pathwaySteps}
            language={language}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />
        </Scroll3DSection>

        {/* Section 9: Problem, Solution & Architecture */}
        <Scroll3DSection id="problem-solution-section" depth={22} className="scroll-mt-24">
          <ProblemSolutionSection />
        </Scroll3DSection>

      </main>

      {/* Modal: Why This Scheme? Explanation with Multilingual Support */}
      {selectedWhyScheme && (
        <WhySchemeModal
          scheme={selectedWhyScheme.scheme}
          matchResult={selectedWhyScheme.match}
          profile={profile}
          language={language}
          onClose={() => setSelectedWhyScheme(null)}
          onViewPathway={() => {
            setSelectedWhyScheme(null);
            handleNavigate('pathway');
          }}
        />
      )}

      {/* Multilingual AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        profile={profile}
        globalLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* Floating 3D Assistant Trigger Button */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 text-slate-950 font-bold rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 synapse-glow focus:outline-none"
          title="Open KisanMitra AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span className="text-xs sm:text-sm">
            {language === 'ta' ? 'கிசான்மித்ராவிடம் பேச' : language === 'hi' ? 'किसानमित्र से बात करें' : 'Talk to KisanMitra'}
          </span>
        </button>
      )}

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        language={language}
      />

    </div>
  );
}
