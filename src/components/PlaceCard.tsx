import type { PlaceCard as PlaceCardType } from '../types';
import { Star, Utensils, Zap, Users, MapPin, ExternalLink } from 'lucide-react';

interface PlaceCardProps {
  card: PlaceCardType;
}

export const PlaceCard = ({ card }: PlaceCardProps) => {
  return (
    <div className="group bg-sonar-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg w-full max-w-sm mx-auto animate-fade-in hover:shadow-neon hover:border-sonar-accent/40 transition-all duration-300">

      {/* Image Header */}
      <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
        {card.image_url ? (
          <img
            src={card.image_url}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
                // Fallback
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518081532272-a16075936746?q=80&w=800&auto=format&fit=crop';
            }}
          />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-sonar-surface/50 text-sonar-muted">
                <MapPin size={48} className="opacity-20" />
            </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sonar-surface via-transparent to-transparent opacity-90" />

        {/* Status Badge */}
        {card.status_open !== undefined && (
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-lg ${
                card.status_open
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}>
                {card.status_open ? 'OPEN NOW' : 'CLOSED'}
            </div>
        )}

        {/* Rating Badge */}
        {card.rating && (
          <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-full flex items-center gap-1 text-xs text-sonar-accent border border-sonar-accent/30 backdrop-blur-md shadow-lg">
            <Star size={10} className="fill-current" />
            <span className="font-bold">{card.rating}</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4 -mt-6 relative z-10">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-sonar-accent transition-colors">
                {card.name}
            </h3>
            <button className="text-sonar-muted hover:text-white transition-colors p-1">
                <ExternalLink size={16} />
            </button>
          </div>
          <p className="text-sm text-sonar-muted/80 line-clamp-3 leading-relaxed mt-2 font-light">
            {card.description}
          </p>
        </div>

        {/* Why Here Block - The Core Value */}
        <div className="bg-sonar-accent/5 p-3.5 rounded-xl border border-sonar-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-sonar-accent/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="p-1 bg-sonar-accent/10 rounded-md">
                <Zap size={14} className="text-sonar-accent fill-sonar-accent/20" />
            </div>
            <span className="text-xs font-bold text-sonar-accent tracking-wider uppercase">Sonar Insight</span>
          </div>
          <p className="text-sm text-white/90 leading-snug relative z-10 italic">
            "{card.why_here}"
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
            {card.must_try && (
              <div className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                <div className="flex items-center gap-1.5 mb-1.5 text-sonar-muted text-[10px] uppercase tracking-wider font-semibold">
                    <Utensils size={12} />
                    <span>Must Try</span>
                </div>
                <p className="text-sm text-white font-medium line-clamp-2 leading-tight">{card.must_try}</p>
              </div>
            )}

            {card.busy_level && (
              <div className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                <div className="flex items-center gap-1.5 mb-1.5 text-sonar-muted text-[10px] uppercase tracking-wider font-semibold">
                    <Users size={12} />
                    <span>Crowd</span>
                </div>
                <p className={`text-sm font-bold capitalize ${
                    card.busy_level === 'high' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                    {card.busy_level} Activity
                </p>
              </div>
            )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          {card.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-md bg-white/5 text-sonar-muted border border-white/5 hover:border-sonar-accent/30 hover:text-white transition-all cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
