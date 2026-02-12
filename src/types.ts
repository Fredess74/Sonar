export type TransportMode = 'walk' | 'bike' | 'drive' | 'transit';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface IntentJSON {
  themes: string[];
  goal: string;
  vibe: string;
  start: string | LatLng;
  end?: string | LatLng;
  transport: TransportMode;
  constraints?: string[];
  time_window?: string;
  max_stops?: number;
  // Legacy/Optional fields kept for compatibility or extended use
  budget_max?: number;
}

export interface PlaceCard {
  id: string;
  name: string;
  description: string; // Context/Story
  why_here: string; // Unique value proposition
  must_try?: string; // Specific recommendation
  rating?: number;
  tags: string[];
  image_url?: string;
  status_open?: boolean; // "Open/Closed"
  busy_level?: 'low' | 'medium' | 'high'; // "Crowded/Quiet"
}

export interface Waypoint {
  id: string;
  location: LatLng;
  type: 'start' | 'stop' | 'end';
  name: string;
  arrival_time?: string; // e.g. "10:00"
  departure_time?: string; // e.g. "10:30"
  place_card?: PlaceCard;
}

export interface RoutePlan {
  trip_id: string;
  title?: string; // For the "3 variants" view
  description?: string; // Short summary of why this route fits
  route_polyline: LatLng[];
  eta_min: number;
  total_distance_km: number;
  waypoints: Waypoint[];
  geofences?: {
    id: string;
    center: LatLng;
    radius_m: number;
    trigger_message: string;
  }[];
}

export interface LLMResponse {
  intent: IntentJSON;
  routes: RoutePlan[];
}
