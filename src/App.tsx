import { useState, useEffect } from 'react';
import { MapComponent } from './components/Map';
import { BottomSheet } from './components/BottomSheet';
import { Planner } from './components/Planner';
import { mockRoutePlan } from './data/goldenPath';
import type { RoutePlan, LLMResponse } from './types';
import { Play, Map as MapIcon, Layers } from 'lucide-react';

function App() {
  const [routePlan, setRoutePlan] = useState<RoutePlan>(mockRoutePlan);
  const [selectedStepId, setSelectedStepId] = useState<string | undefined>(undefined);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Store all generated options to allow switching (future feature)
  const [generatedOptions, setGeneratedOptions] = useState<RoutePlan[]>([]);

  // Simulation Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
        let currentIdx = -1;
        if (selectedStepId) {
            currentIdx = routePlan.waypoints.findIndex(wp => wp.id === selectedStepId);
        }

        interval = setInterval(() => {
            currentIdx = (currentIdx + 1) % routePlan.waypoints.length;
            setSelectedStepId(routePlan.waypoints[currentIdx].id);
        }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, routePlan, selectedStepId]);

  const handleRouteGenerated = (response: LLMResponse) => {
      console.log("New Route Generated:", response);
      if (response.routes && response.routes.length > 0) {
          setGeneratedOptions(response.routes);
          setRoutePlan(response.routes[0]); // Default to the first option
          setIsPlannerOpen(false);
          setSelectedStepId(undefined);
      }
  };

  return (
    <div className="h-screen w-screen bg-sonar-bg text-sonar-text overflow-hidden relative flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex justify-between items-start pointer-events-none">
        <h1 className="text-2xl font-bold text-sonar-accent drop-shadow-md pointer-events-auto bg-sonar-bg/20 backdrop-blur-sm px-2 rounded-lg">
          Sonar
        </h1>
        <div className="flex flex-col gap-2 pointer-events-auto">
            <button
                onClick={() => setIsPlannerOpen(true)}
                className="bg-sonar-surface/80 backdrop-blur p-3 rounded-full border border-white/10 text-white shadow-lg hover:bg-sonar-surface transition-colors group"
                title="Plan New Trip"
            >
                <MapIcon size={24} className="group-hover:scale-110 transition-transform" />
            </button>

            {generatedOptions.length > 1 && (
                <button
                    onClick={() => {
                        // Simple toggle for MVP to cycle routes
                        const currentIdx = generatedOptions.findIndex(r => r === routePlan);
                        const nextIdx = (currentIdx + 1) % generatedOptions.length;
                        setRoutePlan(generatedOptions[nextIdx]);
                    }}
                    className="bg-sonar-surface/80 backdrop-blur p-3 rounded-full border border-white/10 text-white shadow-lg hover:bg-sonar-surface transition-colors"
                    title="Switch Route Option"
                >
                    <Layers size={24} />
                </button>
            )}

            <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`p-3 rounded-full border border-white/10 shadow-lg transition-colors ${
                    isSimulating ? 'bg-sonar-accent text-sonar-bg' : 'bg-sonar-surface/80 text-white hover:bg-sonar-surface'
                }`}
                title={isSimulating ? "Stop Simulation" : "Start Simulation"}
            >
                <Play size={24} className={isSimulating ? 'fill-current' : ''} />
            </button>
        </div>
      </div>

      {/* Map Layer */}
      <div className="flex-1 relative z-0">
          <MapComponent
            route={routePlan}
            selectedStepId={selectedStepId}
            onMarkerClick={setSelectedStepId}
          />
      </div>

      {/* Bottom Sheet Layer */}
      <BottomSheet
        route={routePlan}
        onStepClick={setSelectedStepId}
        selectedStepId={selectedStepId}
      />

      {/* Planner Modal */}
      {isPlannerOpen && (
          <Planner
            onClose={() => setIsPlannerOpen(false)}
            onRouteGenerated={handleRouteGenerated}
          />
      )}
    </div>
  );
}

export default App;
