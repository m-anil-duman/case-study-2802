import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/lib/api';
import { CharacterFilters } from '@/types/api';

export function useCharacters(filters: CharacterFilters = {}) {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => fetchCharacters(filters),
  });
}
