import { useState } from 'react';
import { X, Copy, Check, ArrowRight, Play } from 'lucide-react';
import { generateSystemPrompt } from '../utils/promptGenerator';
import type { LLMResponse } from '../types';

interface PlannerProps {
    onClose: () => void;
    onRouteGenerated: (response: LLMResponse) => void;
}

type Step = 'request' | 'prompt' | 'json';

export const Planner = ({ onClose, onRouteGenerated }: PlannerProps) => {
    const [step, setStep] = useState<Step>('request');
    const [request, setRequest] = useState('');
    const [prompt, setPrompt] = useState('');
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGeneratePrompt = () => {
        if (!request.trim()) return;
        const p = generateSystemPrompt(request);
        setPrompt(p);
        setStep('prompt');
    };

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVisualize = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            // Basic validation
            if (!parsed.routes || !Array.isArray(parsed.routes)) {
                throw new Error("JSON must contain a 'routes' array.");
            }
            onRouteGenerated(parsed as LLMResponse);
            onClose();
        } catch (e) {
            setError((e as Error).message);
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] bg-sonar-bg/95 backdrop-blur-md flex flex-col p-6 animate-fade-in text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'request' ? 'bg-sonar-accent text-sonar-bg' : 'bg-white/10 text-sonar-muted'}`}>1</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'prompt' ? 'bg-sonar-accent text-sonar-bg' : 'bg-white/10 text-sonar-muted'}`}>2</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 'json' ? 'bg-sonar-accent text-sonar-bg' : 'bg-white/10 text-sonar-muted'}`}>3</div>
                </div>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Close planner">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                {step === 'request' && (
                    <div className="flex-1 flex flex-col gap-4 animate-slide-in">
                        <h2 className="text-2xl font-bold">Where do you want to go?</h2>
                        <p className="text-sonar-muted">Describe your ideal trip. Mention themes, vibe, or specific goals.</p>
                        <textarea
                            className="flex-1 bg-sonar-surface border border-white/10 rounded-xl p-4 text-lg text-white focus:outline-none focus:border-sonar-accent resize-none placeholder-white/20"
                            placeholder="e.g. 'I want a quiet coffee tour in Soho with a focus on architecture, walking only.'"
                            aria-label="Trip description request"
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            autoFocus
                        />
                        <button
                            onClick={handleGeneratePrompt}
                            disabled={!request.trim()}
                            className="w-full py-4 rounded-xl bg-sonar-accent text-sonar-bg font-bold text-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sonar-accent/20 flex items-center justify-center gap-2"
                        >
                            Generate Prompt <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                {step === 'prompt' && (
                    <div className="flex-1 flex flex-col gap-4 animate-slide-in">
                        <h2 className="text-2xl font-bold">Copy this to ChatGPT</h2>
                        <p className="text-sonar-muted">We've built a custom prompt for you. Copy it, paste it into ChatGPT, and copy the JSON response back here.</p>

                        <div className="flex-1 relative bg-sonar-surface border border-white/10 rounded-xl overflow-hidden group">
                            <textarea
                                className="w-full h-full p-4 bg-transparent text-sm font-mono text-sonar-muted resize-none focus:outline-none"
                                aria-label="Generated ChatGPT prompt"
                                value={prompt}
                                readOnly
                            />
                            <button
                                onClick={handleCopyPrompt}
                                className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-white text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep('request')}
                                className="px-6 py-4 rounded-xl border border-white/10 text-sonar-muted font-medium hover:bg-white/5 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setStep('json')}
                                className="flex-1 py-4 rounded-xl bg-sonar-accent text-sonar-bg font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-sonar-accent/20 flex items-center justify-center gap-2"
                            >
                                I have the JSON <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'json' && (
                    <div className="flex-1 flex flex-col gap-4 animate-slide-in">
                        <h2 className="text-2xl font-bold">Paste the Response</h2>
                        <p className="text-sonar-muted">Paste the JSON response from ChatGPT below.</p>

                        <textarea
                            className={`flex-1 bg-sonar-surface border rounded-xl p-4 text-sm font-mono text-white focus:outline-none resize-none placeholder-white/20 ${error ? 'border-red-500/50' : 'border-white/10 focus:border-sonar-accent'}`}
                            placeholder="{ 'intent': ... }"
                            aria-label="Paste JSON response"
                            value={jsonInput}
                            onChange={(e) => {
                                setJsonInput(e.target.value);
                                setError(null);
                            }}
                            autoFocus
                        />

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep('prompt')}
                                className="px-6 py-4 rounded-xl border border-white/10 text-sonar-muted font-medium hover:bg-white/5 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleVisualize}
                                disabled={!jsonInput.trim()}
                                className="flex-1 py-4 rounded-xl bg-sonar-accent text-sonar-bg font-bold text-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-sonar-accent/20 flex items-center justify-center gap-2"
                            >
                                Visualize Route <Play size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
