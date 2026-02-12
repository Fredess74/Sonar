import { useState, useEffect } from 'react';
import { MapComponent } from './components/Map';
import { BottomSheet } from './components/BottomSheet';
import { Planner } from './components/Planner';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { mockRoutePlan } from './data/goldenPath';
import type { RoutePlan, LLMResponse } from './types';

function App() {
  const [routePlan, setRoutePlan] = useState<RoutePlan>(mockRoutePlan);
  const [selectedStepId, setSelectedStepId] = useState<string | undefined>(undefined);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Store all generated options to allow switching
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

  const handleSwitchRoute = () => {
      const currentIdx = generatedOptions.findIndex(r => r === routePlan);
      const nextIdx = (currentIdx + 1) % generatedOptions.length;
      setRoutePlan(generatedOptions[nextIdx]);
  };

  return (
    <div className="h-screen w-screen bg-sonar-bg text-sonar-text overflow-hidden relative flex flex-col">

      {/* Background Map Layer */}
      <div className="absolute inset-0 z-0">
          <MapComponent
            route={routePlan}
            selectedStepId={selectedStepId}
            onMarkerClick={setSelectedStepId}
          />
      </div>

      {/* Floating Island Header */}
      <Header
        onPlanClick={() => setIsPlannerOpen(true)}
        onSimulateClick={() => setIsSimulating(!isSimulating)}
        isSimulating={isSimulating}
        generatedOptions={generatedOptions}
        onSwitchRoute={handleSwitchRoute}
      />

      {/* Desktop Sidebar (Left) */}
      <Sidebar
        route={routePlan}
        selectedStepId={selectedStepId}
        onStepClick={setSelectedStepId}
      />

      {/* Mobile Bottom Sheet (Hidden on Desktop) */}
      <div className="md:hidden">
        <BottomSheet
            route={routePlan}
            onStepClick={setSelectedStepId}
            selectedStepId={selectedStepId}
        />
      </div>

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
