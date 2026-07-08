import { useState, useEffect } from 'react';
import type { RoutePlan } from '../types';
import { Clock, Footprints, X } from 'lucide-react';
import { PlaceCard } from './PlaceCard';

interface BottomSheetProps {
  route: RoutePlan;
  onStepClick: (stepId: string) => void;
  selectedStepId?: string;
}

export const BottomSheet = ({ route, onStepClick, selectedStepId }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedStepId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [selectedStepId]);

  const selectedStep = route.waypoints.find(wp => wp.id === selectedStepId);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-sonar-surface/95 backdrop-blur-xl rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out border-t border-white/10 flex flex-col z-[1000]"
      style={{
          height: '60vh',
          transform: isOpen ? 'translateY(0)' : 'translateY(calc(100% - 140px))'
      }}
    >
      {/* Handle */}
      <button
        type="button"
        aria-label={isOpen ? "Collapse route details" : "Expand route details"}
        aria-expanded={isOpen}
        className="h-8 shrink-0 flex items-center justify-center cursor-pointer w-full hover:bg-white/5 active:bg-white/10 transition-colors rounded-t-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sonar-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full" />
      </button>

      {/* Content */}
      <div className="px-6 pb-8 overflow-y-auto flex-1 scrollbar-hide">

        {/* Header Summary */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-white leading-tight">
                    {route.title || "Your Route"}
                </h2>
                {route.description && (
                    <p className="text-sm text-sonar-muted line-clamp-2 mt-1">
                        {route.description}
                    </p>
                )}
            </div>
            {/* "Start" button could be here, or maybe just stats */}
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-sonar-accent bg-sonar-accent/10 px-4 py-3 rounded-xl border border-sonar-accent/20 w-fit">
            <span className="flex items-center gap-1.5"><Clock size={16} /> {route.eta_min} min</span>
            <div className="w-px h-4 bg-sonar-accent/20" />
            <span className="flex items-center gap-1.5"><Footprints size={16} /> {route.total_distance_km} km</span>
          </div>
        </div>

        {/* Selected Card View */}
        {selectedStep && selectedStep.place_card ? (
          <div className="animate-slide-up pb-20">
             <div className="flex justify-between items-center mb-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onStepClick(''); }}
                  className="flex items-center gap-2 text-sonar-muted hover:text-white transition-colors text-sm font-medium bg-white/5 px-3 py-1.5 rounded-lg"
                >
                  <X size={14} /> Close
                </button>
             </div>
             <PlaceCard card={selectedStep.place_card} />
          </div>
        ) : (
          /* Steps List */
          <div className="space-y-0 pb-10 relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-white/10 -z-10" />

            {route.waypoints.map((wp, idx) => (
              <button
                key={wp.id}
                type="button"
                aria-current={selectedStepId === wp.id ? 'step' : undefined}
                onClick={() => onStepClick(wp.id)}
                className={`w-full text-left flex items-start gap-4 p-3 rounded-xl transition-all cursor-pointer border group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent ${
                   selectedStepId === wp.id
                   ? 'bg-white/10 border-sonar-accent/50 scale-[1.02] shadow-lg'
                   : 'hover:bg-white/5 border-transparent'
                }`}
              >
                {/* Icon/Number */}
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold shadow-lg z-10 border-2 mt-1 ${
                    wp.type === 'start' || wp.type === 'end'
                    ? 'bg-sonar-bg border-white text-white'
                    : wp.type === 'stop'
                        ? 'bg-sonar-accent border-sonar-accent text-sonar-bg'
                        : 'bg-sonar-surface border-white/20 text-sonar-muted'
                }`}>
                    {wp.type === 'start' ? 'S' : wp.type === 'end' ? 'E' : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start">
                       <h4 className={`font-medium truncate pr-2 ${wp.type === 'stop' ? 'text-white text-lg' : 'text-sonar-muted'}`}>
                         {wp.name}
                       </h4>
                       {wp.arrival_time && (
                         <span className="text-xs text-sonar-muted bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                           {wp.arrival_time}
                         </span>
                       )}
                   </div>

                   {wp.place_card?.why_here && (
                       <p className="text-sm text-sonar-accent/80 mt-1 line-clamp-1 italic">
                           "{wp.place_card.why_here}"
                       </p>
                   )}

                   <p className="text-xs text-sonar-muted mt-1 capitalize flex items-center gap-1">
                       {wp.type}
                       {wp.type === 'stop' && wp.place_card?.busy_level && (
                           <>• <span className={wp.place_card.busy_level === 'high' ? 'text-red-400' : 'text-green-400'}>{wp.place_card.busy_level} crowd</span></>
                       )}
                   </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
