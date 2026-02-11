import { useState, useEffect } from 'react';
import { MapComponent } from './components/Map';
import { BottomSheet } from './components/BottomSheet';
import { JsonInput } from './components/JsonInput';
import { mockIntent, mockRoutePlan } from './data/goldenPath';
import type { RoutePlan } from './types';
import { Settings, Play } from 'lucide-react';

function App() {
  const [intentJson, setIntentJson] = useState(JSON.stringify(mockIntent, null, 2));
  const [routePlan, setRoutePlan] = useState<RoutePlan>(mockRoutePlan);
  const [selectedStepId, setSelectedStepId] = useState<string | undefined>(undefined);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulation Logic (simple step advancement)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
        // Simple simulation: just cycle through stops every 3 seconds
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

  const handleApplyJson = (json: string) => {
      setIntentJson(json);
      // In a real app, this would call the API.
      // Here we just re-set the mock plan for demo purposes.
      // We trigger a slight "loading" effect or state update to show responsiveness
      const newPlan = { ...mockRoutePlan, trip_id: `trip-${Date.now()}` };
      setRoutePlan(newPlan);
      setIsJsonOpen(false);
      setSelectedStepId(undefined);
  };

  return (
    <div className="h-screen w-screen bg-sonar-bg text-sonar-text overflow-hidden relative flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex justify-between items-start pointer-events-none">
        <h1 className="text-2xl font-bold text-sonar-accent drop-shadow-md pointer-events-auto">
          Sonar
        </h1>
        <div className="flex flex-col gap-2 pointer-events-auto">
            <button
                onClick={() => setIsJsonOpen(true)}
                className="bg-sonar-surface/80 backdrop-blur p-2 rounded-full border border-white/10 text-white shadow-lg hover:bg-sonar-surface transition-colors"
                title="Edit Intent JSON"
            >
                <Settings size={20} />
            </button>
            <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`p-2 rounded-full border border-white/10 shadow-lg transition-colors ${
                    isSimulating ? 'bg-sonar-accent text-sonar-bg' : 'bg-sonar-surface/80 text-white hover:bg-sonar-surface'
                }`}
                title={isSimulating ? "Stop Simulation" : "Start Simulation"}
            >
                <Play size={20} className={isSimulating ? 'fill-current' : ''} />
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

      {/* JSON Input Modal */}
      {isJsonOpen && (
          <JsonInput
            defaultValue={intentJson}
            onApply={handleApplyJson}
            onClose={() => setIsJsonOpen(false)}
          />
      )}
    </div>
  );
}

export default App;
