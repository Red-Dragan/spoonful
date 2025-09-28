import React from "react";
import { useNavigate } from "react-router";
import { useFavorites } from "../components/FavoritesContext";
import styles from "../styles/Favorite.module.css";

const FavoritePage: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleViewRecipe = (mealId: string) => {
    navigate(`/recipe/${mealId}`);
  };

  const handleRemoveFavorite = (mealId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFromFavorites(mealId);
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Favorites</h1>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>❤️</div>
          <h2 className={styles.emptyTitle}>No favorites yet</h2>
          <p className={styles.emptyText}>
            Discover delicious recipes and save your favorites by clicking the heart icon
          </p>
          <button 
            className={styles.exploreButton}
            onClick={() => navigate('/')}
          >
            Explore Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Favorites</h1>
        <span className={styles.counter}>
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'}
        </span>
      </div>
      
      <div className={styles.grid}>
        {favorites.map((recipe) => (
          <div 
            key={recipe.idMeal} 
            className={styles.card}
            onClick={() => handleViewRecipe(recipe.idMeal)}
          >
            <div className={styles.imageContainer}>
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal}
                className={styles.image}
                loading="lazy"
              />
              <button
                className={styles.removeButton}
                onClick={(e) => handleRemoveFavorite(recipe.idMeal, e)}
                aria-label="Remove from favorites"
                title="Remove from favorites"
              >
                <svg viewBox="0 0 24 24" className={styles.removeIcon}>
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{recipe.strMeal}</h3>
              <div className={styles.meta}>
                <span className={styles.category}>{recipe.strCategory}</span>
                <span className={styles.area}>{recipe.strArea}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
