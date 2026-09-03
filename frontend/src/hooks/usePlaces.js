import { useState, useEffect, useMemo } from 'react';

export function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [photoOnly, setPhotoOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [activePlace, setActivePlace] = useState(null);
  const [modalPlace, setModalPlace] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [resPlaces, resCats, resRoutes] = await Promise.all([
          fetch('/api/places'),
          fetch('/api/categories'),
          fetch('/api/routes')
        ]);

        const dataPlaces = await resPlaces.json();
        const dataCats = await resCats.json();
        const dataRoutes = await resRoutes.json();

        if (dataPlaces.success) setPlaces(dataPlaces.data);
        if (dataCats.success) setCategories(dataCats.data);
        if (dataRoutes.success) setRoutes(dataRoutes.data);
      } catch (err) {
        console.error('Error fetching Tulcan data:', err);
        setError('No se pudo conectar con el servidor local de Tulcán Turismo.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtered places
  const filteredPlaces = useMemo(() => {
    let result = [...places];

    if (selectedCategory && selectedCategory !== 'todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (photoOnly) {
      result = result.filter(p => p.recommendedForPhoto);
    }

    if (featuredOnly) {
      result = result.filter(p => p.featured);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [places, selectedCategory, searchQuery, photoOnly, featuredOnly]);

  return {
    places,
    filteredPlaces,
    categories,
    routes,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    photoOnly,
    setPhotoOnly,
    featuredOnly,
    setFeaturedOnly,
    activePlace,
    setActivePlace,
    modalPlace,
    setModalPlace,
    activeRoute,
    setActiveRoute,
  };
}
