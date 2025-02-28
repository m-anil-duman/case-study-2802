import { FilterBar } from '@/components/characters/FilterBar';
import { CharacterGrid } from '@/components/characters/CharacterGrid';
import { PaginationControl } from '@/components/PaginationControl';
import { fetchCharacters } from '@/lib/api';
import { CharacterFilters } from '@/types/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function HomePage({
  searchParams,
}: HomePageProps): Promise<React.ReactElement> {
  const params = await searchParams;
  const status = typeof params.status === 'string' ? params.status : undefined;
  const gender = typeof params.gender === 'string' ? params.gender : undefined;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;

  const filters: CharacterFilters = {};
  if (status && status !== 'all') filters.status = status;
  if (gender && gender !== 'all') filters.gender = gender;
  if (page) filters.page = page;

  const { results: characters, info } = await fetchCharacters(filters);

  return (
    <main className="container mx-auto py-6 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">The Rick and Morty API</h1>
        <p className="text-gray-500">Explore characters from the Rick and Morty series</p>
      </header>

      <FilterBar initialStatus={status || 'all'} initialGender={gender || 'all'} />

      <CharacterGrid characters={characters} />

      <div className="mt-8 flex justify-center">
        <PaginationControl currentPage={page || 1} totalPages={info.pages} />
      </div>
    </main>
  );
}
