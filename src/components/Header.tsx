import { Play, Map as MapIcon, Layers, Search, User } from 'lucide-react';
import type { RoutePlan } from '../types';

interface HeaderProps {
  onPlanClick: () => void;
  onSimulateClick: () => void;
  isSimulating: boolean;
  generatedOptions: RoutePlan[];
  onSwitchRoute: () => void;
}

export const Header = ({
  onPlanClick,
  onSimulateClick,
  isSimulating,
  generatedOptions,
  onSwitchRoute
}: HeaderProps) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 w-[90%] max-w-2xl">

      {/* Search Island */}
      <div className="flex-1 bg-sonar-surface/80 backdrop-blur-xl border border-white/10 rounded-full h-12 px-4 flex items-center gap-3 shadow-neon transition-all hover:border-sonar-accent/30 group">
        <Search size={18} className="text-sonar-muted group-hover:text-sonar-accent transition-colors" />
        <input
          type="text"
          placeholder="Where to next?"
          aria-label="Where to next?"
          className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-sonar-muted/50"
        />
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button
            className="p-1.5 hover:bg-white/10 rounded-full text-sonar-muted hover:text-white transition-colors"
            aria-label="User profile"
        >
            <User size={18} />
        </button>
      </div>

      {/* Action Island */}
      <div className="bg-sonar-surface/80 backdrop-blur-xl border border-white/10 rounded-full h-12 px-2 flex items-center gap-1 shadow-lg">
        <button
            onClick={onPlanClick}
            className="p-2.5 rounded-full hover:bg-white/10 text-sonar-accent transition-colors relative group"
            title="Plan New Trip"
            aria-label="Plan New Trip"
        >
            <MapIcon size={20} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                New Plan
            </span>
        </button>

        {generatedOptions.length > 1 && (
            <button
                onClick={onSwitchRoute}
                className="p-2.5 rounded-full hover:bg-white/10 text-white transition-colors relative group"
                title="Switch Route"
                aria-label="Switch Route"
            >
                <Layers size={20} />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                    Switch Variant
                </span>
            </button>
        )}

        <div className="w-px h-4 bg-white/10 mx-1" />

        <button
            onClick={onSimulateClick}
            className={`p-2.5 rounded-full transition-all duration-300 relative group ${
                isSimulating
                ? 'bg-sonar-accent text-sonar-bg shadow-[0_0_15px_rgba(25,195,125,0.6)]'
                : 'hover:bg-white/10 text-white'
            }`}
            title={isSimulating ? "Stop Simulation" : "Start Simulation"}
            aria-label={isSimulating ? "Stop Simulation" : "Start Simulation"}
        >
            <Play size={20} className={isSimulating ? 'fill-current' : 'ml-0.5'} />
        </button>
      </div>

      {/* Mobile Menu Trigger (Visible only on small screens if needed, but for now hidden as we use BottomSheet) */}
    </div>
  );
};
