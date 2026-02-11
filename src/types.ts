export type TransportMode = 'walk' | 'bike' | 'drive';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface IntentJSON {
  start: string | LatLng;
  end: string | LatLng;
  transport: TransportMode;
  themes: string[];
  time_budget_min: number;
  max_pois: number;
  budget_max?: number; // Optional
  vibe?: string; // Optional
}

export interface PlaceCard {
  id: string;
  name: string;
  description: string; // The "20-40 second context"
  why_here: string; // "Why go here"
  must_try?: string;
  rating?: number;
  tags: string[];
  image_url?: string;
}

export interface Waypoint {
  id: string;
  location: LatLng;
  type: 'start' | 'stop' | 'end';
  name: string;
  arrival_time?: string;
  departure_time?: string;
  place_card?: PlaceCard; // Only for stops
}

export interface RoutePlan {
  trip_id: string;
  route_polyline: LatLng[]; // Decoded polyline points for the map
  eta_min: number;
  total_distance_km: number;
  waypoints: Waypoint[];
  geofences: {
    id: string;
    center: LatLng;
    radius_m: number;
    trigger_message: string;
  }[];
}
