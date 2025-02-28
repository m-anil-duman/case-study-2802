'use client';

import { Character } from '@/types/api';
import { CharacterCard } from './CharacterCard';
import { useCharacterStore } from '@/store';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface CharacterGridProps {
  characters: Character[];
}

export function CharacterGrid({ characters }: CharacterGridProps): React.ReactElement {
  const { selectedCharacter, setSelectedCharacter } = useCharacterStore();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => setSelectedCharacter(character)}
          />
        ))}
      </div>
      <Dialog
        open={!!selectedCharacter}
        onOpenChange={(open: boolean) => !open && setSelectedCharacter(null)}
      >
        {selectedCharacter && (
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCharacter.name}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full">
                <Image
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-500">Status:</span>{' '}
                    <Badge
                      variant={
                        selectedCharacter.status === 'Alive'
                          ? 'default'
                          : selectedCharacter.status === 'Dead'
                            ? 'destructive'
                            : 'outline'
                      }
                    >
                      {selectedCharacter.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Species:</span> {selectedCharacter.species}
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>{' '}
                    {selectedCharacter.type || 'Unknown'}
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span>{' '}
                    <Badge variant="secondary">{selectedCharacter.gender}</Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Origin:</span> {selectedCharacter.origin.name}
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>{' '}
                    {selectedCharacter.location.name}
                  </div>
                  <div>
                    <span className="text-gray-500">Episodes:</span>{' '}
                    {selectedCharacter.episode.length}
                  </div>
                </div>
                <pre className="mt-6 bg-gray-100 p-4 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(selectedCharacter, null, 2)}
                </pre>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
