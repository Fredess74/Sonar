import { useState } from 'react';
import type { RoutePlan } from '../types';
import { Clock, Footprints } from 'lucide-react';
import { PlaceCard } from './PlaceCard';

interface BottomSheetProps {
  route: RoutePlan;
  onStepClick: (stepId: string) => void;
  selectedStepId?: string;
}

export const BottomSheet = ({ route, onStepClick, selectedStepId }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const selectedStep = route.waypoints.find(wp => wp.id === selectedStepId);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-sonar-surface rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out border-t border-white/10 flex flex-col ${
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
      }`}
      style={{ height: '60vh', zIndex: 1000 }}
    >
      {/* Handle */}
      <div
        className="h-8 shrink-0 flex items-center justify-center cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full" />
      </div>

      {/* Content */}
      <div className="px-6 pb-8 overflow-y-auto flex-1">

        {/* Header Summary */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-sonar-surface py-2 z-10 border-b border-white/5">
          <div>
            <h2 className="text-xl font-bold text-white">Route Plan</h2>
            <div className="flex items-center gap-3 text-sm text-sonar-muted mt-1">
              <span className="flex items-center gap-1"><Clock size={14} /> {route.eta_min} min</span>
              <span className="flex items-center gap-1"><Footprints size={14} /> {route.total_distance_km} km</span>
            </div>
          </div>
          <button className="bg-sonar-accent text-sonar-bg px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-sonar-accent/20">
            Start
          </button>
        </div>

        {/* Selected Card View */}
        {selectedStep && selectedStep.place_card ? (
          <div className="mb-6 animate-fade-in">
             <div className="flex justify-between items-center mb-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onStepClick(''); }}
                  className="text-sonar-accent text-sm hover:underline"
                >
                  ← Back to list
                </button>
             </div>
             <PlaceCard card={selectedStep.place_card} />
          </div>
        ) : (
          /* Steps List */
          <div className="space-y-0">
            {route.waypoints.map((wp, idx) => (
              <div
                key={wp.id}
                onClick={() => onStepClick(wp.id)}
                className={`flex items-stretch gap-4 p-3 rounded-xl transition-colors cursor-pointer border relative group ${
                   selectedStepId === wp.id ? 'bg-white/5 border-sonar-accent/50' : 'hover:bg-white/5 border-transparent'
                }`}
              >
                {/* Timeline Line */}
                {idx < route.waypoints.length - 1 && (
                    <div className="absolute left-[23px] top-[36px] bottom-[-16px] w-0.5 bg-white/10 group-last:hidden" />
                )}

                <div className="flex flex-col items-center gap-1 mt-1 z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                    wp.type === 'stop' ? 'bg-sonar-accent text-sonar-bg' : 'bg-white/20 text-white'
                  }`}>
                    {idx + 1}
                  </div>
                </div>

                <div className="flex-1 pb-4">
                   <h4 className={`font-medium ${wp.type === 'stop' ? 'text-white' : 'text-sonar-muted'}`}>
                     {wp.name}
                   </h4>
                   {wp.arrival_time && (
                     <p className="text-xs text-sonar-muted mt-0.5">
                       {wp.arrival_time} • {wp.type === 'stop' ? 'Stop' : 'Walk'}
                     </p>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
