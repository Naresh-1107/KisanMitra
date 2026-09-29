import { Scheme } from '../types';

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'pm-kisan',
    code: 'PM-KISAN',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    localName: 'பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)',
    category: 'Financial Support',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI',
    description: 'Central sector scheme providing income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
    shortExplanation: 'Direct income support of ₹2,000 every four months to support agricultural input purchases and household needs.',
    benefitAmount: '₹6,000 / year (3 installments)',
    isDemo: true,
    applicableStates: ['All'],
    applicableCrops: ['All'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Semi-Medium', 'Medium & Large'],
    maxLandAcres: 50,
    minLandAcres: 0.1,
    targetNeeds: ['Financial Support', 'Direct Income', 'Inputs & Seeds', 'General'],
    matchedFactorsTemplate: [
      'Landholding farmer category confirmed',
      'Location matches nationwide operational coverage',
      'Cultivable land ownership criteria satisfied'
    ],
    needsAttentionFactorsTemplate: [
      'Biometric or OTP-based Aadhaar e-KYC must be active',
      'Land ownership document (Patta / Chitta) seeded with PM-KISAN portal',
      'Aadhaar-seeded NPCI bank account verification required'
    ],
    whyDetails: {
      matched: [
        'Farmer category: Small Farmer (2 acres / 0.81 ha) falls within eligible family criteria.',
        'Location: Thanjavur, Tamil Nadu is fully covered under the central rollout.',
        'Primary crop: Paddy is an eligible cultivable crop under the landholding guidelines.'
      ],
      needsVerification: [
        'Aadhaar e-KYC status must be "Success" in the PM-KISAN database.',
        'Land revenue record (Patta-Chitta) must be verified by the local Village Administrative Officer (VAO).',
        'Direct Benefit Transfer (DBT) bank account must have active NPCI Aadhaar seeding.'
      ],
      simpleExplanation: 'Your profile matches the core requirements for PM-KISAN as a small landholding farmer cultivating paddy in Tamil Nadu. Income support is disbursed directly to your bank account once your e-KYC and land seeding are verified.',
      rulesSummary: 'Demonstration rule engine: Landholder family condition = MATCH, Excluded institutional/taxpayer check = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'pmk-1',
        title: 'Aadhaar e-KYC Verification',
        status: 'attention_required',
        whyItMatters: 'Mandatory by Ministry of Agriculture to prevent duplicate disbursements and ensure direct benefit transfer.',
        actionNeeded: 'Complete OTP-based e-KYC on pmkisan.gov.in using your mobile number or visit your local CSC / e-Seva centre with biometric fingerprint.',
        channel: 'pmkisan.gov.in or Common Service Centre (CSC)'
      },
      {
        id: 'pmk-2',
        title: 'Land Record Seeding (Patta / Chitta)',
        status: 'attention_required',
        whyItMatters: 'Only registered land parcel owners or legally recorded heirs are eligible for installment releases.',
        actionNeeded: 'Submit your Patta number and survey number to the local Assistant Agricultural Officer (AAO) or upload via portal.',
        channel: 'Taluk Office / Tamil Nadu Agri Dept AAO'
      },
      {
        id: 'pmk-3',
        title: 'NPCI Bank Account Aadhaar Link',
        status: 'verified',
        whyItMatters: 'Installments are routed through the Aadhaar Payment Bridge System (APBS).',
        actionNeeded: 'Confirm with your bank that your savings account is enabled for Direct Benefit Transfer (DBT).',
        channel: 'Your Local Commercial or Cooperative Bank Branch'
      }
    ],
    officialSource: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture',
    officialUrl: 'https://pmkisan.gov.in',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Check Beneficiary Status on Portal',
        description: 'Verify if your 12-digit Aadhaar or registered mobile number is already mapped in PM-KISAN records.',
        actionText: 'Check Status on pmkisan.gov.in',
        channel: 'Online Portal',
        tips: 'Keep your Aadhaar-linked mobile phone ready for OTP verification.'
      },
      {
        stepNumber: 2,
        title: 'Verify Land Record with Village Administrative Officer',
        description: 'Obtain updated Chitta-Adangal extract confirming 2 acres paddy land under your ownership in Thanjavur.',
        actionText: 'Contact Thanjavur VAO / Agri Officer',
        channel: 'Revenue / Agriculture Dept',
        tips: 'Take your latest land tax payment receipt along with your Patta passbook.'
      },
      {
        stepNumber: 3,
        title: 'Resolve Pending e-KYC at CSC',
        description: 'If OTP fails or your mobile number is not linked, visit the nearest e-Seva centre for biometric thumb verification.',
        actionText: 'Visit Nearest CSC Center',
        channel: 'CSC / e-Seva',
        tips: 'Biometric e-KYC takes less than 5 minutes and updates within 48 hours.'
      }
    ]
  },
  {
    id: 'pmfby',
    code: 'PMFBY',
    name: 'Pradhan Mantri Fasal Bima Yojana (Crop Insurance)',
    localName: 'பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
    category: 'Insurance & Risk',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI & TN Agriculture Dept',
    description: 'Comprehensive risk insurance covering crop loss from non-preventable natural risks (drought, flood, unseasonal rainfall, pests) from pre-sowing to post-harvest.',
    shortExplanation: 'Low premium crop insurance (only 1.5% - 2% paid by farmer for food crops) protecting your 2-acre paddy crop against monsoon deficit and flood inundation.',
    benefitAmount: 'Up to ₹35,000 - ₹42,000 / acre sum insured for Paddy',
    isDemo: true,
    applicableStates: ['All', 'Tamil Nadu'],
    applicableCrops: ['Paddy', 'Rice', 'Wheat', 'Pulses', 'Oilseeds', 'Cotton', 'Maize', 'Sugarcane'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Tenant / Sharecropper', 'Semi-Medium', 'Medium & Large'],
    maxLandAcres: 100,
    minLandAcres: 0.1,
    targetNeeds: ['Crop Insurance & Protection', 'Financial Support', 'Risk Mitigation'],
    matchedFactorsTemplate: [
      'Paddy is a notified food crop in Thanjavur district',
      'Small farmer premium subsidy applies (Central & State co-contribution)',
      'Applicable for upcoming Samba / Thaladi cultivation season'
    ],
    needsAttentionFactorsTemplate: [
      'Sowing certificate (Adangal extract) from VAO required for non-loanee farmers',
      'Application must be submitted before seasonal notification cut-off date',
      'Plot survey number must match land records in the insurance portal'
    ],
    whyDetails: {
      matched: [
        'Crop match: Paddy (Samba / Thaladi) is actively covered in Thanjavur delta agro-climatic zone.',
        'Location: Thanjavur is a declared notified insurance unit under PMFBY Tamil Nadu.',
        'Farmer category: Small farmers pay only 1.5% premium (balance borne by Govt).'
      ],
      needsVerification: [
        'Seasonal registration window must be currently open for the crop season.',
        'Adangal crop cultivation proof issued by VAO must confirm paddy sown.',
        'If loanee farmer with KCC, bank auto-debits; if non-loanee, self-enrollment required.'
      ],
      simpleExplanation: 'Because you cultivate paddy in the flood/cyclone-prone delta region of Thanjavur, PMFBY offers crucial protection. You pay a minimal premium of ~1.5% to insure against seasonal crop damage.',
      rulesSummary: 'Demonstration rule engine: Crop = Paddy (Notified) = MATCH, Cut-off date & VAO Adangal check = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'pmfby-1',
        title: 'Crop Sowing Certificate (Adangal / e-Adangal)',
        status: 'attention_required',
        whyItMatters: 'Proves the specific crop was actually planted on your 2 acres during the current season.',
        actionNeeded: 'Obtain signed Adangal from your Thanjavur VAO or download e-Adangal from TN e-Services.',
        channel: 'Village Administrative Officer (VAO)'
      },
      {
        id: 'pmfby-2',
        title: 'Land Ownership Document (Patta Passbook)',
        status: 'verified',
        whyItMatters: 'Confirms land title and survey parcel number for geo-tagged insurance inspection.',
        actionNeeded: 'Keep copy of Patta/Chitta showing land ownership in Thanjavur.',
        channel: 'TN AnyRural / e-Seva'
      },
      {
        id: 'pmfby-3',
        title: 'Active Bank Passbook Copy',
        status: 'verified',
        whyItMatters: 'Claim settlements and compensation are paid directly via DBT to your bank account.',
        actionNeeded: 'Ensure bank IFSC code and account number are legible on submitted copy.',
        channel: 'Commercial / PACCS Bank'
      }
    ],
    officialSource: 'Department of Agriculture, GoI & Tamil Nadu Crop Insurance Portal',
    officialUrl: 'https://pmfby.gov.in',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Check Seasonal Enrollment Cut-off Date',
        description: 'Verify the last date for paddy insurance enrollment in Thanjavur district via the portal or PACCS.',
        actionText: 'View District Cutoff Calendar',
        channel: 'PMFBY Portal',
        tips: 'Do not wait for the final week as portal traffic spikes near deadlines.'
      },
      {
        stepNumber: 2,
        title: 'Obtain Adangal from VAO',
        description: 'Request the Village Administrative Officer to record your 2-acre paddy crop in the village adangal.',
        actionText: 'Request VAO Adangal Copy',
        channel: 'Village Revenue Office',
        tips: 'Specify whether it is Kuruvai, Samba, or Thaladi season.'
      },
      {
        stepNumber: 3,
        title: 'Submit Application at Primary Agricultural Cooperative (PACCS) or CSC',
        description: 'Pay the subsidized 1.5% farmer share premium and collect the stamped insurance policy receipt.',
        actionText: 'Enroll at Local PACCS / CSC',
        channel: 'PACCS / CSC Centre',
        tips: 'Keep the acknowledgment receipt safely for any claim tracking.'
      }
    ]
  },
  {
    id: 'kcc',
    code: 'KCC',
    name: 'Kisan Credit Card (Concessional Crop Loan)',
    localName: 'விவசாய கடன் அட்டை (KCC)',
    category: 'Credit & Loan',
    ministry: 'Reserve Bank of India & NABARD',
    description: 'Provides timely credit support to farmers for cultivation expenses, post-harvest costs, and maintenance of farm assets at subsidized interest rates.',
    shortExplanation: 'Access low-interest operating credit (effective 4% per annum with 3% prompt repayment incentive) for fertilizers, seeds, and labor.',
    benefitAmount: 'Up to ₹1,60,000 collateral-free (Scale of finance for Paddy)',
    isDemo: true,
    applicableStates: ['All'],
    applicableCrops: ['All'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Tenant / Sharecropper', 'Semi-Medium', 'Medium & Large'],
    maxLandAcres: 50,
    minLandAcres: 0.1,
    targetNeeds: ['Financial Support', 'Credit / Working Capital Loan', 'Inputs & Seeds'],
    matchedFactorsTemplate: [
      'Scale of finance for 2 acres Paddy provides eligible credit limit',
      'Small farmer eligible for interest subvention of 3%',
      'Collateral-free loan up to ₹1.6 Lakh limit'
    ],
    needsAttentionFactorsTemplate: [
      'No outstanding default on existing agricultural cooperative loans',
      'Crop cultivation declaration signed with local branch manager',
      'Land revenue tax receipt for current fiscal year'
    ],
    whyDetails: {
      matched: [
        'Small farmer cultivating 2 acres paddy qualifies for scale of finance (~₹35,000 - ₹40,000 / acre in TN).',
        'Eligible for collateral-free credit limit below the ₹1.60 Lakh threshold.',
        'Effective interest rate reduced to 4% upon prompt seasonal repayment.'
      ],
      needsVerification: [
        'CIBIL / credit bureau check for prior institutional loan defaults.',
        'Current year land revenue receipt and Patta verification at branch.',
        'Cooperative bank membership or nationalized bank savings account.'
      ],
      simpleExplanation: 'Kisan Credit Card gives you working capital for seeds, fertilizers, and tractor hiring for your 2 acres of paddy, at an effective interest rate of just 4% if repaid after harvest.',
      rulesSummary: 'Demonstration rule engine: Land size 2 acres $\\le$ 5 acres = Small Farmer MATCH, Bank clearance check = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'kcc-1',
        title: 'Land Record and Current Tax Receipt',
        status: 'verified',
        whyItMatters: 'Determines the approved credit limit based on district scale of finance.',
        actionNeeded: 'Provide copy of Patta, Chitta, and latest village kist (land tax) receipt.',
        channel: 'Bank Branch / Revenue'
      },
      {
        id: 'kcc-2',
        title: 'No-Dues Certificate / Declaration',
        status: 'attention_required',
        whyItMatters: 'RBI guidelines mandate that a farmer cannot hold multiple active crop loans on the same parcel.',
        actionNeeded: 'Sign simple self-declaration confirming no default in other commercial or cooperative banks.',
        channel: 'Your Lending Bank Branch'
      }
    ],
    officialSource: 'NABARD & Ministry of Finance, Department of Financial Services',
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Collect One-Page KCC Application Form',
        description: 'Download the simplified 1-page form from pmkisan.gov.in or collect from your nearest rural bank branch.',
        actionText: 'Download KCC Application Form',
        channel: 'Bank / PM-KISAN Portal',
        tips: 'All PM-KISAN beneficiaries are eligible for fast-track KCC issuance.'
      },
      {
        stepNumber: 2,
        title: 'Submit Land Documents to Branch Manager',
        description: 'Attach copy of Aadhaar, Patta, and crop declaration for 2 acres paddy in Thanjavur.',
        actionText: 'Submit at Bank Branch',
        channel: 'Rural Bank Branch',
        tips: 'Banks are instructed to process PM-KISAN holder KCC applications within 14 days.'
      }
    ]
  },
  {
    id: 'smam-subsidy',
    code: 'SMAM',
    name: 'Sub-Mission on Agricultural Mechanization (Farm Equipment Subsidy)',
    localName: 'வேளாண் இயந்திரமயமாக்கல் துணை இயக்கம் (SMAM)',
    category: 'Farm Machinery',
    ministry: 'Department of Agriculture & Farmers Welfare, GoI & TN Agricultural Engineering Dept (AED)',
    description: 'Provides 40% to 50% capital subsidy to small and marginal farmers for purchasing modern farm equipment including power tillers, paddy transplanters, and rotavators.',
    shortExplanation: 'Subsidies up to 50% for small farmers to acquire paddy mechanization equipment (transplanters, weeders, power tillers).',
    benefitAmount: 'Up to 50% subsidy (₹50,000 - ₹1,25,000 depending on machine)',
    isDemo: true,
    applicableStates: ['All', 'Tamil Nadu'],
    applicableCrops: ['All', 'Paddy', 'Rice'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Tenant / Sharecropper'],
    maxLandAcres: 5,
    minLandAcres: 0.5,
    targetNeeds: ['Farm Machinery & Solar', 'Equipment Subsidy', 'Labor Saving'],
    matchedFactorsTemplate: [
      'Small farmer category qualifies for enhanced 50% subsidy tier',
      'Paddy cultivation machinery eligible in Cauvery delta region',
      'Valid for individual farmer ownership application'
    ],
    needsAttentionFactorsTemplate: [
      'Annual departmental allocation quotas and online token availability',
      'Quotation from authorized empanelled agricultural machinery dealer',
      'Inspection by Assistant Executive Engineer (Agricultural Engineering Dept)'
    ],
    whyDetails: {
      matched: [
        'Small farmer tier: Farmers with $< 2$ ha (5 acres) receive highest 50% subsidy priority.',
        'Paddy machinery: Power tillers and walking-type paddy transplanters are priority items in Thanjavur delta.',
        'Individual farmer registration supported under TN Uzhavan App.'
      ],
      needsVerification: [
        'Government subsidy portal token availability for the current financial quarter.',
        'Dealer proforma invoice from an empanelled OEM manufacturer.',
        'Pre-sanction order issued by Tamil Nadu Agricultural Engineering Department.'
      ],
      simpleExplanation: 'As a small farmer with 2 acres of paddy, you qualify for up to 50% financial subsidy on power weeders and tillers to reduce labor costs, subject to token availability in Thanjavur.',
      rulesSummary: 'Demonstration rule engine: Small Farmer (< 5 acres) = MATCH, Machinery Budget Token = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'smam-1',
        title: 'Online Application Token via Uzhavan App',
        status: 'attention_required',
        whyItMatters: 'Subsidies are disbursed on a first-come, first-served basis against allocated district budget.',
        actionNeeded: 'Register on agrimachinery.nic.in or TN Uzhavan App when the registration window opens.',
        channel: 'TN Uzhavan App / AED Office'
      },
      {
        id: 'smam-2',
        title: 'Empanelled Dealer Quotation',
        status: 'attention_required',
        whyItMatters: 'Only pre-tested BIS-approved machinery models from authorized manufacturers qualify for subsidy.',
        actionNeeded: 'Obtain proforma invoice from an authorized agricultural machinery dealer in Thanjavur.',
        channel: 'Authorized Agricultural Implement Dealer'
      }
    ],
    officialSource: 'Mechanization & Technology Division, MoA&FW & Tamil Nadu Agricultural Engineering Dept',
    officialUrl: 'https://agrimachinery.nic.in',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Check Token Availability on Uzhavan App',
        description: 'Verify current quarter equipment quota for Thanjavur district.',
        actionText: 'Open TN Uzhavan Portal',
        channel: 'Mobile App / Portal',
        tips: 'Tokens are usually released at the beginning of each agriculture season.'
      },
      {
        stepNumber: 2,
        title: 'Submit Pre-Sanction Application',
        description: 'Upload Patta, small farmer certificate, and dealer proforma quotation.',
        actionText: 'Submit Application with Dealer Quote',
        channel: 'AED Portal',
        tips: 'Do not purchase the equipment before receiving the formal written pre-sanction order.'
      }
    ]
  },
  {
    id: 'pdmc-irrigation',
    code: 'PMKSY-PDMC',
    name: 'Per Drop More Crop (Micro-Irrigation Subsidy)',
    localName: 'நுண்ணீர்ப்பாசன திட்டம் (சொட்டு நீர் பாசனம்)',
    category: 'Irrigation & Infrastructure',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI & TN Horticulture/Agri Dept',
    description: 'Promotes water-use efficiency through micro-irrigation systems (drip and sprinkler) with 100% subsidy for small/marginal farmers in Tamil Nadu.',
    shortExplanation: 'Financial subsidy for efficient irrigation equipment to conserve groundwater and boost crop yield.',
    benefitAmount: '100% subsidy for Small/Marginal Farmers in Tamil Nadu (up to ₹1,00,000 / ha)',
    isDemo: true,
    applicableStates: ['All', 'Tamil Nadu'],
    applicableCrops: ['All', 'Sugarcane', 'Horticulture', 'Vegetables', 'Pulses', 'Paddy'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Semi-Medium', 'Medium & Large'],
    maxLandAcres: 12.5,
    minLandAcres: 0.5,
    targetNeeds: ['Micro-Irrigation (Drip/Sprinkler)', 'Water Saving', 'Irrigation & Infrastructure'],
    matchedFactorsTemplate: [
      'Small farmer eligible for 100% subsidy under Tamil Nadu State guidelines',
      'Landholding meets size requirements for micro-irrigation layout'
    ],
    needsAttentionFactorsTemplate: [
      'Paddy conventionally uses flood irrigation; drip requires SRI / DSR crop system verification',
      'Functional borewell / farm pond water source with electricity connection required'
    ],
    whyDetails: {
      matched: [
        'Small farmer category (< 5 acres) is eligible for 100% subsidy in Tamil Nadu.',
        'Farm location in Thanjavur has active micro-irrigation implementation officers.'
      ],
      needsVerification: [
        'Paddy traditionally utilizes flood irrigation; micro-irrigation applies if converting to Drip-Paddy (SRI method) or rotating with pulses.',
        'Irrigation source (borewell / motor pump) certificate must be furnished.'
      ],
      simpleExplanation: 'While your small farmer status qualifies for up to 100% irrigation subsidy in Tamil Nadu, flood-irrigated paddy fields need departmental inspection to approve drip layout or pulse rotation.',
      rulesSummary: 'Demonstration rule engine: Small Farmer in TN = 100% subsidy rate MATCH, Paddy crop water suitability = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'pdmc-1',
        title: 'Water & Power Source Verification',
        status: 'attention_required',
        whyItMatters: 'Drip lines require pressurized water from an active pump or tube well.',
        actionNeeded: 'Produce electricity service connection number (TANGEDCO agri connection) or solar pump proof.',
        channel: 'TANGEDCO / Village Revenue'
      }
    ],
    officialSource: 'National Mission on Micro Irrigation & Tamil Nadu Horticulture Dept',
    officialUrl: 'https://pmksy.gov.in',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Consult Thanjavur Assistant Director of Horticulture / Agri',
        description: 'Inquire whether your 2-acre plot is suited for micro-irrigation or alternating pulse crops.',
        actionText: 'Locate Block Agri Office',
        channel: 'Block Level Office',
        tips: 'Bring your village field map (FMB) showing plot dimensions.'
      }
    ]
  },
  {
    id: 'tn-kalaignar-scheme',
    code: 'TN-KAVIYADP',
    name: "Tamil Nadu Kalaignarin All Village Integrated Agriculture Development Programme",
    localName: 'கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்',
    category: 'State Specific',
    ministry: 'Department of Agriculture & Farmers Welfare, Government of Tamil Nadu',
    description: 'Flagship Tamil Nadu rural program bringing holistic agricultural development: distribution of certified seed mini-kits, pulse kits, coconut seedlings, and dryland rejuvenation.',
    shortExplanation: 'State-specific free seed kits, bio-fertilizer packages, and agricultural toolkits distributed to registered farmers in participating village panchayats.',
    benefitAmount: 'Free certified seed kits + 50% to 100% input subsidies',
    isDemo: true,
    applicableStates: ['Tamil Nadu'],
    applicableCrops: ['Paddy', 'Pulses', 'Millets', 'Oilseeds', 'Cotton'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Tenant / Sharecropper'],
    maxLandAcres: 5,
    minLandAcres: 0.1,
    targetNeeds: ['Financial Support', 'Inputs & Seeds', 'Soil Health & Fertilizer'],
    matchedFactorsTemplate: [
      'Farmer is located in Tamil Nadu (Thanjavur district)',
      'Cultivates Paddy, which receives priority certified seed kits',
      'Small farmer category prioritized for village kit distribution'
    ],
    needsAttentionFactorsTemplate: [
      'Check if your specific Village Panchayat in Thanjavur is selected in the current year phase',
      'Enrollment in TN Uzhavan portal or local Agricultural Extension Centre (AEC)'
    ],
    whyDetails: {
      matched: [
        'State match: Exclusively for farmers residing and cultivating in Tamil Nadu.',
        'Crop match: Paddy growers receive certified high-yielding variety seed mini-kits (e.g. CR 1009, CO 51, ADT varieties).',
        'Farmer category: Small and marginal farmers receive 100% free distribution of seed kits.'
      ],
      needsVerification: [
        'Village panchayat selection: Program rolls out phase-wise across Tamil Nadu village panchayats.',
        'Registration at the local Agricultural Extension Centre (AEC) with Aadhaar and Patta.'
      ],
      simpleExplanation: 'Because your farm is situated in Thanjavur, Tamil Nadu, you are eligible for free certified paddy seeds and bio-fertilizer kits under this state-specific flagship scheme.',
      rulesSummary: 'Demonstration rule engine: State = Tamil Nadu MATCH, Crop = Paddy MATCH, Village Panchayat Phase = VERIFICATION REQUIRED.'
    },
    requirementsChecklist: [
      {
        id: 'tnk-1',
        title: 'Uzhavan App / AEC Enrollment',
        status: 'verified',
        whyItMatters: 'Enables agricultural officers to notify you when distribution camps are organized in your village.',
        actionNeeded: 'Register your farmer ID on TN Uzhavan App or at your block AEC.',
        channel: 'Uzhavan App / Block AEC'
      },
      {
        id: 'tnk-2',
        title: 'Village Panchayat Selection Check',
        status: 'attention_required',
        whyItMatters: 'Government selects specific clusters of village panchayats each financial year.',
        actionNeeded: 'Check with your local Assistant Agricultural Officer (AAO) if your village is in this year’s phase.',
        channel: 'Panchayat Office / AAO'
      }
    ],
    officialSource: 'Agriculture & Farmers Welfare Department, Government of Tamil Nadu',
    officialUrl: 'https://www.tn.gov.in/department/1',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Verify Village Panchayat Phase',
        description: 'Ask your local AAO if your village in Thanjavur is covered this year.',
        actionText: 'Contact Thanjavur AAO',
        channel: 'Local Agri Extension Centre',
        tips: 'Even if not in the current phase, neighboring village camps often provide seed kits.'
      },
      {
        stepNumber: 2,
        title: 'Collect Certified Seed Mini-Kit',
        description: 'Collect your allotted high-yielding paddy seed bag and bio-fertilizer packet at the village distribution camp.',
        actionText: 'Visit Village Distribution Camp',
        channel: 'Village Community Hall / AEC',
        tips: 'Bring your Aadhaar card and Patta copy for identity verification.'
      }
    ]
  },
  {
    id: 'soil-health-card',
    code: 'SHC',
    name: 'Soil Health Card & Nutrient Management',
    localName: 'மண் வள அட்டை திட்டம்',
    category: 'Soil & Inputs',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI',
    description: 'Provides customized soil nutrient analysis (NPK, micronutrients, pH, electrical conductivity) with tailored fertilizer dosage recommendations to lower input costs.',
    shortExplanation: 'Free scientific soil testing for your 2 acres to avoid overspending on urea/DAP and improve paddy yield.',
    benefitAmount: 'Free soil testing & customized dosage card',
    isDemo: true,
    applicableStates: ['All'],
    applicableCrops: ['All'],
    eligibleCategories: ['Small Farmer', 'Marginal Farmer', 'Tenant / Sharecropper', 'Semi-Medium', 'Medium & Large'],
    maxLandAcres: 100,
    minLandAcres: 0.1,
    targetNeeds: ['Soil Health & Fertilizer', 'Inputs & Seeds'],
    matchedFactorsTemplate: [
      'All landholders eligible regardless of acreage',
      'Paddy soil benefits significantly from zinc and organic carbon testing',
      'Thanjavur soil testing laboratory services available'
    ],
    needsAttentionFactorsTemplate: [
      'Collection of representative soil sample before the next ploughing/sowing cycle',
      'GPS coordinates of your Thanjavur survey plot'
    ],
    whyDetails: {
      matched: [
        'Universal coverage: Open to all farmers cultivating crops in India.',
        'Paddy benefit: Thanjavur alluvial soils frequently face micro-nutrient imbalances (Zinc, Boron) that SHC identifies.',
        'Zero cost: Testing is completely free for farmers.'
      ],
      needsVerification: [
        'Soil sample must be collected according to official grid sampling methodology before fertilizer application.'
      ],
      simpleExplanation: 'Knowing the exact nutrient profile of your 2 acres prevents wasted expenditure on chemical fertilizers and protects soil longevity.',
      rulesSummary: 'Demonstration rule engine: Universal condition = MATCH, Sample collection = PENDING ACTION.'
    },
    requirementsChecklist: [
      {
        id: 'shc-1',
        title: 'Soil Sample Collection',
        status: 'verified',
        whyItMatters: 'Accurate laboratory reading depends on proper composite sampling across 5 points of your field.',
        actionNeeded: 'Request AAO to collect sample or follow standard 15cm V-cut sampling protocol.',
        channel: 'Soil Testing Lab, Thanjavur'
      }
    ],
    officialSource: 'Integrated Nutrient Management Division, MoA&FW',
    officialUrl: 'https://soilhealth.dac.gov.in',
    lastVerified: 'September 2026',
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Request Soil Testing via AAO',
        description: 'Inform your local agricultural officer to sample your 2 acres before the upcoming sowing season.',
        actionText: 'Request Soil Sampling',
        channel: 'Block Agri Office',
        tips: 'Take samples before applying basal fertilizer or FYM.'
      }
    ]
  },
  {
    id: 'aif-storage',
    code: 'AIF',
    name: 'Agriculture Infrastructure Fund (AIF - Commercial Storage)',
    localName: 'வேளாண் உள்கட்டமைப்பு நிதி (AIF)',
    category: 'Credit & Loan',
    ministry: 'Ministry of Agriculture & Farmers Welfare, GoI',
    description: 'Medium to long term debt financing facility for investment in viable post-harvest management infrastructure and community farming assets.',
    shortExplanation: 'Commercial loan scheme with 3% interest subvention for establishing cold storage, large warehouses, or silos.',
    benefitAmount: 'Loan up to ₹2 Crores with 3% interest subvention',
    isDemo: true,
    applicableStates: ['All'],
    applicableCrops: ['All'],
    eligibleCategories: ['Medium & Large (> 4 ha)', 'FPOs / Farmer Cooperatives', 'Agri-Entrepreneurs'],
    maxLandAcres: 500,
    minLandAcres: 10,
    targetNeeds: ['Commercial Storage', 'Warehouse Construction', 'Large Infrastructure'],
    matchedFactorsTemplate: [],
    needsAttentionFactorsTemplate: [
      'Scale mismatch: Designed for post-harvest enterprise infrastructure, not individual 2-acre cultivation support',
      'Requires DPR (Detailed Project Report) and banking capital outlay'
    ],
    whyDetails: {
      matched: [],
      needsVerification: [],
      simpleExplanation: 'Does not match your current profile. This scheme is structured for large agri-entrepreneurs, Farmer Producer Organizations (FPOs), or commercial warehouse projects rather than individual small paddy farmers.',
      rulesSummary: 'Demonstration rule engine: Target Category = FPO / Enterprise, Land Size Threshold (> 10 acres) = NO MATCH.'
    },
    requirementsChecklist: [],
    officialSource: 'National Agriculture Infrastructure Fund Portal',
    officialUrl: 'https://agriinfra.dac.gov.in',
    lastVerified: 'September 2026',
    pathwaySteps: []
  }
];

export const DEMO_FARMER_PROFILE = {
  name: 'Ravi Kumar',
  state: 'Tamil Nadu',
  district: 'Thanjavur',
  crop: 'Paddy',
  landSize: 2,
  landUnit: 'acres' as const,
  farmerCategory: 'Small Farmer (1-2 ha / 2.5-5 acres)',
  need: 'Financial Support',
  queryRaw: 'I am a small farmer from Thanjavur. I have 2 acres of land and grow paddy. What government benefits may be relevant to me?'
};

export const POPULAR_INDIAN_STATES = [
  'Tamil Nadu',
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Gujarat',
  'Bihar',
  'West Bengal',
  'Odisha',
  'Rajasthan'
];

export const POPULAR_CROPS = [
  'Paddy (Rice)',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Maize',
  'Pulses (Blackgram / Greengram)',
  'Groundnut / Oilseeds',
  'Millets (Ragi / Bajra)',
  'Vegetables & Fruits',
  'Spices / Turmeric'
];

export const FARMER_CATEGORIES = [
  'Marginal Farmer (< 1 ha / 2.5 acres)',
  'Small Farmer (1-2 ha / 2.5-5 acres)',
  'Semi-Medium Farmer (2-4 ha)',
  'Medium & Large Farmer (> 4 ha)',
  'Tenant / Sharecropper'
];

export const FARMING_NEEDS = [
  'Financial Support',
  'Crop Insurance & Protection',
  'Credit / Working Capital Loan',
  'Farm Machinery & Solar',
  'Micro-Irrigation (Drip/Sprinkler)',
  'Soil Health & Fertilizer',
  'Inputs & High Yield Seeds'
];
