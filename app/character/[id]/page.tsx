import { fetchCharacterById } from '@/lib/api';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterPage({
  params,
}: CharacterPageProps): Promise<React.ReactNode> {
  const character = await fetchCharacterById(parseInt(params.id));

  return (
    <main className="container mx-auto py-6 px-4">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          ← Back to All Characters
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-auto">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{character.name}</h1>

          <div className="space-y-4">
            <div>
              <span className="text-gray-500">Status:</span>{' '}
              <Badge
                variant={
                  character.status === 'Alive'
                    ? 'default'
                    : character.status === 'Dead'
                      ? 'destructive'
                      : 'outline'
                }
              >
                {character.status}
              </Badge>
            </div>
            <div>
              <span className="text-gray-500">Species:</span> {character.species}
            </div>
            <div>
              <span className="text-gray-500">Type:</span> {character.type || 'Unknown'}
            </div>
            <div>
              <span className="text-gray-500">Gender:</span>{' '}
              <Badge variant="secondary">{character.gender}</Badge>
            </div>
            <div>
              <span className="text-gray-500">Origin:</span> {character.origin.name}
            </div>
            <div>
              <span className="text-gray-500">Location:</span> {character.location.name}
            </div>
            <div>
              <span className="text-gray-500">Episodes:</span> {character.episode.length}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">JSON Data</h2>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-60">
              {JSON.stringify(character, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
