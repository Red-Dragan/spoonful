import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
};

type FavoritesContextType = {
  favorites: RecipeDetail[];
  addToFavorites: (recipe: RecipeDetail) => void;
  removeFromFavorites: (recipeId: string) => void;
  isFavorited: (recipeId: string) => boolean;
  toggleFavorite: (recipe: RecipeDetail) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<RecipeDetail[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('recipeFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (recipe: RecipeDetail) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.idMeal === recipe.idMeal)) {
        return prev; // Already exists, don't add duplicate
      }
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavorites(prev => prev.filter(fav => fav.idMeal !== recipeId));
  };

  const isFavorited = (recipeId: string): boolean => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  const toggleFavorite = (recipe: RecipeDetail) => {
    if (isFavorited(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};