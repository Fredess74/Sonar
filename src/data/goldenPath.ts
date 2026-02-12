import type { IntentJSON, RoutePlan, Waypoint } from '../types';

export const mockIntent: IntentJSON = {
  start: "Soho Square, London",
  end: "The British Museum",
  transport: "walk",
  themes: ["coffee", "vibe"],
  goal: "quick bite",
  vibe: "social",
  time_window: "1 hour",
  max_stops: 3,
  constraints: ["no stairs"]
};

// Start: Soho Square (51.515206, -0.133202)
// Stop 1: Monmouth Coffee (51.514417, -0.126839)
// Stop 2: Neal's Yard (51.514605, -0.125740)
// End: British Museum (51.519413, -0.126956)

export const mockWaypoints: Waypoint[] = [
  {
    id: "start",
    type: "start",
    name: "Soho Square",
    location: { lat: 51.5152, lng: -0.1332 },
    departure_time: "10:00"
  },
  {
    id: "stop-1",
    type: "stop",
    name: "Monmouth Coffee Company",
    location: { lat: 51.5144, lng: -0.1268 },
    arrival_time: "10:15",
    departure_time: "10:35",
    place_card: {
      id: "card-1",
      name: "Monmouth Coffee Company",
      description: "Легендарная лондонская кофейня. Очередь — часть опыта, но движется быстро. Берите фильтр-кофе, чтобы почувствовать настоящий вкус зерна.",
      why_here: "Лучший кофе в Ковент-Гардене, который стоит 10 минут ожидания.",
      must_try: "Filter Coffee & Pastries",
      rating: 4.8,
      tags: ["coffee", "busy", "aroma"],
      image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      status_open: true,
      busy_level: "high"
    }
  },
  {
    id: "stop-2",
    type: "stop",
    name: "Neal's Yard",
    location: { lat: 51.5146, lng: -0.1257 },
    arrival_time: "10:40",
    departure_time: "11:00",
    place_card: {
      id: "card-2",
      name: "Neal's Yard",
      description: "Скрытый цветной дворик. Идеальное место для короткой паузы и фото. Здесь тихо, несмотря на шумный центр.",
      why_here: "Уникальный 'вайб' и цветотерапия посреди серого Лондона.",
      must_try: "Just sit & breathe",
      rating: 4.7,
      tags: ["photo", "vibe", "hidden"],
      image_url: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1974&auto=format&fit=crop",
      status_open: true,
      busy_level: "low"
    }
  },
  {
    id: "end",
    type: "end",
    name: "The British Museum",
    location: { lat: 51.5194, lng: -0.1269 },
    arrival_time: "11:10"
  }
];

// Approximate polyline (straight lines between points for simplicity, but split for smoothness if needed)
// In a real app, this would be encoded or a detailed list from OSRM.
export const mockPolyline = [
  { lat: 51.5152, lng: -0.1332 }, // Start
  { lat: 51.5150, lng: -0.1300 }, // Intermediate
  { lat: 51.5144, lng: -0.1268 }, // Stop 1
  { lat: 51.5145, lng: -0.1260 }, // Intermediate
  { lat: 51.5146, lng: -0.1257 }, // Stop 2
  { lat: 51.5160, lng: -0.1260 }, // Intermediate
  { lat: 51.5194, lng: -0.1269 }  // End
];

export const mockGeofences = [
  {
    id: "geo-1",
    center: { lat: 51.5144, lng: -0.1268 },
    radius_m: 50,
    trigger_message: "Вы подходите к Monmouth! Запах кофе уже чувствуется. Готовьте карту."
  },
  {
    id: "geo-2",
    center: { lat: 51.5146, lng: -0.1257 },
    radius_m: 30,
    trigger_message: "Поверните в узкий проход слева, чтобы попасть в Neal's Yard."
  }
];

export const mockRoutePlan: RoutePlan = {
  trip_id: "trip-123",
  title: "Classic Covent Garden",
  description: "A perfect mix of coffee and culture.",
  route_polyline: mockPolyline,
  eta_min: 70, // 10:00 -> 11:10
  total_distance_km: 1.2,
  waypoints: mockWaypoints,
  geofences: mockGeofences
};
