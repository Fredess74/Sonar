import type { PlaceCard as PlaceCardType } from '../types';
import { Star, Utensils, Zap, Users, MapPin } from 'lucide-react';

interface PlaceCardProps {
  card: PlaceCardType;
}

export const PlaceCard = ({ card }: PlaceCardProps) => {
  return (
    <div className="bg-sonar-surface border border-sonar-accent/20 rounded-xl overflow-hidden shadow-lg w-full max-w-sm mx-auto animate-fade-in">
      <div className="relative h-48 w-full bg-gray-800">
        {card.image_url ? (
          <img
            src={card.image_url}
            alt={card.name}
            className="w-full h-full object-cover"
            onError={(e) => {
                // Fallback if image fails (likely with LLM generated URLs)
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1524813686514-a5756c97759e?w=800&auto=format&fit=crop&q=60';
            }}
          />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-sonar-surface/50 text-sonar-muted">
                <MapPin size={48} />
            </div>
        )}

        {/* Status Badge */}
        {card.status_open !== undefined && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold border ${
                card.status_open
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
                {card.status_open ? 'OPEN' : 'CLOSED'}
            </div>
        )}

        {/* Rating Badge */}
        {card.rating && (
          <div className="absolute top-2 right-2 bg-sonar-bg/80 px-2 py-1 rounded-full flex items-center gap-1 text-xs text-sonar-accent border border-sonar-accent/30 backdrop-blur-sm">
            <Star size={12} className="fill-current" />
            <span>{card.rating}</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
          <p className="text-sm text-sonar-muted line-clamp-3 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Why Here Block - The Core Value */}
        <div className="bg-sonar-accent/10 p-3 rounded-lg border border-sonar-accent/20">
          <div className="flex items-start gap-2 mb-1">
            <Zap size={16} className="text-sonar-accent mt-0.5 shrink-0" />
            <span className="text-sm font-bold text-sonar-accent">WHY HERE</span>
          </div>
          <p className="text-sm text-white/90 leading-snug">{card.why_here}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
            {card.must_try && (
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1 text-sonar-muted text-xs uppercase tracking-wider">
                    <Utensils size={12} />
                    <span>Must Try</span>
                </div>
                <p className="text-sm text-white font-medium line-clamp-2">{card.must_try}</p>
              </div>
            )}

            {card.busy_level && (
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1 text-sonar-muted text-xs uppercase tracking-wider">
                    <Users size={12} />
                    <span>Crowd</span>
                </div>
                <p className="text-sm text-white font-medium capitalize">{card.busy_level}</p>
              </div>
            )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {card.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[10px] uppercase tracking-wider rounded-full bg-white/5 text-sonar-muted border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
