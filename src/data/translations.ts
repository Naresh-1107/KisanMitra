import { SupportedLanguage } from '../types';

export interface Translations {
  // Navigation
  navLiveSession: string;
  navProfile: string;
  navScan: string;
  navSchemes: string;
  navPathway: string;
  navUHV: string;
  navLoadDemo: string;
  navFindBenefits: string;

  // Hero Section
  heroPill: string;
  heroTitle1: string;
  heroTitle2: string;
  heroChatPlaceholder: string;
  heroAskAiBtn: string;
  heroSuggestionsLabel: string;
  heroSugg1: string;
  heroSugg2: string;
  heroSugg3: string;
  heroSugg4: string;
  heroBtnFind: string;
  heroBtnTalk: string;
  heroBtnDemo: string;
  heroLiveSessionHeader: string;
  heroGeoText: string;
  heroEngineText: string;
  heroStreamLabel: string;
  heroGraphLabel: string;
  heroTopSchemesLabel: string;
  heroTapForPopup: string;
  heroScrollHint: string;

  // 3D Rearrange Section
  rearrangeBadge: string;
  rearrangeTitle: string;
  rearrangeTitleSpan: string;
  rearrangeSubtitle: string;
  rearrangeAutoScroll: string;
  rearrangeFannedStack: string;
  rearrangeOrbital: string;
  rearrangeAlignedGrid: string;
  rearrangeAssistanceValue: string;
  rearrangeWhyBtn: string;
  rearrangeActionStepsBtn: string;
  rearrangeHint: string;

  // Profile Form
  profileStage: string;
  profileTitle: string;
  profileSubtitle: string;
  profileDemoNotice: string;
  profileState: string;
  profileDistrict: string;
  profileCrop: string;
  profileLandSize: string;
  profileCategory: string;
  profileNeed: string;
  profileScanBtn: string;
  profileAiExtractLabel: string;
  profileAiExtractPlaceholder: string;
  profileAiExtractBtn: string;

  // Benefit Scan
  scanStage: string;
  scanTitle: string;
  scanSubtitle: string;
  scanAnalyzing: string;
  scanRelevantCount: string;
  scanVerificationCount: string;
  scanNotMatchingCount: string;
  scanViewSchemesBtn: string;
  scanViewPathwayBtn: string;

  // Scheme Cards Matrix
  schemesStage: string;
  schemesTitle: string;
  schemesSubtitle: string;
  schemesFilterAll: string;
  schemesFilterRelevant: string;
  schemesFilterVerification: string;
  schemesFilterNotMatch: string;
  schemesWhyBtn: string;
  schemesRequirementsBtn: string;
  schemesPathwayBtn: string;

  // Requirement Check
  requirementsStage: string;
  requirementsTitle: string;
  requirementsSubtitle: string;
  requirementsStatusVerified: string;
  requirementsStatusAttention: string;
  requirementsWhyMatters: string;
  requirementsActionNeeded: string;
  requirementsChannel: string;

  // Personalized Pathway
  pathwayStage: string;
  pathwayTitle: string;
  pathwaySubtitle: string;
  pathwayProgress: string;
  pathwayStepComplete: string;
  pathwayChannelLabel: string;
  pathwayTipLabel: string;

  // UHV Section
  uhvBadge: string;
  uhvTitle: string;
  uhvTitleSpan: string;
  uhvSubtitle: string;
  uhvPrinciple1Title: string;
  uhvPrinciple1Desc: string;
  uhvPrinciple2Title: string;
  uhvPrinciple2Desc: string;
  uhvPrinciple3Title: string;
  uhvPrinciple3Desc: string;
  uhvPrinciple4Title: string;
  uhvPrinciple4Desc: string;

  // Footer
  footerTagline: string;
  footerRights: string;
  footerCellAttribution: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    navLiveSession: '3D Live Session',
    navProfile: 'Farmer Profile',
    navScan: 'Benefit Scan',
    navSchemes: 'Scheme Results',
    navPathway: 'Pathway',
    navUHV: 'UHV Cell Values',
    navLoadDemo: 'Load Demo',
    navFindBenefits: 'Find Benefits',

    heroPill: 'SYNAPSE 3D NAVIGATOR · Agricultural Benefit Engine',
    heroTitle1: 'From Government Schemes to Your',
    heroTitle2: 'Next Step.',
    heroChatPlaceholder: 'Ask Gemini AI: What is KisanMitra? How do my benefits match?...',
    heroAskAiBtn: 'Ask AI',
    heroSuggestionsLabel: 'Suggestions:',
    heroSugg1: 'What is KisanMitra.ai?',
    heroSugg2: 'The Last-Mile Support Gap',
    heroSugg3: '2 acres Paddy Thanjavur',
    heroSugg4: 'Explain in Tamil / தமிழில் சொல்லுங்கள்',
    heroBtnFind: 'Find My Benefits',
    heroBtnTalk: 'Talk to KisanMitra',
    heroBtnDemo: 'Demo Farmer (Ravi Kumar)',
    heroLiveSessionHeader: 'SESSION_0419 // LIVE AGENT ASSEMBLING',
    heroGeoText: 'GEO: THANJAVUR, TN',
    heroEngineText: 'ENGINE: DETERMINISTIC + GEMINI 3.8',
    heroStreamLabel: 'Farmer Natural Language Stream',
    heroGraphLabel: 'Extracted Farmer Profile Graph',
    heroTopSchemesLabel: 'TOP MATCHED SCHEMES',
    heroTapForPopup: '✨ Tap any card to open full details popup',
    heroScrollHint: 'SCROLL TO EXPLORE 3D PIPELINE',

    rearrangeBadge: 'Interactive 3D Spatial Pipeline',
    rearrangeTitle: 'Rearranging Schemes in',
    rearrangeTitleSpan: '3D Space',
    rearrangeSubtitle: 'Scroll down to see the matched agricultural schemes assemble and rearrange dynamically from a deep 3D fanned deck into an aligned matrix.',
    rearrangeAutoScroll: 'Auto Scroll 3D',
    rearrangeFannedStack: '3D Fanned Stack',
    rearrangeOrbital: '3D Orbital Helix',
    rearrangeAlignedGrid: '3D Aligned Matrix',
    rearrangeAssistanceValue: 'Assistance Value',
    rearrangeWhyBtn: 'Why?',
    rearrangeActionStepsBtn: 'Action Steps',
    rearrangeHint: 'Scroll up and down to observe the 3D card rearrange choreography',

    profileStage: 'STAGE 01 // CULTIVATOR IDENTITY & HOLDING',
    profileTitle: 'Farmer Profile & Agricultural Landholding',
    profileSubtitle: 'Enter your basic cultivation parameters. Our deterministic eligibility engine matches official state and central guidelines.',
    profileDemoNotice: 'Demo Profile Active (Ravi Kumar · 2 Acres Paddy · Thanjavur)',
    profileState: 'State',
    profileDistrict: 'District',
    profileCrop: 'Current Crop',
    profileLandSize: 'Landholding Size (Acres)',
    profileCategory: 'Farmer Holding Category',
    profileNeed: 'Primary Need',
    profileScanBtn: 'Run 3D Benefit Scan',
    profileAiExtractLabel: 'OR TYPE IN YOUR OWN WORDS (GEMINI AI EXTRACTION)',
    profileAiExtractPlaceholder: 'e.g. I am a small farmer in Thanjavur growing paddy on 2 acres. What schemes can I get?',
    profileAiExtractBtn: 'Extract with Gemini AI',

    scanStage: 'STAGE 02 // MULTI-SCHEME SYNAPSE SCAN',
    scanTitle: 'Agricultural Benefit Scan Results',
    scanSubtitle: '18 statutory agricultural schemes cross-referenced against your profile parameters.',
    scanAnalyzing: 'Multi-layer condition check completed',
    scanRelevantCount: 'Potentially Relevant',
    scanVerificationCount: 'Needs Attention',
    scanNotMatchingCount: 'Does Not Match',
    scanViewSchemesBtn: 'Explore Matched Schemes',
    scanViewPathwayBtn: 'View Personalized Pathway',

    schemesStage: 'STAGE 03 // STATUTORY SCHEME MATRIX',
    schemesTitle: 'Government Scheme Results',
    schemesSubtitle: 'Evaluated through deterministic condition matching against your farmer profile. Tap any card for full details.',
    schemesFilterAll: 'All Schemes',
    schemesFilterRelevant: 'Potentially Relevant',
    schemesFilterVerification: 'Needs Verification',
    schemesFilterNotMatch: 'Does Not Match',
    schemesWhyBtn: 'Why?',
    schemesRequirementsBtn: 'Requirements',
    schemesPathwayBtn: 'View Pathway',

    requirementsStage: 'STAGE 04 // ACTIONABLE GAP ANALYSIS',
    requirementsTitle: 'What Needs Your Attention?',
    requirementsSubtitle: 'Detailed inspection of unresolved statutory verifications preventing scheme disbursement.',
    requirementsStatusVerified: 'Verified & Ready',
    requirementsStatusAttention: 'Action Required',
    requirementsWhyMatters: 'Why It Matters',
    requirementsActionNeeded: 'Action Needed',
    requirementsChannel: 'Official Channel',

    pathwayStage: 'STAGE 05 // STEP-BY-STEP EMPOWERMENT',
    pathwayTitle: 'Your Personalized Pathway',
    pathwaySubtitle: 'A structured, sequential 5-step milestone roadmap to complete verification and receive official scheme benefits.',
    pathwayProgress: 'Milestone Progress',
    pathwayStepComplete: 'Mark Completed',
    pathwayChannelLabel: 'Designated Office / Portal:',
    pathwayTipLabel: 'Helpful Tip:',

    uhvBadge: 'UNIVERSAL HUMAN VALUES (UHV) CELL INITIATIVE',
    uhvTitle: 'Rooted in Universal Human Values &',
    uhvTitleSpan: 'Agricultural Harmony',
    uhvSubtitle: 'KisanMitra is architected around foundational UHV principles — fostering right understanding, mutual fulfillment between cultivator and community, and living in harmony with nature.',
    uhvPrinciple1Title: 'Right Understanding (Samyak Bodh)',
    uhvPrinciple1Desc: 'Eliminating misinformation, deception, and middlemen fees through transparent, explainable scheme matching directly grounded in statutory guidelines.',
    uhvPrinciple2Title: 'Harmony with Nature (Sah-Astitva)',
    uhvPrinciple2Desc: 'Prioritizing ecological regeneration through Soil Health Cards, PMKSY micro-irrigation water saving, and sustainable crop cycles in the Cauvery delta.',
    uhvPrinciple3Title: 'Mutual Fulfillment (Parasparikta)',
    uhvPrinciple3Desc: 'Recognizing farmers as the bedrock of societal food security, ensuring dignified and friction-free access to statutory welfare without bureaucratic hurdles.',
    uhvPrinciple4Title: 'Ethical Human Conduct (Mulya-Nishtha)',
    uhvPrinciple4Desc: 'Operating with strict integrity: zero fake URLs, zero false disbursement promises, and respectful multilingual communication honoring regional agrarian wisdom.',

    footerTagline: 'From Government Schemes to Your Next Step. Built in alignment with Universal Human Values for Indian agricultural empowerment.',
    footerRights: 'KisanMitra.ai · Universal Human Values (UHV) Cell Agricultural Navigator.',
    footerCellAttribution: 'Developed under the Universal Human Values (UHV) Cell framework · Grounded in Gemini 3.8 Flash & Deterministic Eligibility Verification.',
  },

  ta: {
    navLiveSession: '3D நேரலை அமர்வு',
    navProfile: 'விவசாயி சுயவிவரம்',
    navScan: 'திட்ட ஸ்கேன்',
    navSchemes: 'அரசு திட்டங்கள்',
    navPathway: 'வழிகாட்டுப் பாதை',
    navUHV: 'UHV மனித விழுமியங்கள்',
    navLoadDemo: 'டெமோ ஏற்றுக',
    navFindBenefits: 'பயன்களைக் காண்க',

    heroPill: 'SYNAPSE 3D வழிகாட்டி · வேளாண் நலத்திட்ட தளம்',
    heroTitle1: 'அரசு திட்டங்கள் முதல் உங்கள்',
    heroTitle2: 'அடுத்த கட்ட நடவடிக்கை வரை.',
    heroChatPlaceholder: 'ஜெமினி AI-யிடம் கேளுங்கள்: கிசான்மித்ரா என்ன செய்யும்? எனக்கு என்ன பலன்?...',
    heroAskAiBtn: 'AI-யிடம் கேட்க',
    heroSuggestionsLabel: 'பரிந்துரைகள்:',
    heroSugg1: 'கிசான்மித்ரா.ai என்றால் என்ன?',
    heroSugg2: 'கடைசி-மைல் உதவி இடைவெளி',
    heroSugg3: 'தஞ்சாவூர் 2 ஏக்கர் நெல் பயிர்',
    heroSugg4: 'எனக்கு என்ன செய்ய வேண்டும்?',
    heroBtnFind: 'எனக்கான பலன்களைக் காண்க',
    heroBtnTalk: 'கிசான்மித்ராவுடன் பேசுக',
    heroBtnDemo: 'மாதிரி விவசாயி (ரவி குமார்)',
    heroLiveSessionHeader: 'அமர்வு_0419 // நேரலை முகவர் தொகுப்பு',
    heroGeoText: 'இடம்: தஞ்சாவூர், தமிழ்நாடு',
    heroEngineText: 'இயந்திரம்: உறுதிப்படுத்தப்பட்ட விதிகள் + ஜெமினி 3.8',
    heroStreamLabel: 'விவசாயியின் நேரடி குரல்/உரை பதிவு',
    heroGraphLabel: 'பிரித்தெடுக்கப்பட்ட விவசாய நில வரைபடம்',
    heroTopSchemesLabel: 'பொருந்தக்கூடிய முதன்மை திட்டங்கள்',
    heroTapForPopup: '✨ முழு விவர பாப்-அப் திறக்க அட்டையைத் தொடவும்',
    heroScrollHint: '3D செயல்முறையைக் காண கீழே உருட்டவும்',

    rearrangeBadge: 'ஊடாடும் 3D முப்பரிமாண செயல்முறை',
    rearrangeTitle: 'திட்டங்கள் வரிசைமாறும்',
    rearrangeTitleSpan: '3D முப்பரிமாண வெளி',
    rearrangeSubtitle: 'கீழே உருட்டும்போது பொருந்தும் வேளாண் திட்டங்கள் 3D அடுக்கிலிருந்து வரிசைப்படுத்தப்பட்ட பட்டியலாக மாறுவதைப் பாருங்கள்.',
    rearrangeAutoScroll: 'தானியங்கி 3D உருளல்',
    rearrangeFannedStack: '3D அடுக்கப்பட்ட காட்சி',
    rearrangeOrbital: '3D வட்டப்பாதை காட்சி',
    rearrangeAlignedGrid: '3D நேர்த்தியான பட்டியல்',
    rearrangeAssistanceValue: 'திட்ட உதவி மதிப்பு',
    rearrangeWhyBtn: 'ஏன்?',
    rearrangeActionStepsBtn: 'நடவடிக்கை படிகள்',
    rearrangeHint: '3D அட்டை மாற்றங்களை கவனிக்க மேலும் கீழும் உருட்டவும்',

    profileStage: 'படி 01 // விவசாயி அடையாளம் மற்றும் நில விவரம்',
    profileTitle: 'விவசாயி சுயவிவரம் & நில விவரங்கள்',
    profileSubtitle: 'உங்கள் சாகுபடி விவரங்களை உள்ளிடவும். எங்கள் விதிமுறை இயந்திரம் மத்திய மற்றும் மாநில அரசு வழிகாட்டுதல்களைச் சரிபார்க்கிறது.',
    profileDemoNotice: 'டெமோ சுயவிவரம் இயங்குகிறது (ரவி குமார் · 2 ஏக்கர் நெல் · தஞ்சாவூர்)',
    profileState: 'மாநிலம்',
    profileDistrict: 'மாவட்டம்',
    profileCrop: 'தற்போதைய பயிர்',
    profileLandSize: 'நிலத்தின் அளவு (ஏக்கர்)',
    profileCategory: 'விவசாயி வகைப்பாடு',
    profileNeed: 'முதன்மைத் தேவை',
    profileScanBtn: '3D திட்ட ஸ்கேன் செய்க',
    profileAiExtractLabel: 'அல்லது உங்கள் சொந்த வார்த்தைகளில் எழுதுங்கள் (ஜெமினி AI புரிதல்)',
    profileAiExtractPlaceholder: 'எ.கா: நான் தஞ்சாவூரில் 2 ஏக்கரில் நெல் சாகுபடி செய்யும் சிறு விவசாயி. எனக்கு என்னென்ன அரசு திட்டங்கள் கிடைக்கும்?',
    profileAiExtractBtn: 'ஜெமினி AI மூலம் பிரித்தெடு',

    scanStage: 'படி 02 // பன்முக திட்ட ஸ்கேன்',
    scanTitle: 'வேளாண் பலன்கள் ஸ்கேன் முடிவுகள்',
    scanSubtitle: 'உங்கள் சுயவிவர விதிகளுடன் 18 அரசு திட்டங்கள் ஒப்பிடப்பட்டு பகுப்பாய்வு செய்யப்பட்டன.',
    scanAnalyzing: 'அரசு வழிகாட்டுதல் சரிபார்ப்பு நிறைவடைந்தது',
    scanRelevantCount: 'பொருந்தக்கூடியவை',
    scanVerificationCount: 'கவனம் தேவைப்படுபவை',
    scanNotMatchingCount: 'தற்போது பொருந்தாதவை',
    scanViewSchemesBtn: 'பொருந்திய திட்டங்களைக் காண்க',
    scanViewPathwayBtn: 'தனிப்பயன் வழியைக் காண்க',

    schemesStage: 'படி 03 // சட்டப்பூர்வ திட்ட கட்டமைப்பு',
    schemesTitle: 'அரசு திட்டங்களின் முடிவுகள்',
    schemesSubtitle: 'உங்கள் விவசாய சுயவிவரத்திற்கு ஏற்ப உறுதிப்படுத்தப்பட்ட திட்டங்கள். முழு விவரங்களுக்கு எந்த அட்டையையும் தொடவும்.',
    schemesFilterAll: 'அனைத்து திட்டங்கள்',
    schemesFilterRelevant: 'பொருந்தக்கூடியவை',
    schemesFilterVerification: 'சரிபார்ப்பு தேவை',
    schemesFilterNotMatch: 'பொருந்தாதவை',
    schemesWhyBtn: 'ஏன் பொருந்தும்?',
    schemesRequirementsBtn: 'தேவையானவை',
    schemesPathwayBtn: 'வழிகாட்டுப் பாதை',

    requirementsStage: 'படி 04 // உடனடி நடவடிக்கை பகுப்பாய்வு',
    requirementsTitle: 'உங்கள் கவனம் தேவைப்படுபவை என்ன?',
    requirementsSubtitle: 'திட்டப் பயன்களைப் பெறுவதற்கு தடையாக இருக்கும் ஆவணங்கள் மற்றும் சரிபார்ப்புகளின் பட்டியல்.',
    requirementsStatusVerified: 'சரிபார்க்கப்பட்டது (தயார்)',
    requirementsStatusAttention: 'நடவடிக்கை தேவை',
    requirementsWhyMatters: 'இது ஏன் முக்கியம்?',
    requirementsActionNeeded: 'நீங்கள் செய்ய வேண்டியது',
    requirementsChannel: 'அணுக வேண்டிய அரசு அலுவலகம்/தளம்',

    pathwayStage: 'படி 05 // படிபடியான அதிகாரமளித்தல்',
    pathwayTitle: 'உங்கள் தனிப்பயனாக்கப்பட்ட வழிகாட்டுப் பாதை',
    pathwaySubtitle: 'ஆவண சரிபார்ப்பை முடித்து அரசின் நேரடி பலன்களைப் பெறுவதற்கான 5 படிநிலைகள் கொண்ட வழிகாட்டி வரைபடம்.',
    pathwayProgress: 'முன்னேற்ற நிலை',
    pathwayStepComplete: 'முடித்ததாகக் குறிக்க',
    pathwayChannelLabel: 'குறிப்பிட்ட அலுவலகம் / இணையதளம்:',
    pathwayTipLabel: 'பயனுள்ள குறிப்பு:',

    uhvBadge: 'யுனிவர்சல் ஹ்யூமன் வேல்யூஸ் (UHV) மனித விழுமியங்கள் பிரிவு',
    uhvTitle: 'மனித விழுமியங்கள் & இயற்கை நல்லிணக்கத்தில்',
    uhvTitleSpan: 'வேரூன்றிய கட்டமைப்பு',
    uhvSubtitle: 'கிசான்மித்ரா அடிப்படை மனித விழுமியங்களின் (UHV) அடிப்படையில் உருவாக்கப்பட்டுள்ளது — சரியான புரிதல், உழவருக்கும் சமூகத்திற்கும் இடையிலான பரஸ்பர நிறைவு மற்றும் இயற்கையோடு இணக்கமான வாழ்வு.',
    uhvPrinciple1Title: 'சரியான புரிதல் (சம்யக் போத் / Right Understanding)',
    uhvPrinciple1Desc: 'இடைத்தரகர்களின் சுரண்டல் மற்றும் தவறான தகவல்களை அகற்றி, தெளிவான அரசு விதிமுறைகளை எளிய மொழியில் விவசாயிகளுக்கு நேரடியாக வெளிப்படுத்துகிறது.',
    uhvPrinciple2Title: 'இயற்கையுடன் நல்லிணக்கம் (ஸஹ-அஸ்தித்வ / Harmony with Nature)',
    uhvPrinciple2Desc: 'மண் வள அட்டை, சொட்டு நீர் பாசனம் மற்றும் நிலையான இயற்கை விவசாய சுழற்சிகளை ஊக்குவித்து நிலம் மற்றும் நீர்நிலைகளுடன் நல்லிணக்கத்தை பேணுகிறது.',
    uhvPrinciple3Title: 'பரஸ்பர நிறைவு (பரஸ்பரிக்தா / Mutual Fulfillment)',
    uhvPrinciple3Desc: 'நாட்டின் உணவுப் பாதுகாப்பின் அடித்தளமாக விளங்கும் விவசாயிகளை கண்ணியத்துடன் மதித்து, அரசின் நலத்திட்டங்களை தடையின்றி பெறுவதை உறுதி செய்கிறது.',
    uhvPrinciple4Title: 'மதிப்புமிக்க மனித நடத்தை (மூல்ய-நிஷ்டா / Ethical Conduct)',
    uhvPrinciple4Desc: 'போலி வாக்குறுதிகள், தவறான இணைப்புகள் இன்றி தூய நேர்மையுடன், உள்ளூர் வேளாண் அறிவை மதிக்கும் பலமொழி வழிகாட்டலை வழங்குகிறது.',

    footerTagline: 'அரசு திட்டங்கள் முதல் உங்கள் அடுத்த கட்ட நடவடிக்கை வரை. மனித விழுமியங்கள் மற்றும் வேளாண் முன்னேற்றத்திற்காக உருவாக்கப்பட்டது.',
    footerRights: 'கிசான்மித்ரா.ai · யுனிவர்சல் ஹ்யூமன் வேல்யூஸ் (UHV) வேளாண் வழிகாட்டி.',
    footerCellAttribution: 'யுனிவர்சல் ஹ்யூமன் வேல்யூஸ் (UHV) நெறிமுறைகளின் கீழ் உருவாக்கப்பட்டது · ஜெமினி 3.8 Flash மற்றும் சட்டப்பூர்வ சரிபார்ப்பு இயந்திரம்.',
  },

  hi: {
    navLiveSession: '3D लाइव सत्र',
    navProfile: 'किसान प्रोफ़ाइल',
    navScan: 'योजना स्कैन',
    navSchemes: 'सरकारी योजनाएं',
    navPathway: 'मार्गदर्शन',
    navUHV: 'UHV मानवीय मूल्य',
    navLoadDemo: 'डेमो लोड करें',
    navFindBenefits: 'योजनाएं खोजें',

    heroPill: 'SYNAPSE 3D नेविगेटर · कृषि कल्याण इंजन',
    heroTitle1: 'सरकारी योजनाओं से आपके',
    heroTitle2: 'अगले कदम तक।',
    heroChatPlaceholder: 'जेमिनी AI से पूछें: किसानमित्र क्या है? मेरी पात्रता कैसे तय होती है?...',
    heroAskAiBtn: 'AI से पूछें',
    heroSuggestionsLabel: 'सुझाव:',
    heroSugg1: 'किसानमित्र.ai क्या है?',
    heroSugg2: 'अंतिम-मील सहायता की समस्या',
    heroSugg3: 'तंजாவूर 2 एकड़ धान किसान',
    heroSugg4: 'मुझे आगे क्या करना चाहिए?',
    heroBtnFind: 'मेरी योजनाएं खोजें',
    heroBtnTalk: 'किसानमित्र से बात करें',
    heroBtnDemo: 'डेमो किसान (रवि कुमार)',
    heroLiveSessionHeader: 'सत्र_0419 // लाइव एजेंट संयोजन',
    heroGeoText: 'स्थान: तंजावूर, तमिलनाडु',
    heroEngineText: 'इंजन: नियम-आधारित + जेमिनी 3.8',
    heroStreamLabel: 'किसान प्राकृतिक भाषा संवाद',
    heroGraphLabel: 'किसान प्रोफ़ाइल ज्ञान आरेख',
    heroTopSchemesLabel: 'प्रमुख अनुकूल योजनाएं',
    heroTapForPopup: '✨ पूरा विवरण पॉप-अप खोलने के लिए कार्ड पर टैप करें',
    heroScrollHint: '3D पाइपलाइन देखने के लिए नीचे स्क्रॉल करें',

    rearrangeBadge: 'इंटरएक्टिव 3D स्थानिक पाइपलाइन',
    rearrangeTitle: 'योजनाओं का',
    rearrangeTitleSpan: '3D अंतरिक्ष में पुनर्व्यवस्था',
    rearrangeSubtitle: 'नीचे स्क्रॉल करें और देखें कि कैसे कृषि योजनाएं 3D स्टैक से एक व्यवस्थित तुलनात्मक ग्रिड में बदल जाती हैं।',
    rearrangeAutoScroll: 'ऑटो स्क्रॉल 3D',
    rearrangeFannedStack: '3D स्टैक दृश्य',
    rearrangeOrbital: '3D कक्षीय दृश्य',
    rearrangeAlignedGrid: '3D व्यवस्थित ग्रिड',
    rearrangeAssistanceValue: 'सहायता राशि',
    rearrangeWhyBtn: 'क्यों?',
    rearrangeActionStepsBtn: 'अगले कदम',
    rearrangeHint: '3D कार्ड विन्यास देखने के लिए ऊपर-नीचे स्क्रॉल करें',

    profileStage: 'चरण 01 // कृषक पहचान एवं भूमि विवरण',
    profileTitle: 'किसान प्रोफ़ाइल एवं जोत का आकार',
    profileSubtitle: 'अपने मूल कृषि मापदंड दर्ज करें। हमारा नियम इंजन आधिकारिक केंद्रीय एवं राज्य दिशानिर्देशों से मिलान करता है।',
    profileDemoNotice: 'डेमो प्रोफ़ाइल सक्रिय (रवि कुमार · 2 एकड़ धान · तंजावूर)',
    profileState: 'राज्य',
    profileDistrict: 'ज़िला',
    profileCrop: 'वर्तमान फ़सल',
    profileLandSize: 'भूमि का आकार (एकड़)',
    profileCategory: 'कृषक श्रेणी',
    profileNeed: 'प्राथमिक आवश्यकता',
    profileScanBtn: '3D योजना स्कैन चलाएं',
    profileAiExtractLabel: 'या अपनी भाषा में लिखें (जेमिनी AI द्वारा पहचान)',
    profileAiExtractPlaceholder: 'उदा. मैं तंजावूर में 2 एकड़ में धान उगाने वाला छोटा किसान हूं। मुझे कौन सी योजनाएं मिल सकती हैं?',
    profileAiExtractBtn: 'जेमिनी AI से पहचानें',

    scanStage: 'चरण 02 // बहु-योजना स्कैन',
    scanTitle: 'कृषि कल्याण स्कैन परिणाम',
    scanSubtitle: 'आपकी प्रोफ़ाइल के आधार पर 18 वैधानिक योजनाओं का सत्यापन किया गया।',
    scanAnalyzing: 'दिशानिर्देश मिलान प्रक्रिया पूर्ण',
    scanRelevantCount: 'संभावित अनुकूल',
    scanVerificationCount: 'सत्यापन आवश्यक',
    scanNotMatchingCount: 'वर्तमान में अनुपयुक्त',
    scanViewSchemesBtn: 'योजनाएं देखें',
    scanViewPathwayBtn: 'व्यक्तिगत मार्गदर्शन देखें',

    schemesStage: 'चरण 03 // वैधानिक योजना मैट्रिक्स',
    schemesTitle: 'सरकारी योजनाओं के परिणाम',
    schemesSubtitle: 'आपके किसान प्रोफ़ाइल के आधार पर प्रामाणिक मूल्यांकन। पूरा विवरण देखने के लिए किसी भी कार्ड पर टैप करें।',
    schemesFilterAll: 'सभी योजनाएं',
    schemesFilterRelevant: 'संभावित अनुकूल',
    schemesFilterVerification: 'सत्यापन आवश्यक',
    schemesFilterNotMatch: 'अनुपयुक्त',
    schemesWhyBtn: 'क्यों अनुकूल है?',
    schemesRequirementsBtn: 'आवश्यकताएं',
    schemesPathwayBtn: 'मार्गदर्शन देखें',

    requirementsStage: 'चरण 04 // तत्काल कार्रवाई विश्लेषण',
    requirementsTitle: 'आपके ध्यान की क्या आवश्यकता है?',
    requirementsSubtitle: 'योजना लाभ प्राप्त करने हेतु शेष दस्तावेज़ों एवं सत्यापन का विस्तृत विवरण।',
    requirementsStatusVerified: 'सत्यापित (तैयार)',
    requirementsStatusAttention: 'कार्रवाई आवश्यक',
    requirementsWhyMatters: 'यह क्यों आवश्यक है?',
    requirementsActionNeeded: 'आपको क्या करना होगा',
    requirementsChannel: 'आधिकारिक कार्यालय / पोर्टल',

    pathwayStage: 'चरण 05 // चरणबद्ध सशक्तिकरण',
    pathwayTitle: 'आपका व्यक्तिगत मार्गदर्शन पथ',
    pathwaySubtitle: 'सत्यापन पूरा करने और योजना लाभ पाने के लिए 5 चरणों का संरचित रोडमैप।',
    pathwayProgress: 'प्रगति स्थिति',
    pathwayStepComplete: 'पूर्ण चिन्हित करें',
    pathwayChannelLabel: 'निर्धारित कार्यालय / पोर्टल:',
    pathwayTipLabel: 'महत्वपूर्ण सुझाव:',

    uhvBadge: 'सार्वभौमिक मानवीय मूल्य (UHV) प्रकोष्ठ पहल',
    uhvTitle: 'सार्वभौमिक मानवीय मूल्यों एवं प्रकृति के साथ',
    uhvTitleSpan: 'समन्वय पर आधारित',
    uhvSubtitle: 'किसानमित्र की संरचना मौलिक UHV सिद्धांतों पर आधारित है — सही समझ (ज्ञान), किसान और समाज के बीच परस्पर पूरकता, तथा प्रकृति के साथ सह-अस्तित्व।',
    uhvPrinciple1Title: 'सही समझ (सम्यक बोध / Right Understanding)',
    uhvPrinciple1Desc: 'बिचौलियों और भ्रामक जानकारी को समाप्त कर, वैधानिक नियमों के आधार पर किसानों को पारदर्शी एवं स्पष्ट मार्गदर्शन प्रदान करना।',
    uhvPrinciple2Title: 'प्रकृति के साथ समन्वय (सह-अस्तित्व / Harmony with Nature)',
    uhvPrinciple2Desc: 'मृदा स्वास्थ्य कार्ड, सूक्ष्म सिंचाई और टिकाऊ फ़सल चक्रों के माध्यम से प्राकृतिक संसाधनों का संरक्षण एवं भूमि की उर्वरता बनाए रखना।',
    uhvPrinciple3Title: 'परस्पर पूरकता (पारस्परिकता / Mutual Fulfillment)',
    uhvPrinciple3Desc: 'अन्नदाता किसानों के श्रम और गरिमा का सम्मान करते हुए बिना किसी बाधा के सरकारी लाभों तक उनकी निर्बाध पहुंच सुनिश्चित करना।',
    uhvPrinciple4Title: 'मूल्य-निष्ठ मानवीय आचरण (मूल्य-निष्ठा / Ethical Conduct)',
    uhvPrinciple4Desc: 'पूर्ण सत्यनिष्ठा के साथ कार्य करना: बिना किसी झूठे वादे या भ्रामक लिंक के, क्षेत्रीय भाषा में आदरपूर्वक समाधान देना।',

    footerTagline: 'सरकारी योजनाओं से आपके अगले कदम तक। सार्वभौमिक मानवीय मूल्यों के अनुरूप निर्मित।',
    footerRights: 'किसानमित्र.ai · सार्वभौमिक मानवीय मूल्य (UHV) प्रकोष्ठ कृषि मार्गदर्शक।',
    footerCellAttribution: 'सार्वभौमिक मानवीय मूल्य (UHV) प्रकोष्ठ के तत्वावधान में विकसित · जेमिनी 3.8 Flash एवं वैधानिक नियम इंजन।',
  },
};
