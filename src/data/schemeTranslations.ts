import { SupportedLanguage, Scheme, SchemeMatchResult } from '../types';

export interface LocalizedSchemeContent {
  name: string;
  category: string;
  benefitAmount: string;
  shortExplanation: string;
  matchedFactors: string[];
  needsAttentionFactors: string[];
  plainReasoning: string;
}

export const SCHEME_TRANSLATIONS: Record<string, Record<SupportedLanguage, LocalizedSchemeContent>> = {
  'pm-kisan': {
    en: {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'Financial Support',
      benefitAmount: '₹6,000 / year (3 installments)',
      shortExplanation: 'Direct income support of ₹2,000 every four months to support agricultural input purchases and household needs.',
      matchedFactors: [
        'Landholding farmer category confirmed',
        'Location matches nationwide operational coverage',
        'Cultivable land ownership criteria satisfied',
      ],
      needsAttentionFactors: [
        'Biometric or OTP-based Aadhaar e-KYC must be active',
        'Land ownership document (Patta / Chitta) seeded with PM-KISAN portal',
        'Aadhaar-seeded NPCI bank account verification required',
      ],
      plainReasoning: 'Your profile matches the core requirements for PM-KISAN as a small landholding farmer cultivating paddy in Tamil Nadu.',
    },
    ta: {
      name: 'பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN)',
      category: 'நிதி உதவி & வருமான ஆதரவு',
      benefitAmount: 'ஆண்டுக்கு ₹6,000 (3 தவணைகள்)',
      shortExplanation: 'விவசாய இடுபொருட்கள், உரங்கள் மற்றும் விதைகள் வாங்க 4 மாதங்களுக்கு ஒருமுறை ₹2,000 நேரடி வங்கி வரவு.',
      matchedFactors: [
        'நில உரிமையாளர் விவசாயி தகுதி உறுதிப்படுத்தப்பட்டது',
        'தமிழ்நாடு தஞ்சாவூர் பகுதி திட்டத்தின் கீழ் முழுமையாக உள்ளடங்கியுள்ளது',
        '2 ஏக்கர் சாகுபடி நில அளவுகோல் பூர்த்தி செய்யப்பட்டுள்ளது',
      ],
      needsAttentionFactors: [
        'ஆதார் e-KYC பயோமெட்ரிக் அல்லது OTP சரிபார்ப்பு முடிக்கப்பட வேண்டும்',
        'பட்டா-சிட்டா எண் PM-KISAN போர்ட்டலில் இணைக்கப்பட வேண்டும்',
        'வங்கிக் கணக்குடன் ஆதார் NPCI இணைப்பு சரிபார்க்கப்பட வேண்டும்',
      ],
      plainReasoning: 'தஞ்சாவூரில் 2 ஏக்கர் நிலத்தில் நெல் சாகுபடி செய்யும் சிறு விவசாயியாக இருப்பதால், நீங்கள் பிரதமர் கிசான் திட்டத்தின் நேரடி உதவிக்கு முழு தகுதியுடையவர்.',
    },
    hi: {
      name: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
      category: 'वित्तीय सहायता एवं आय संबल',
      benefitAmount: '₹6,000 / वर्ष (3 समान किस्तों में)',
      shortExplanation: 'कृषि इनपुट, उर्वरक एवं बीज क्रय हेतु प्रति 4 माह में ₹2,000 की सीधी बैंक अंतरण सहायता।',
      matchedFactors: [
        'भूमिधारक किसान पात्रता की पुष्टि हुई',
        'अखिल भारतीय स्तर पर योजना के तहत क्षेत्र अधिसूचित',
        '2 एकड़ कृषि योग्य भूमि का स्वामित्व मानदंड संतुष्ट',
      ],
      needsAttentionFactors: [
        'बायोमेट्रिक या ओटीपी आधारित आधार ई-केवाईसी (e-KYC) पूर्ण होना अनिवार्य',
        'भूलेख (पट्टा/खतौनी) पीएम-किसान पोर्टल पर सीड होना आवश्यक',
        'आधार-सीडेड बैंक खाते का एनपीसीआई (NPCI) सत्यापन अपेक्षित',
      ],
      plainReasoning: 'तंजावूर में 2 एकड़ में धान की खेती करने वाले छोटे किसान के रूप में आप पीएम-किसान की वार्षिक सहायता के लिए पूर्णतः पात्र हैं।',
    },
  },

  pmfby: {
    en: {
      name: 'Pradhan Mantri Fasal Bima Yojana (Crop Insurance)',
      category: 'Insurance & Risk Shield',
      benefitAmount: 'Up to ₹35,000 - ₹42,000 / acre sum insured',
      shortExplanation: 'Subsidized premium crop insurance (only 1.5% paid by farmer for food crops) protecting against natural risks.',
      matchedFactors: [
        'Paddy is a notified food crop in Thanjavur district',
        'Small farmer premium subsidy applies (Central & State co-contribution)',
        'Applicable for upcoming Samba / Thaladi cultivation season',
      ],
      needsAttentionFactors: [
        'Sowing certificate (Adangal extract) from VAO required',
        'Application must be submitted before seasonal notification cut-off date',
        'Plot survey number must match land records in the insurance portal',
      ],
      plainReasoning: 'Because you cultivate paddy in the delta region of Thanjavur, PMFBY offers vital protection at a nominal 1.5% premium.',
    },
    ta: {
      name: 'பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)',
      category: 'பயிர் காப்பீடு & இடர் பாதுகாப்பு',
      benefitAmount: 'ஏக்கருக்கு ₹35,000 முதல் ₹42,000 வரை காப்பீட்டுத் தொகை',
      shortExplanation: 'இயற்கை சீற்றங்கள், வெள்ளம் மற்றும் வறட்சியால் ஏற்படும் பயிர் இழப்பிற்கு வெறும் 1.5% மிகக் குறைந்த பிரீமியத்தில் முழு பாதுகாப்பு.',
      matchedFactors: [
        'தஞ்சாவூர் மாவட்டத்தில் நெல் அறிவிக்கப்பட்ட முதன்மை உணவுப் பயிர்',
        'சிறு விவசாயிகளுக்கான அரசு பிரீமியம் மானியம் (மத்திய & மாநில பங்கு)',
        'வரவிருக்கும் சம்பா / தாளடி சாகுபடி பருவத்திற்கு முழுமையாகப் பொருந்தும்',
      ],
      needsAttentionFactors: [
        'கிராம நிர்வாக அலுவலரிடம் (VAO) பயிர் சாகுபடி அடங்கல் சான்றிதழ் பெற வேண்டும்',
        'பருவகால பதிவு முடிவடையும் இறுதி தேதிக்குள் விண்ணப்பிக்க வேண்டும்',
        'நில சர்வே எண் காப்பீட்டு போர்ட்டலில் சரியாக பொருந்த வேண்டும்',
      ],
      plainReasoning: 'காவிரி டெல்டா பகுதியில் நெல் சாகுபடி செய்வதால், வெள்ளம் மற்றும் மழையினால் ஏற்படும் பாதிப்புகளுக்கு PMFBY மிக அவசியமான பாதுகாப்பு வழங்குகிறது.',
    },
    hi: {
      name: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
      category: 'फ़सल बीमा एवं प्राकृतिक आपदा सुरक्षा',
      benefitAmount: '₹35,000 से ₹42,000 / एकड़ तक बीमित राशि',
      shortExplanation: 'बाढ़, सूखा एवं प्राकृतिक आपदाओं से फ़सल सुरक्षा हेतु मात्र 1.5% रियायती किसान प्रीमियम पर व्यापक जोखिम सुरक्षा।',
      matchedFactors: [
        'तंजावूर ज़िले में धान एक अधिसूचित खाद्य फ़सल है',
        'लघु कृषक प्रीमियम सब्सिडी (केंद्रीय एवं राज्य अंशदान) लागू',
        'आगामी सांबा/धान बुवाई मौसम के लिए पूर्ण अनुकूल',
      ],
      needsAttentionFactors: [
        'ग्राम प्रशासनिक अधिकारी (VAO) से बुवाई प्रमाणपत्र (अडंगल) आवश्यक',
        'अधिसूचित कट-ऑफ तिथि से पूर्व आवेदन जमा करना अनिवार्य',
        'बीमा पोर्टल पर खसरा/सर्वे नंबर का भूलेख से मिलान आवश्यक',
      ],
      plainReasoning: 'तंजावूर डेल्टा क्षेत्र में धान की खेती के लिए 1.5% न्यूनतम प्रीमियम पर प्राकृतिक आपदाओं से सुरक्षा उपलब्ध है।',
    },
  },

  kcc: {
    en: {
      name: 'Kisan Credit Card (Concessional Crop Loan)',
      category: 'Credit & Working Capital',
      benefitAmount: 'Up to ₹1,60,000 collateral-free loan',
      shortExplanation: 'Access low-interest operating credit (effective 4% per annum with prompt repayment incentive) for fertilizers and seeds.',
      matchedFactors: [
        'Scale of finance for 2 acres Paddy provides eligible credit limit',
        'Small farmer eligible for interest subvention of 3%',
        'Collateral-free loan up to ₹1.6 Lakh limit',
      ],
      needsAttentionFactors: [
        'No outstanding default on existing agricultural cooperative loans',
        'Crop cultivation declaration signed with local branch manager',
        'Land revenue tax receipt for current fiscal year',
      ],
      plainReasoning: 'KCC gives you working capital for seeds, fertilizers, and machinery hiring at an effective 4% interest rate.',
    },
    ta: {
      name: 'விவசாய கடன் அட்டை (KCC பயிர் கடன்)',
      category: 'குறைந்த வட்டி பயிர் கடன்',
      benefitAmount: '₹1,60,000 வரை பிணையமில்லா சலுகைக் கடன்',
      shortExplanation: 'விதைகள், உரங்கள் மற்றும் உழவுப் பணிகளுக்கு வெறும் 4% குறைந்த வட்டியில் சரியான நேரத்தில் வங்கிக் கடன் உதவி.',
      matchedFactors: [
        '2 ஏக்கர் நெல் சாகுபடிக்கு தேவையான நிதி அளவு அங்கீகரிக்கப்பட்டுள்ளது',
        'நேரத்திற்கு திருப்பிச் செலுத்தினால் 3% வட்டி மானியம் கிடைக்கும்',
        '₹1.60 லட்சம் வரை எவ்வித நில அடமானமும் (Collateral) தேவையில்லை',
      ],
      needsAttentionFactors: [
        'கூட்டுறவு வங்கிகளில் நிலுவைக் கடன் பாக்கி எதுவும் இருக்கக்கூடாது',
        'வங்கி மேலாளரிடம் பயிர் சாகுபடி அறிவிப்பு படிவம் சமர்ப்பிக்க வேண்டும்',
        'நடப்பு ஆண்டிற்கான நில தீர்வை ரசீது (கிஸ்தி) சமர்ப்பிக்க வேண்டும்',
      ],
      plainReasoning: '2 ஏக்கர் நெல் பயிருக்கு தேவையான இடுபொருட்கள் வாங்க, ஆண்டுக்கு 4% வட்டியில் பிணையமில்லா கடன் பெற நீங்கள் தகுதியானவர்.',
    },
    hi: {
      name: 'किसान क्रेडिट कार्ड (रियायती फ़सल ऋण - KCC)',
      category: 'सस्ती कार्यशील पूंजी एवं ऋण',
      benefitAmount: '₹1,60,000 तक बिना गारंटी (कोलैटरल-फ्री) ऋण',
      shortExplanation: 'समय पर पुनर्भुगतान पर मात्र 4% प्रभावी वार्षिक ब्याज दर पर खाद, बीज एवं जुताई हेतु कार्यशील पूंजी।',
      matchedFactors: [
        '2 एकड़ धान फ़सल के स्केल ऑफ फाइनेंस के अनुसार ऋण सीमा स्वीकृत',
        'समय पर चुकाने पर 3% ब्याज छूट (सबवेंशन) की पात्रता',
        '₹1.60 लाख तक बिना किसी बंधक (Security) के ऋण सुविधा',
      ],
      needsAttentionFactors: [
        'सहकारी या बैंक में पुराना कृषि ऋण बकाया न हो',
        'स्थानीय बैंक शाखा में फ़सल बुवाई स्व-घोषणा पत्र जमा करना होगा',
        'वर्तमान वित्तीय वर्ष की लगान/भू-राजस्व रसीद आवश्यक',
      ],
      plainReasoning: 'केसीसी के माध्यम से आपको खाद, बीज और कृषि कार्यों के लिए मात्र 4% प्रभावी ब्याज दर पर सुलभ ऋण प्राप्त हो सकता है।',
    },
  },

  smam: {
    en: {
      name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      category: 'Farm Machinery Subsidy',
      benefitAmount: 'Up to 50% subsidy on tillers / weeders',
      shortExplanation: 'Financial subsidy on power tillers, rotavators, and weeders to reduce farm labor dependence.',
      matchedFactors: [
        'Small farmer holding qualifies for 50% capital subsidy rate',
        'Paddy machinery is prioritized in delta districts',
        'Individual registration supported under TN Uzhavan App',
      ],
      needsAttentionFactors: [
        'Annual departmental allocation quotas and online token availability',
        'Quotation from authorized empanelled agricultural machinery dealer',
        'Inspection by Assistant Executive Engineer (Agricultural Engineering Dept)',
      ],
      plainReasoning: 'As a small farmer with 2 acres of paddy, you qualify for up to 50% subsidy on power weeders and tillers.',
    },
    ta: {
      name: 'வேளாண் இயந்திரமயமாக்கல் திட்டம் (SMAM)',
      category: 'வேளாண் கருவி & இயந்திர மானியம்',
      benefitAmount: 'பவர் டில்லர் & களையெடுக்கும் கருவிகளுக்கு 50% மானியம்',
      shortExplanation: 'விவசாய ஆட்கள் பற்றாக்குறையை சமாளிக்க பவர் டில்லர், ரோட்டவேட்டர் போன்ற கருவிகளுக்கு 50% வரை அரசு மானியம்.',
      matchedFactors: [
        '2 ஏக்கர் வைத்துள்ள சிறு விவசாயிகளுக்கு அதிகபட்ச 50% மானிய முன்னுரிமை',
        'டெல்டா பகுதிகளில் நெல் சாகுபடி கருவிகளுக்கு முன்னுரிமை ஒதுக்கீடு',
        'உழவன் செயலி வழியாக தனிநபர் விவசாயி நேரடி பதிவு வசதி',
      ],
      needsAttentionFactors: [
        'உழவன் செயலியில் நடப்பு காலாண்டிற்கான ஆன்லைன் டோக்கன் பெற வேண்டும்',
        'அங்கீகரிக்கப்பட்ட வேளாண் கருவி டீலரிடம் விலைப்புள்ளி (Quotation) பெற வேண்டும்',
        'வேளாண் பொறியியல் துறை உதவி செயற்பொறியாளர் கள ஆய்வு',
      ],
      plainReasoning: '2 ஏக்கர் நெல் சாகுபடியில் ஆட்கள் செலவைக் குறைக்க பவர் வீடர் அல்லது டில்லர் வாங்க 50% அரசு மானியம் பெறலாம்.',
    },
    hi: {
      name: 'कृषि यंत्रीकरण उप-मिशन (SMAM यंत्र सब्सिडी)',
      category: 'कृषि यंत्र एवं उपकरण सब्सिडी',
      benefitAmount: 'पावर टिलर / वीडर पर 50% तक वित्तीय अनुदान',
      shortExplanation: 'कृषि श्रम पर निर्भरता घटाने हेतु पावर टिलर, रोटावेटर एवं पैडी वीडर की खरीद पर 50% तक सरकारी अनुदान।',
      matchedFactors: [
        'छोटे किसान श्रेणी के तहत अधिकतम 50% सब्सिडी की पात्रता',
        'धान उत्पादक क्षेत्रों में आधुनिक बुवाई-कटाई यंत्रों को प्राथमिकता',
        'ऑनलाइन पोर्टल के माध्यम से सीधा पारदर्शी टोकन आवंटन',
      ],
      needsAttentionFactors: [
        'पोर्टल पर चालू वित्तीय वर्ष का ऑनलाइन टोकन/कोटा उपलब्ध होना चाहिए',
        'पंजीकृत कृषि यंत्र विक्रेता से प्रोफ़ार्मा इनवॉइस (कोटेशन) अनिवार्य',
        'कृषि अभियांत्रिकी विभाग द्वारा भौतिक सत्यापन आवश्यक',
      ],
      plainReasoning: '2 एकड़ धान के छोटे किसान के रूप में आप कृषि उपकरणों पर 50% तक सरकारी अनुदान पाने के पात्र हैं।',
    },
  },

  'pdmc-irrigation': {
    en: {
      name: 'Per Drop More Crop (Micro-Irrigation Subsidy)',
      category: 'Irrigation & Water Conservation',
      benefitAmount: '100% subsidy for Small/Marginal Farmers in TN',
      shortExplanation: 'Financial subsidy for drip and sprinkler irrigation equipment to conserve water and boost yield.',
      matchedFactors: [
        'Small farmer eligible for 100% subsidy under Tamil Nadu guidelines',
        'Landholding meets size requirements for micro-irrigation layout',
      ],
      needsAttentionFactors: [
        'Paddy conventionally uses flood irrigation; drip requires SRI / DSR crop system verification',
        'Functional borewell / farm pond water source with electricity connection required',
      ],
      plainReasoning: 'While your small farmer status qualifies for up to 100% subsidy, flood-irrigated fields need SRI method inspection.',
    },
    ta: {
      name: 'நுண்ணீர்ப்பாசன திட்டம் (சொட்டு நீர் & தெளிப்பு பாசனம்)',
      category: 'நீர்ப்பாசனம் & நீர் சேமிப்பு',
      benefitAmount: 'தமிழக சிறு விவசாயிகளுக்கு 100% முழு மானியம்',
      shortExplanation: 'நிலத்தடி நீரைச் சேமிக்கவும் விளைச்சலை அதிகரிக்கவும் சொட்டு நீர் பாசன அமைப்புகளுக்கு முழு அரசு மானியம்.',
      matchedFactors: [
        'தமிழக அரசு விதிகளின்படி சிறு விவசாயிகளுக்கு 100% முழு மானிய உரிமை',
        '2 ஏக்கர் நிலப்பரப்பு சொட்டு நீர் பாசன அமைப்பிற்கு தகுதியானது',
      ],
      needsAttentionFactors: [
        'பாரம்பரிய வெள்ள நீர்ப்பாசனத்திற்குப் பதிலாக மாற்று பயிர் அல்லது திருந்திய நெல் சாகுபடி (SRI) முறை தேவை',
        'செயல்பாட்டில் உள்ள ஆழ்துளை கிணறு மற்றும் விவசாய மின் இணைப்பு சான்று தேவை',
      ],
      plainReasoning: 'தமிழகத்தில் சிறு விவசாயிகளுக்கு 100% பாசன மானியம் உண்டு; நெல் வயலுக்கு சொட்டு நீர் அமைக்க வேளாண் அலுவலரின் பரிந்துரை தேவை.',
    },
    hi: {
      name: 'प्रति बूंद अधिक फ़सल (सूक्ष्म सिंचाई - ड्रिप/स्प्रिंकलर)',
      category: 'सिंचाई एवं जल संरक्षण',
      benefitAmount: 'तमिलनाडु में लघु किसानों हेतु 100% पूर्ण अनुदान',
      shortExplanation: 'भूजल संरक्षण एवं फ़सल उत्पादकता वृद्धि हेतु ड्रिप एवं स्प्रिंकलर सिंचाई प्रणालियों पर भारी वित्तीय सहायता।',
      matchedFactors: [
        'राज्य नियमानुसार लघु किसानों को 100% तक अनुदान की पात्रता',
        'भूमि का आकार सूक्ष्म सिंचाई लेआउट स्थापित करने हेतु उपयुक्त',
      ],
      needsAttentionFactors: [
        'धान में बाढ़ सिंचाई की जगह ड्रिप हेतु एसआरआई (SRI) पद्धति सत्यापन आवश्यक',
        'कार्यरत नलकूप/बोरवेल एवं कृषि बिजली कनेक्शन का प्रमाणपत्र अपेक्षित',
      ],
      plainReasoning: 'लघु किसान श्रेणी में आप 100% सिंचाई सब्सिडी के पात्र हैं, धान में ड्रिप लगाने हेतु कृषि अधिकारी की मंज़ूरी आवश्यक है।',
    },
  },

  'soil-health-card': {
    en: {
      name: 'Soil Health Card & Nutrient Management',
      category: 'Soil Health & Inputs',
      benefitAmount: 'Free scientific soil test & dosage card',
      shortExplanation: 'Free scientific soil testing for your 2 acres to avoid overspending on fertilizers and improve yield.',
      matchedFactors: [
        'All landholders eligible regardless of acreage',
        'Paddy soil benefits significantly from zinc and organic carbon testing',
        'Thanjavur soil testing laboratory services available',
      ],
      needsAttentionFactors: [
        'Collection of representative soil sample before sowing cycle',
        'GPS coordinates of your Thanjavur survey plot',
      ],
      plainReasoning: 'Free soil testing identifies exact nutrient deficiencies so you only buy required fertilizers.',
    },
    ta: {
      name: 'மண் வள அட்டை திட்டம் (Soil Health Card)',
      category: 'மண் பரிசோதனை & உர மேலாண்மை',
      benefitAmount: 'இலவச மண் பரிசோதனை மற்றும் உரை வழிகாட்டி அட்டை',
      shortExplanation: 'தேவையற்ற ரசாயன உரச் செலவைக் குறைத்து நிலத்தின் வளத்தைப் பாதுகாக்க 2 ஏக்கருக்கான இலவச ஆய்வக மண் பரிசோதனை.',
      matchedFactors: [
        'நில அளவைப் பொருட்படுத்தாமல் அனைத்து விவசாயிகளுக்கும் 100% இலவசம்',
        'நெல் நிலத்திற்கு தேவையான துத்தநாகம் (Zinc) மற்றும் கரிம சத்துக்களை அளவிடுகிறது',
        'தஞ்சாவூர் மாவட்ட மண் பரிசோதனை ஆய்வக சேவை அணுகக்கூடியது',
      ],
      needsAttentionFactors: [
        'விதைப்பதற்கு முன் வயலில் 5 இடங்களில் மண் மாதிரி சேகரிக்க வேண்டும்',
        'உங்கள் நில சர்வே எண்ணின் ஜிபிஎஸ் (GPS) அமைவிடப் பதிவு',
      ],
      plainReasoning: 'மண் பரிசோதனை செய்வதன் மூலம் தேவைப்படும் உரங்களை மட்டுமே பயன்படுத்தி செலவை 30% வரை குறைக்க முடியும்.',
    },
    hi: {
      name: 'मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)',
      category: 'मृदा परीक्षण एवं पोषण प्रबंधन',
      benefitAmount: 'निःशुल्क वैज्ञानिक मिट्टी जांच एवं रिपोर्ट कार्ड',
      shortExplanation: 'रासायनिक उर्वरकों पर अनावश्यक खर्च घटाने एवं पैदावार बढ़ाने हेतु 2 एकड़ खेत की मुफ़्त प्रयोगशाला जांच।',
      matchedFactors: [
        'जोत के आकार की सीमा के बिना सभी किसानों हेतु पूर्णतः निःशुल्क',
        'धान की फसल हेतु जिंक, पोटाश एवं जैविक कार्बन स्तर की सटीक पहचान',
        'ज़िला मृदा परीक्षण प्रयोगशाला द्वारा प्रमाणित रिपोर्ट',
      ],
      needsAttentionFactors: [
        'बुवाई से पूर्व खेत से वैज्ञानिक विधि से मिट्टी का नमूना एकत्र करना',
        'खेत के भूखंड का जीपीएस (GPS) निर्देशांक दर्ज कराना',
      ],
      plainReasoning: 'मिट्टी की जांच से अनावश्यक यूरिया/डीएपी की बर्बादी रुकती है और भूमि की प्राकृतिक उर्वरता सुरक्षित रहती है।',
    },
  },

  'tn-kalaignar-scheme': {
    en: {
      name: "Tamil Nadu Kalaignarin Integrated Agriculture Programme",
      category: 'State Flagship Support',
      benefitAmount: 'Free certified seed kits + input packages',
      shortExplanation: 'State-specific free seed kits, bio-fertilizer packages, and agricultural toolkits distributed to registered farmers.',
      matchedFactors: [
        'Farmer is located in Tamil Nadu (Thanjavur district)',
        'Cultivates Paddy, which receives priority certified seed kits',
        'Small farmer category prioritized for village kit distribution',
      ],
      needsAttentionFactors: [
        'Check if your specific Village Panchayat in Thanjavur is selected in current phase',
        'Enrollment in TN Uzhavan portal or local Agricultural Extension Centre (AEC)',
      ],
      plainReasoning: 'Because your farm is in Thanjavur, you qualify for free certified paddy seeds and bio-fertilizer packages.',
    },
    ta: {
      name: 'கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்',
      category: 'தமிழக அரசின் முதன்மைத் திட்டம்',
      benefitAmount: 'இலவச சான்றளிக்கப்பட்ட விதை தொகுப்பு & இடுபொருட்கள்',
      shortExplanation: 'கிராம பஞ்சாயத்துகளில் பதிவு செய்த சிறு விவசாயிகளுக்கு இலவச நெல் விதை மினி-கிட் மற்றும் நுண்ணுயிர் உரத் தொகுப்புகள்.',
      matchedFactors: [
        'விவசாயி தமிழ்நாட்டில் (தஞ்சாவூர் மாவட்டம்) சாகுபடி செய்கிறார்',
        'முன்னுரிமை பெற்ற நெல் பயிர் சாகுபடிக்கு சான்றளிக்கப்பட்ட விதை கிட் பொருந்தும்',
        'கிராம அளவில் விநியோகிக்கப்படும் தொகுப்பில் சிறு விவசாயிகளுக்கு முன்னுரிமை',
      ],
      needsAttentionFactors: [
        'தஞ்சாவூரில் உங்கள் குறிப்பிட்ட கிராம பஞ்சாயத்து நடப்பு கட்டத்தில் தேர்வு செய்யப்பட்டுள்ளதா என பார்க்கவும்',
        'உழவன் செயலி அல்லது வட்டார வேளாண் விரிவாக்க மையத்தில் (AEC) பதிவு',
      ],
      plainReasoning: 'தமிழ்நாடு விவசாயி என்பதால், வட்டார வேளாண் மையத்தில் இலவச விதை மற்றும் உயிர் உரத் தொகுப்பு பெற நீங்கள் தகுதியானவர்.',
    },
    hi: {
      name: 'तमिलनाडु कलैग्नार एकीकृत कृषि विकास कार्यक्रम',
      category: 'राज्य स्तरीय विशेष कृषि संबल',
      benefitAmount: 'मुफ़्त प्रमाणित बीज मिनी-किट एवं जैविक खाद पैकेज',
      shortExplanation: 'चयनित ग्राम पंचायतों के पंजीकृत किसानों को निःशुल्क उन्नत धान बीज किट एवं कृषि उपकरण पैकेज का वितरण।',
      matchedFactors: [
        'किसान तमिलनाडु (तंजावूर ज़िले) में कृषि कार्य करता है',
        'धान उत्पादक होने के कारण प्रमाणित बीज मिनी-किट हेतु प्राथमिकता',
        'ग्राम स्तरीय वितरण में लघु एवं सीमांत किसानों को अग्रिम वरीयता',
      ],
      needsAttentionFactors: [
        'जांचें कि आपकी ग्राम पंचायत इस वर्ष के चरण में चयनित है या नहीं',
        'उझवन पोर्टल अथवा स्थानीय कृषि विस्तार केंद्र (AEC) में पंजीकरण',
      ],
      plainReasoning: 'तमिलनाडु का किसान होने के कारण आप स्थानीय कृषि विस्तार केंद्र से निःशुल्क बीज किट प्राप्त करने के पात्र हैं।',
    },
  },
};

export function getLocalizedSchemeData(scheme: Scheme, lang: SupportedLanguage): LocalizedSchemeContent {
  const schemeEntry = SCHEME_TRANSLATIONS[scheme.id];
  if (schemeEntry && schemeEntry[lang]) {
    return schemeEntry[lang];
  }
  if (schemeEntry && schemeEntry.en) {
    return schemeEntry.en;
  }
  return {
    name: lang === 'ta' && scheme.localName ? scheme.localName : scheme.name,
    category: scheme.category,
    benefitAmount: scheme.benefitAmount,
    shortExplanation: scheme.shortExplanation,
    matchedFactors: scheme.matchedFactorsTemplate || [],
    needsAttentionFactors: scheme.needsAttentionFactorsTemplate || [],
    plainReasoning: scheme.whyDetails?.simpleExplanation || scheme.shortExplanation,
  };
}
