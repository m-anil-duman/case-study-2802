import { ApiResponse, Character, CharacterFilters } from '@/types/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(
  filters: CharacterFilters = {}
): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();

  if (filters.status) {
    params.append('status', filters.status.toLowerCase());
  }

  if (filters.gender) {
    params.append('gender', filters.gender.toLowerCase());
  }
  if (filters.page && filters.page > 0) {
    params.append('page', filters.page.toString());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${BASE_URL}/character${queryString}`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${BASE_URL}/character/${id}`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch character with ID ${id}`);
  }

  return response.json();
}
