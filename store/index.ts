import { create } from 'zustand';
import { Character } from '@/types/api';

interface CharacterStore {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
  favorites: number[];
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  selectedCharacter: null,
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  favorites: [],
  addToFavorites: (id) =>
    set((state) => ({
      favorites: [...state.favorites, id],
    })),
  removeFromFavorites: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),
}));
