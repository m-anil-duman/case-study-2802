'use client';

import { useCharacterStore } from '@/store';
import { useEffect, useState } from 'react';
import { fetchCharacterById } from '@/lib/api';
import { Character } from '@/types/api';
import { CharacterGrid } from '@/components/characters/CharacterGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FavoritesPage(): React.ReactElement {
  const { favorites } = useCharacterStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        if (favorites.length === 0) {
          setCharacters([]);
          return;
        }

        const characterPromises = favorites.map((id) => fetchCharacterById(id));
        const favoriteCharacters = await Promise.all(characterPromises);
        setCharacters(favoriteCharacters);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favorites]);

  return (
    <main className="container mx-auto py-6 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Favorite Characters</h1>
        <p className="text-gray-500">Your saved Rick and Morty characters</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No favorites yet</h2>
          <p className="text-gray-500 mb-6">
            Start adding characters to your favorites list by clicking the star icon
          </p>
          <Link href="/">
            <Button>Explore Characters</Button>
          </Link>
        </div>
      ) : (
        <CharacterGrid characters={characters} />
      )}
    </main>
  );
}
