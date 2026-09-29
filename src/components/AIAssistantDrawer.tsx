import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Globe,
  Volume2,
  VolumeX,
  User,
  Bot,
  Loader2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, FarmerProfile, SupportedLanguage } from '../types';
import { GeminiService } from '../services/geminiService';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfile | null;
  globalLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  globalLanguage,
  onLanguageChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message matching prompt requirements
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Vanakkam! Tell me about your farm and I’ll help you understand which government benefits may be relevant to you.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickSuggestions: [
            'Find benefits for my farm',
            'Why is this scheme relevant?',
            'What should I do next?',
            'Explain this in Tamil',
          ],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: globalLanguage,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Automatic language switch detection if user typed Tamil or asked
      let activeLang = globalLanguage;
      if (query.includes('Tamil') || query.includes('தமிழ்') || query.includes('செய்ய வேண்டும்')) {
        activeLang = 'ta';
        onLanguageChange('ta');
      } else if (query.includes('Hindi') || query.includes('हिंदी') || query.includes('क्या')) {
        activeLang = 'hi';
        onLanguageChange('hi');
      }

      const reply = await GeminiService.sendChatMessage(query, profile, activeLang);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: activeLang,
        sourceNote: 'Grounded in your session profile & official departmental rules',
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Text to Speech playback for accessibility
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (globalLanguage === 'ta') {
        utterance.lang = 'ta-IN';
      } else if (globalLanguage === 'hi') {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] synapse-glass border-l border-emerald-500/25 flex flex-col shadow-2xl animate-fadeIn">
      
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-emerald-500/15 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>KisanMitra</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            </h3>
            <p className="text-[11px] text-slate-400">
              {profile ? `${profile.district} (${profile.crop}, ${profile.landSize} ac)` : 'Session Memory Active'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-emerald-500/20 text-[11px]">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded transition-colors ${
                globalLanguage === 'en' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2 py-0.5 rounded transition-colors ${
                globalLanguage === 'ta' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-0.5 rounded transition-colors ${
                globalLanguage === 'hi' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              हिंदी
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map(msg => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-400 text-slate-950 font-medium rounded-br-none'
                    : 'bg-slate-900/90 border border-emerald-500/20 text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {!isUser && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-500/10 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>KisanMitra Navigator</span>
                    </span>
                    <button
                      onClick={() => speakText(msg.content)}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 focus:outline-none"
                      title="Read aloud in regional accent"
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>Voice</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-slate-500 px-1 font-mono">
                {msg.timestamp}
              </span>

              {/* Quick suggestion chips (for welcome message) */}
              {msg.quickSuggestions && (
                <div className="flex flex-wrap gap-1.5 pt-2 max-w-[95%]">
                  {msg.quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 text-xs text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 rounded-lg transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-3 rounded-xl bg-slate-900/60 border border-emerald-500/15 max-w-xs">
            <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>KisanMitra is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Bar */}
      <div className="px-4 py-2 bg-slate-950/50 border-t border-emerald-500/10 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 shrink-0">Try:</span>
        <button
          onClick={() => handleSend('What should I do next?')}
          className="text-emerald-400 hover:underline shrink-0"
        >
          What should I do next?
        </button>
        <span className="text-slate-600">·</span>
        <button
          onClick={() => handleSend('எனக்கு என்ன செய்ய வேண்டும்?')}
          className="text-emerald-400 hover:underline shrink-0 font-medium"
        >
          எனக்கு என்ன செய்ய வேண்டும்? (Tamil)
        </button>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-emerald-500/15 bg-slate-950/90">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              globalLanguage === 'ta'
                ? 'உங்கள் கேள்வியை இங்கே கேளுங்கள்...'
                : globalLanguage === 'hi'
                ? 'अपना प्रश्न यहाँ पूछें...'
                : 'Ask about eligibility, documents, or next steps...'
            }
            className="flex-1 bg-slate-900 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 text-slate-950 font-bold transition-colors focus:outline-none"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
