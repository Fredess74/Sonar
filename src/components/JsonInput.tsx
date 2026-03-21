import { useState } from 'react';
import { X } from 'lucide-react';

interface JsonInputProps {
    defaultValue: string;
    onApply: (json: string) => void;
    onClose: () => void;
}

export const JsonInput = ({ defaultValue, onApply, onClose }: JsonInputProps) => {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const handleApply = () => {
        try {
            JSON.parse(value);
            onApply(value);
            setError(null);
        } catch {
            setError("Invalid JSON format");
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] bg-sonar-bg/95 backdrop-blur-sm flex flex-col p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Edit Intent</h2>
                <button
                    onClick={onClose}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close"
                >
                    <X size={20} className="text-white" />
                </button>
            </div>

            <textarea
                className="flex-1 bg-sonar-surface border border-white/10 rounded-xl p-4 text-sm font-mono text-sonar-muted focus:outline-none focus:border-sonar-accent resize-none mb-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                spellCheck={false}
                aria-label="Edit route JSON"
            />

            {error && (
                <div className="text-red-400 text-sm mb-4 bg-red-900/20 p-2 rounded border border-red-500/20">
                    {error}
                </div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={() => setValue(defaultValue)}
                    className="flex-1 py-3 rounded-lg border border-white/10 text-sonar-muted font-medium hover:bg-white/5 transition-colors"
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex-1 py-3 rounded-lg bg-sonar-accent text-sonar-bg font-bold hover:brightness-110 transition-all shadow-lg shadow-sonar-accent/20"
                >
                    Update Route
                </button>
            </div>
        </div>
    );
};
