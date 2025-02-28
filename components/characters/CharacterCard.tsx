'use client';

import { Character } from '@/types/api';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useCharacterStore } from '@/store';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps): React.ReactElement {
  const { favorites, addToFavorites, removeFromFavorites } = useCharacterStore();
  const isFavorite = favorites.includes(character.id);

  const handleFavoriteToggle = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character.id);
    }
  };

  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status];

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      {/* Parent flex container */}
      <div className="flex flex-col md:flex-row gap-4 p-3">
        {/* Image Container */}
        <div className="relative w-full md:w-1/3 h-32 md:h-auto rounded-lg overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Details Container */}
        <div className="flex flex-col flex-1">
          <CardContent className="p-0">
            <CardTitle className="text-lg mb-1">{character.name}</CardTitle>
            <div className="flex items-center mb-1 gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />
              <span className="text-sm">
                {character.status} - {character.species}
              </span>
            </div>
            <div className="mb-1">
              <p className="text-xs text-gray-500">Last known location:</p>
              <p className="text-xs text-gray-700 truncate">{character.location.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">First seen in:</p>
              <p className="text-xs text-gray-700">
                Episode {character.episode[0].split('/').pop()}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between p-0 mt-auto">
            <Badge
              className="text-xs px-2 py-0.5"
              variant={character.gender === 'Male' ? 'default' : 'secondary'}
            >
              {character.gender}
            </Badge>
            <button
              onClick={handleFavoriteToggle}
              className="text-yellow-500 hover:text-yellow-300"
            >
              {isFavorite ? '★' : '☆'}
            </button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
