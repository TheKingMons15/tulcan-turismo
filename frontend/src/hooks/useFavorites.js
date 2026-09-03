import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tulcan_turismo_favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    favoritesCount: favoriteIds.length
  };
}
