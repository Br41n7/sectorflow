
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Scissors, Info, CheckCircle2 } from 'lucide-react';
import { getStyleConsultation, StyleRecommendation } from '../services/gemini';

const AiAdvisor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<StyleRecommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await getStyleConsultation(prompt);
      setRecommendation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
          <Sparkles size={32} />
        </div>
        <h2 className="text-4xl font-display font-bold text-slate-900">AI Style Consultant</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Describe the occasion, the client's preferences, or upload an inspiration image to get professional bespoke recommendations.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full min-h-[140px] p-6 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg transition-all resize-none"
              placeholder="Example: My client is looking for a summer wedding suit in Tuscany. They want something breathable but elegant, preferably in earthy tones."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold shadow-lg shadow-indigo-600/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {loading ? 'Consulting...' : 'Ask AI Advisor'}
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {['Summer Wedding', 'Corporate Gala', 'Casual Linen', 'Winter Overcoat'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setPrompt(prev => prev + (prev ? ' ' : '') + tag)}
                className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-semibold border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                + {tag}
              </button>
            ))}
          </div>
        </form>
      </div>

      {recommendation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Scissors className="text-indigo-600" size={20} />
                Fabric & Pattern
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Fabric</label>
                  <p className="text-lg font-medium text-slate-900 mt-1">{recommendation.fabricSuggestion}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pattern Recommendation</label>
                  <p className="text-lg font-medium text-slate-900 mt-1">{recommendation.patternSuggestion}</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-indigo-900">
                <Info size={20} />
                The Designer's View
              </h3>
              <p className="text-indigo-800/80 leading-relaxed italic">
                "{recommendation.reasoning}"
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Sparkles className="text-indigo-600" size={20} />
                Styling & Accessories
              </h3>
              <ul className="space-y-3">
                {recommendation.accessories.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl text-white relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <h4 className="text-xl font-display font-bold mb-2">Create Custom Board</h4>
                <p className="text-slate-400 text-sm mb-6">Convert these recommendations into a client presentation moodboard.</p>
                <button className="px-6 py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
                  Generate Presentation
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-12 border-t border-slate-200">
        <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Powered by Google Gemini</h3>
        <div className="flex justify-center gap-8 opacity-50 grayscale">
          <img src="https://picsum.photos/seed/fabric1/100/40" alt="Fabric Brand 1" />
          <img src="https://picsum.photos/seed/fabric2/100/40" alt="Fabric Brand 2" />
          <img src="https://picsum.photos/seed/fabric3/100/40" alt="Fabric Brand 3" />
        </div>
      </div>
    </div>
  );
};

export default AiAdvisor;
