export interface FarmerProfile {
  name?: string;
  state: string;
  district: string;
  crop: string;
  landSize: number;
  landUnit: 'acres' | 'hectares';
  farmerCategory: string;
  need: string;
  queryRaw?: string;
}

export type MatchStatus = 'POTENTIALLY RELEVANT' | 'NEEDS VERIFICATION' | 'DOES NOT MATCH';

export interface RequirementItem {
  id: string;
  title: string;
  status: 'verified' | 'attention_required' | 'optional';
  whyItMatters: string;
  actionNeeded: string;
  channel: string;
}

export interface SchemePathwayStep {
  stepNumber: number;
  title: string;
  description: string;
  actionText: string;
  channel: string;
  tips: string;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  localName?: string;
  category: string;
  ministry: string;
  description: string;
  shortExplanation: string;
  benefitAmount: string;
  isDemo: boolean;
  applicableStates: string[];
  applicableCrops: string[];
  eligibleCategories: string[];
  maxLandAcres?: number;
  minLandAcres?: number;
  targetNeeds: string[];
  matchedFactorsTemplate: string[];
  needsAttentionFactorsTemplate: string[];
  whyDetails: {
    matched: string[];
    needsVerification: string[];
    simpleExplanation: string;
    rulesSummary: string;
  };
  requirementsChecklist: RequirementItem[];
  officialSource: string;
  officialUrl: string;
  lastVerified: string;
  pathwaySteps: SchemePathwayStep[];
}

export interface SchemeMatchResult {
  scheme: Scheme;
  status: MatchStatus;
  matchedFactors: string[];
  needsAttentionFactors: string[];
  score: number;
  confidenceText: string;
  plainLanguageReasoning: string;
}

export interface BenefitScanSummary {
  totalAnalyzed: number;
  potentiallyRelevant: number;
  needsVerification: number;
  noMatch: number;
  scanTimestamp: string;
}

export interface PersonalizedStep {
  stepNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  priority: 'Immediate' | 'Next' | 'Follow-up';
  schemeTag: string;
  actionText: string;
  channel: string;
  officialUrl?: string;
  detailList: string[];
}

export type SupportedLanguage = 'en' | 'ta' | 'hi';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: SupportedLanguage;
  quickSuggestions?: string[];
  sourceNote?: string;
}
