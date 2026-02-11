import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import type { RoutePlan } from '../types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface MapProps {
    route: RoutePlan;
    selectedStepId?: string;
    onMarkerClick: (stepId: string) => void;
}

// Component to handle map bounds
const MapUpdater = ({ route, selectedStepId }: { route: RoutePlan, selectedStepId?: string }) => {
    const map = useMap();

    useEffect(() => {
        if (route.route_polyline.length > 0) {
            const bounds = route.route_polyline.map(p => [p.lat, p.lng] as LatLngTuple);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [route, map]);

    useEffect(() => {
        if (selectedStepId) {
            const step = route.waypoints.find(wp => wp.id === selectedStepId);
            if (step) {
                map.flyTo([step.location.lat, step.location.lng], 16, { duration: 1.5 });
            }
        }
    }, [selectedStepId, route, map]);

    return null;
};

export const MapComponent = ({ route, selectedStepId, onMarkerClick }: MapProps) => {
    // Convert polyline to Leaflet format
    const polylinePositions: LatLngTuple[] = route.route_polyline.map(p => [p.lat, p.lng]);

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0 bg-sonar-bg"
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <Polyline
                positions={polylinePositions}
                pathOptions={{ color: '#19C37D', weight: 4, opacity: 0.8 }}
            />

            {route.waypoints.map((wp) => (
                <Marker
                    key={wp.id}
                    position={[wp.location.lat, wp.location.lng]}
                    eventHandlers={{
                        click: () => onMarkerClick(wp.id),
                    }}
                >
                    <Popup>
                        <div className="font-bold text-sonar-text">{wp.name}</div>
                        <div className="text-xs text-sonar-muted capitalize">{wp.type}</div>
                    </Popup>
                </Marker>
            ))}

            <MapUpdater route={route} selectedStepId={selectedStepId} />
        </MapContainer>
    );
};
