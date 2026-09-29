import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI client on server
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback regex / keyword extractor for robust offline / quota-limited demo mode
function extractProfileFallback(text: string) {
  const lower = text.toLowerCase();
  
  let state = 'Tamil Nadu';
  if (lower.includes('andhra')) state = 'Andhra Pradesh';
  else if (lower.includes('telangana')) state = 'Telangana';
  else if (lower.includes('karnataka')) state = 'Karnataka';
  else if (lower.includes('kerala')) state = 'Kerala';
  else if (lower.includes('punjab')) state = 'Punjab';
  else if (lower.includes('haryana')) state = 'Haryana';
  else if (lower.includes('maharashtra')) state = 'Maharashtra';
  else if (lower.includes('uttar pradesh') || lower.includes('up')) state = 'Uttar Pradesh';

  let district = 'Thanjavur';
  if (lower.includes('thanjavur') || lower.includes('tanjore')) district = 'Thanjavur';
  else if (lower.includes('madurai')) district = 'Madurai';
  else if (lower.includes('trichy') || lower.includes('tiruchirappalli')) district = 'Tiruchirappalli';
  else if (lower.includes('salem')) district = 'Salem';
  else if (lower.includes('coimbatore')) district = 'Coimbatore';

  let crop = 'Paddy';
  if (lower.includes('paddy') || lower.includes('rice') || lower.includes('நெல்')) crop = 'Paddy';
  else if (lower.includes('wheat') || lower.includes('கோதுமை')) crop = 'Wheat';
  else if (lower.includes('sugarcane') || lower.includes('கரும்பு')) crop = 'Sugarcane';
  else if (lower.includes('cotton') || lower.includes('பருத்தி')) crop = 'Cotton';
  else if (lower.includes('maize') || lower.includes('மக்காச்சோளம்')) crop = 'Maize';
  else if (lower.includes('pulse') || lower.includes('பயறு')) crop = 'Pulses';

  let landSize = 2;
  const landMatch = text.match(/(\d+(\.\d+)?)\s*(acre|acres|ஏக்கர்|hectare|hectares|ha)/i);
  if (landMatch) {
    landSize = parseFloat(landMatch[1]);
  }

  let landUnit: 'acres' | 'hectares' = 'acres';
  if (lower.includes('hectare') || lower.includes('ha')) {
    landUnit = 'hectares';
  }

  let farmerCategory = 'Small Farmer (1-2 ha / 2.5-5 acres)';
  if (landSize <= 2.5 && landUnit === 'acres') {
    farmerCategory = 'Small Farmer (1-2 ha / 2.5-5 acres)';
  } else if (landSize < 1) {
    farmerCategory = 'Marginal Farmer (< 1 ha / 2.5 acres)';
  } else if (landSize > 5 && landSize <= 10) {
    farmerCategory = 'Semi-Medium Farmer (2-4 ha)';
  } else if (landSize > 10) {
    farmerCategory = 'Medium & Large Farmer (> 4 ha)';
  }

  let need = 'Financial Support';
  if (lower.includes('insurance') || lower.includes('காப்பீடு') || lower.includes('fasal bima')) {
    need = 'Crop Insurance & Protection';
  } else if (lower.includes('machine') || lower.includes('tractor') || lower.includes('இயந்திரம்')) {
    need = 'Farm Machinery & Solar';
  } else if (lower.includes('drip') || lower.includes('water') || lower.includes('பாசனம்') || lower.includes('irrigation')) {
    need = 'Micro-Irrigation (Drip/Sprinkler)';
  } else if (lower.includes('fertilizer') || lower.includes('soil') || lower.includes('உரம்') || lower.includes('மண்')) {
    need = 'Soil Health & Fertilizer';
  } else if (lower.includes('loan') || lower.includes('credit') || lower.includes('கடன்')) {
    need = 'Credit / Working Capital Loan';
  }

  return {
    state,
    district,
    crop,
    landSize,
    landUnit,
    farmerCategory,
    need,
    intent: 'find agricultural benefits'
  };
}

// Timeout wrapper to ensure fast response even when Gemini API is throttled
async function callGeminiWithTimeout<T>(promise: Promise<T>, timeoutMs = 4500): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Gemini API timeout')), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

let quotaCooldownUntil = 0;

// 1. NLP Farmer Profile Extraction Endpoint
app.post('/api/extract-profile', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query text is required' });
  }

  if (!aiClient || Date.now() < quotaCooldownUntil) {
    const extracted = extractProfileFallback(query);
    return res.json({ profile: extracted, source: 'fallback_engine' });
  }

  try {
    const apiCall = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Extract Indian farmer agricultural profile details from this farmer query:
"${query}"

Return a valid JSON object matching the requested schema. If a value is unspecified, infer standard default context for Indian agriculture (e.g. State: Tamil Nadu, Crop: Paddy, Land: 2 acres, Category: Small Farmer).`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            state: { type: Type.STRING },
            district: { type: Type.STRING },
            crop: { type: Type.STRING },
            landSize: { type: Type.NUMBER },
            landUnit: { type: Type.STRING, enum: ['acres', 'hectares'] },
            farmerCategory: { type: Type.STRING },
            need: { type: Type.STRING },
            intent: { type: Type.STRING }
          },
          required: ['state', 'crop', 'landSize', 'farmerCategory', 'need']
        },
        systemInstruction: 'You are an Indian agricultural NLP extraction engine. Extract structured agricultural parameters from natural farmer utterances in English, Tamil, or Hindi.'
      }
    });

    const response = await callGeminiWithTimeout(apiCall, 4500);
    const parsed = JSON.parse(response.text || '{}');
    
    // Validate and normalize
    const normalized = {
      state: parsed.state || 'Tamil Nadu',
      district: parsed.district || 'Thanjavur',
      crop: parsed.crop || 'Paddy',
      landSize: Number(parsed.landSize) || 2,
      landUnit: (parsed.landUnit === 'hectares' ? 'hectares' : 'acres') as 'acres' | 'hectares',
      farmerCategory: parsed.farmerCategory || 'Small Farmer (1-2 ha / 2.5-5 acres)',
      need: parsed.need || 'Financial Support',
      intent: parsed.intent || 'find agricultural benefits'
    };

    return res.json({ profile: normalized, source: 'gemini_nlp' });
  } catch (err: any) {
    console.warn('Gemini extraction failed or timed out, using deterministic fallback:', err.message);
    const extracted = extractProfileFallback(query);
    return res.json({ profile: extracted, source: 'fallback_engine', note: 'AI quota or network fallback applied' });
  }
});

// 2. Multilingual Farmer Assistant Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, profile, language = 'en', history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const farmerContext = profile
    ? `Current Farmer Profile:
Name: ${profile.name || 'Farmer'}
Location: ${profile.district || 'Thanjavur'}, ${profile.state || 'Tamil Nadu'}
Crop: ${profile.crop || 'Paddy'}
Landholding: ${profile.landSize || 2} ${profile.landUnit || 'acres'}
Category: ${profile.farmerCategory || 'Small Farmer'}
Primary Need: ${profile.need || 'Financial Support'}`
    : 'Default Profile: Small paddy farmer with 2 acres in Thanjavur, Tamil Nadu.';

  const languagePrompt = language === 'ta'
    ? 'Respond strictly in authentic, natural Tamil (தமிழ்). Address the farmer politely with "வணக்கம்" and clear, simple agricultural instructions.'
    : language === 'hi'
    ? 'Respond strictly in polite, simple Hindi (हिंदी). Address the farmer with "नमस्ते" and provide clear step-by-step guidance.'
    : 'Respond in clear, simple English without bureaucratic jargon.';

  const promptText = `
You are KisanMitra.ai, an empathetic, expert agricultural government scheme navigator for Indian farmers.
Tagline: "From Government Schemes to Your Next Step"

${farmerContext}

Crucial Guidelines:
1. Ground your answer in the farmer's specific profile above. Do NOT repeatedly ask for info they already gave.
2. Clearly distinguish between "Potentially Relevant" schemes and "Pending Verifications" (e.g. e-KYC, VAO Adangal, Patta-Chitta).
3. Do NOT invent fake URLs or guaranteed disbursements. Refer to official portals (pmkisan.gov.in, pmfby.gov.in, TN Uzhavan).
4. Give a concrete, actionable "Next Step".
5. Language: ${languagePrompt}

Farmer Query: "${message}"
`;

  if (!aiClient || Date.now() < quotaCooldownUntil) {
    return res.json({ reply: getFallbackChatReply(message, profile, language), source: 'fallback_engine' });
  }

  try {
    const apiCall = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        temperature: 0.4,
        systemInstruction: 'You are KisanMitra.ai, the intelligent farmer-support navigator. You provide accurate, respectful, and actionable guidance on Indian government schemes without hallucination.'
      }
    });

    const response = await callGeminiWithTimeout(apiCall, 3500);
    return res.json({ reply: response.text, source: 'gemini' });
  } catch (err: any) {
    if (err?.message?.includes('quota') || err?.message?.includes('resource_exhausted') || err?.message?.includes('429')) {
      quotaCooldownUntil = Date.now() + 60000; // Cool down for 60 seconds
    }
    console.warn('Gemini chat failed or timed out, returning authentic fallback:', err.message);
    return res.json({
      reply: getFallbackChatReply(message, profile, language),
      source: 'fallback_engine',
      note: 'AI quota or network fallback applied'
    });
  }
});

// Deterministic multilingual fallback responses for agricultural guidance
function getFallbackChatReply(query: string, profile: any, lang: string): string {
  const p = profile || { state: 'Tamil Nadu', district: 'Thanjavur', crop: 'Paddy', landSize: 2 };
  const q = query.toLowerCase();

  if (lang === 'ta' || q.includes('என்ன') || q.includes('வணக்கம்')) {
    if (q.includes('செய்ய வேண்டும்') || q.includes('next step') || q.includes('அடுத்த')) {
      return `வணக்கம்! உங்கள் ${p.district} மாவட்டத்தில் உள்ள ${p.landSize} ஏக்கர் ${p.crop} விவசாயத்திற்கு, நீங்கள் எடுக்க வேண்டிய உடனடி 3 அடுத்த படிகள்:

1. **PM-KISAN e-KYC சரிபார்ப்பு**: உங்கள் pmkisan.gov.in கணக்கில் ஆதார் e-KYC மற்றும் பட்டா-சிட்டா எண் இணைக்கப்பட்டுள்ளதா என பார்க்கவும்.
2. **பயிர் காப்பீடு (PMFBY)**: இந்த பருவத்திற்கு கிராம நிர்வாக அலுவலரிடம் (VAO) 'அடங்கல்' சான்றிதழ் பெற்று, தொடக்க வேளாண்மை கூட்டுறவு வங்கியில் (PACCS) பதிவு செய்யவும்.
3. **கலைஞரின் ஒருங்கிணைந்த திட்டம்**: உங்கள் ஊராட்சி வேளாண் விரிவாக்க மையத்தில் (AEC) இலவச சான்றளிக்கப்பட்ட விதை தொகுப்பு கிடைக்கிறதா என்பதை விசாரிக்கவும்.

கூடுதல் விவரங்கள் தேவைப்பட்டால் கேட்கலாம்!`;
    }

    return `வணக்கம்! உங்கள் பண்ணை விவரங்களை நினைவில் வைத்திருக்கிறேன் (${p.district}, ${p.landSize} ஏக்கர் ${p.crop}). 

உங்களுக்கு மிகவும் பொருத்தமான அரசு திட்டங்கள்:
- **பிரதமர் கிசான் (PM-KISAN)**: ஆண்டுக்கு ₹6,000 நேரடி உதவி.
- **பயிர் காப்பீட்டு திட்டம் (PMFBY)**: நெல் பயிர்க்கான குறைந்த பிரீமியம் காப்பீடு.
- **விவசாய கடன் அட்டை (KCC)**: 4% குறைந்த வட்டியில் பயிர் கடன்.

உங்கள் அடுத்த கட்ட வழிகாட்டுதலைப் பார்க்க "Your Personalized Pathway" பகுதியை பார்வையிடலாம்.`;
  }

  if (lang === 'hi' || q.includes('क्या') || q.includes('नमस्ते')) {
    return `नमस्ते! आपके ${p.district} में ${p.landSize} एकड़ ${p.crop} खेत के लिए अनुशंसित सरकारी योजनाएं और अगले कदम:

1. **पीएम-किसान (PM-KISAN)**: ₹6,000 वार्षिक सहायता। कृपया पोर्टल पर अपनी आधार ई-केवाईसी और भूलेख (खतौनी/पट्टा) सत्यापन सुनिश्चित करें।
2. **प्रधानमंत्री फसल बीमा योजना (PMFBY)**: धान की फसल के लिए मात्र 1.5% प्रीमियम पर पूर्ण प्राकृतिक आपदा सुरक्षा।
3. **किसान क्रेडिट कार्ड (KCC)**: 4% रियायती ब्याज दर पर कृषि इनपुट हेतु कार्यशील पूंजी।

अगला कदम: स्थानीय सीएससी (CSC) या प्राथमिक कृषि सहकारी समिति (PACCS) पर जाकर आवश्यक दस्तावेजों का सत्यापन कराएं।`;
  }

  // English Default
  if (q.includes('about this project') || q.includes('what is kisanmitra') || q.includes('about kisanmitra') || q.includes('who are you') || q.includes('what do you do') || q.includes('project')) {
    return `**KisanMitra.ai — From Government Schemes to Your Next Step**

KisanMitra.ai is an intelligent farmer-support navigator built for Indian agriculture to solve "The Last-Mile Farmer Support Gap".

• **The Problem**: Dozens of central & state schemes exist, but farmers miss benefits due to fragmented information, confusing criteria, and obscure documentation.
• **Our Solution**: Farmers simply describe their farm in natural language. Gemini NLP extracts key profile variables, while our deterministic eligibility engine matches statutory rules without hallucination.
• **The 4 Steps**: Discover Schemes → Understand Eligibility ("Why?") → Detect Requirement Gaps → Follow a Personalized 5-Step Pathway to Official Portals.`;
  }

  if (q.includes('next') || q.includes('do next') || q.includes('step')) {
    return `Based on your profile as a small farmer with ${p.landSize} acres of ${p.crop} in ${p.district}, ${p.state}, here are your prioritized next steps:

1. **Complete PM-KISAN Aadhaar e-KYC**: Visit pmkisan.gov.in or your local CSC to ensure biometric/OTP verification is active.
2. **Obtain Seasonal Adangal from VAO**: Collect the crop cultivation certificate from your Village Administrative Officer to enroll in PMFBY Crop Insurance before the cutoff.
3. **Apply for Subsidized Credit (KCC)**: Submit the simplified 1-page Kisan Credit Card application at your rural bank branch for concessional working capital.

You can inspect the full step-by-step roadmap in the **Personalized Pathway** section.`;
  }

  return `Welcome to KisanMitra! I have your farm profile recorded (${p.district}, ${p.state} · ${p.landSize} acres of ${p.crop} · ${p.farmerCategory || 'Small Farmer'}).

According to our structured eligibility engine:
- **PM-KISAN**: Potentially Relevant (Annual ₹6,000 income support)
- **PMFBY Crop Insurance**: Potentially Relevant (Flood & drought protection in Cauvery delta)
- **Kisan Credit Card (KCC)**: Potentially Relevant (4% effective interest operating loan)
- **SMAM Machinery Subsidy**: Needs Verification (Up to 50% subsidy on tillers/weeders, subject to district token quota)

Would you like me to explain the exact verification requirements or guide you through your official next step?`;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'KisanMitra.ai API',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Dev / Prod static serving
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`KisanMitra full-stack server listening on http://0.0.0.0:${port}`);
});
