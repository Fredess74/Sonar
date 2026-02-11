import type { PlaceCard as PlaceCardType } from '../types';
import { Star, Utensils, Zap } from 'lucide-react';

interface PlaceCardProps {
  card: PlaceCardType;
  onClose?: () => void;
}

export const PlaceCard = ({ card }: PlaceCardProps) => {
  return (
    <div className="bg-sonar-surface border border-sonar-accent/20 rounded-xl overflow-hidden shadow-lg w-full max-w-sm mx-auto">
      <div className="relative h-48 w-full">
        {card.image_url && (
          <img
            src={card.image_url}
            alt={card.name}
            className="w-full h-full object-cover"
          />
        )}
        {card.rating && (
          <div className="absolute top-2 right-2 bg-sonar-bg/80 px-2 py-1 rounded-full flex items-center gap-1 text-xs text-sonar-accent border border-sonar-accent/30">
            <Star size={12} className="fill-current" />
            <span>{card.rating}</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{card.name}</h3>
          <p className="text-sm text-sonar-muted line-clamp-3 leading-relaxed">
            {card.description}
          </p>
        </div>

        <div className="bg-sonar-bg/50 p-3 rounded-lg border border-white/5">
          <div className="flex items-start gap-2 mb-1">
            <Zap size={16} className="text-sonar-accent mt-0.5 shrink-0" />
            <span className="text-sm font-medium text-white">Почему сюда:</span>
          </div>
          <p className="text-sm text-sonar-muted pl-6">{card.why_here}</p>
        </div>

        {card.must_try && (
          <div className="flex items-start gap-2 text-sm">
            <Utensils size={16} className="text-sonar-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-white mr-2">Must Try:</span>
              <span className="text-sonar-muted">{card.must_try}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-white/10 text-sonar-muted border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
