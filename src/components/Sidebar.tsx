import { useState } from 'react';
import type { RoutePlan } from '../types';
import { PlaceCard } from './PlaceCard';
import { Clock, Footprints, ChevronLeft, ChevronRight, Navigation } from 'lucide-react';

interface SidebarProps {
  route: RoutePlan;
  selectedStepId?: string;
  onStepClick: (stepId: string) => void;
}

export const Sidebar = ({ route, selectedStepId, onStepClick }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selectedStep = route.waypoints.find(wp => wp.id === selectedStepId);

  return (
    <div
      className={`hidden md:flex flex-col h-[calc(100vh-2rem)] fixed left-4 top-4 bottom-4 z-20 transition-all duration-500 ease-out
      ${isCollapsed ? 'w-16' : 'w-96'}
      bg-sonar-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-neon overflow-hidden`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-[-12px] translate-x-1/2 z-30 p-1 bg-sonar-accent text-sonar-bg rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer border-2 border-sonar-bg"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header Content */}
      <div className={`p-6 border-b border-white/5 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
         <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md truncate">
            {route.title || "Route Plan"}
         </h2>
         <p className="text-xs text-sonar-accent uppercase tracking-widest mt-1 mb-3 font-semibold">
            Optimized Path
         </p>

         <div className="flex gap-3 text-sm text-sonar-muted">
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                <Clock size={14} className="text-sonar-accent" /> {route.eta_min} min
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                <Footprints size={14} className="text-sonar-accent" /> {route.total_distance_km} km
            </span>
         </div>
      </div>

      {/* Collapsed State Icon */}
      <div className={`absolute top-4 left-0 right-0 flex flex-col items-center pt-8 gap-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="p-2 bg-sonar-accent/20 rounded-full text-sonar-accent">
                <Navigation size={24} />
            </div>
            <div className="h-px w-8 bg-white/10" />
            <div className="flex flex-col gap-2">
              {route.waypoints.slice(0, 5).map((wp) => (
                  <div key={wp.id} className={`w-2 h-2 rounded-full ${selectedStepId === wp.id ? 'bg-sonar-accent shadow-neon' : 'bg-white/20'}`} />
              ))}
            </div>
      </div>

      {/* Scrollable List */}
      <div className={`flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 scrollbar-hide transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>

         {/* Detailed View if selected */}
         {selectedStep && selectedStep.place_card ? (
             <div className="animate-fade-in">
                 <button
                    onClick={() => onStepClick('')}
                    className="mb-4 text-sm text-sonar-muted hover:text-white flex items-center gap-1 transition-colors hover:translate-x-[-2px]"
                 >
                    <ChevronLeft size={14} /> Back to timeline
                 </button>
                 <PlaceCard card={selectedStep.place_card} />
             </div>
         ) : (
             /* Timeline View */
             <div className="relative pl-4 pb-20">
                {/* Timeline Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-sonar-accent/50 via-sonar-accent/20 to-transparent pointer-events-none" />

                {route.waypoints.map((wp, idx) => (
                    <button
                        type="button"
                        key={wp.id}
                        onClick={() => onStepClick(wp.id)}
                        aria-current={selectedStepId === wp.id ? 'step' : undefined}
                        className={`w-full text-left relative group flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sonar-accent
                            ${selectedStepId === wp.id
                                ? 'bg-white/10 border-sonar-accent/40 shadow-[0_0_15px_rgba(25,195,125,0.1)] translate-x-1'
                                : 'hover:bg-white/5 border-transparent hover:border-white/5 hover:translate-x-1'}
                        `}
                    >
                        {/* Timeline Node */}
                        <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold z-10 border-2 mt-0.5 shadow-lg transition-transform group-hover:scale-110 ${
                            wp.type === 'start' || wp.type === 'end'
                            ? 'bg-sonar-bg border-white text-white'
                            : selectedStepId === wp.id
                                ? 'bg-sonar-accent border-sonar-accent text-sonar-bg scale-110'
                                : 'bg-sonar-surface border-sonar-accent text-sonar-accent'
                        }`}>
                            {wp.type === 'start' ? 'S' : wp.type === 'end' ? 'E' : idx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                                <h4 className={`font-medium text-sm truncate transition-colors ${selectedStepId === wp.id ? 'text-sonar-accent' : 'text-white'}`}>
                                    {wp.name}
                                </h4>
                                {wp.arrival_time && (
                                    <span className="text-[10px] text-sonar-muted bg-white/5 px-1.5 rounded shrink-0">
                                        {wp.arrival_time}
                                    </span>
                                )}
                            </div>

                            {wp.place_card?.description && (
                                <p className="text-xs text-sonar-muted line-clamp-1 group-hover:text-white/80 transition-colors">
                                    {wp.place_card?.description}
                                </p>
                            )}

                            {/* Tags or Status */}
                            {wp.place_card?.busy_level && (
                                <div className="flex gap-2 mt-2">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                                        wp.place_card.busy_level === 'high'
                                        ? 'border-red-500/30 text-red-400 bg-red-500/10'
                                        : 'border-green-500/30 text-green-400 bg-green-500/10'
                                    }`}>
                                        {wp.place_card.busy_level}
                                    </span>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
             </div>
         )}
      </div>

      {/* Footer Area */}
      <div className={`p-4 border-t border-white/5 bg-sonar-bg/50 ${isCollapsed ? 'hidden' : 'block'}`}>
        <button className="w-full py-3 rounded-xl bg-sonar-accent text-sonar-bg font-bold text-sm shadow-neon hover:shadow-neon-strong transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
            <Navigation size={16} className="group-hover:rotate-45 transition-transform" /> Start Navigation
        </button>
      </div>
    </div>
  );
};
