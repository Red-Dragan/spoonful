import React, { useState } from "react";
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { useFavorites } from "../components/FavoritesContext";
import styles from "../styles/RecipeDetails.module.css";
import heartStyles from "../styles/HeartFavorite.module.css";

type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
};

// Loader function to fetch recipe details
export async function recipeLoader({ params }: LoaderFunctionArgs) {
  const mealId = params.mealId as string;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    if (!response.ok) throw new Error("Failed to fetch recipe");
    const result = await response.json();
    if (!result.meals || !result.meals[0]) {
      throw new Error("Recipe not found");
    }
    return result.meals[0];
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error occurred";
    throw new Response(message, { status: 500 });
  }
}

const RecipeDetail: React.FC = () => {
   const recipe = useLoaderData() as RecipeDetail;
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite } = useFavorites();
  
  // State for toast functionality
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Check if recipe is favorited on component mount
  const isRecipeFavorited = isFavorited(recipe.idMeal);

  // Handle favorite toggle
  const handleFavoriteClick = () => {
    const wasFavorited = isFavorited(recipe.idMeal);
    toggleFavorite(recipe);
    
    // Set toast message
    setToastMessage(
      wasFavorited 
        ? "Your meal has been removed from favorites" 
        : "Your meal has been added to favorites"
    );
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (!recipe) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ← Back to Recipes
          </button>
          <h1 className={styles.title}>Recipe not found</h1>
        </div>
      </div>
    );
  }

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || "" });
    }
  }

  const instructionSteps = recipe.strInstructions
    .split(/\r\n|\n|\.(?=\s+)/)
    .filter((step) => step.trim().length > 10);

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {showToast && (
        <div className={`${heartStyles.toast} ${heartStyles.toastShow}`}>
          <div className={heartStyles.toastContent}>
            <span className={heartStyles.toastIcon}>
              {isRecipeFavorited ? "❤️" : "💔"}
            </span>
            <span className={heartStyles.toastMessage}>
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back to Recipes
        </button>
        <h1 className={styles.title}>{recipe.strMeal}</h1>
        <div className={styles.metaInfo}>
          <span className={styles.category}>{recipe.strCategory}</span>
          <span className={styles.area}>{recipe.strArea}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={heartStyles.imageContainer}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className={styles.recipeImage}
            />
            <button
              className={`${heartStyles.heartButton} ${
                isRecipeFavorited ? heartStyles.heartButtonFavorited : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label={isRecipeFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                className={`${heartStyles.heartIcon} ${
                  isRecipeFavorited ? heartStyles.heartIconFavorited : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isRecipeFavorited ? "currentColor" : "none"}
                />
              </svg>
            </button>
          </div>
        </div> 

        <div className={styles.detailsContainer}>
          <div className={styles.ingredientsSection}>
            <h3 className={styles.sectionTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {ingredients.map((item, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <span className={styles.measure}>{item.measure}</span>
                  <span className={styles.ingredient}>{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructionsSection}>
            <h3 className={styles.sectionTitle}>Instructions</h3>
            <div className={styles.instructions}>
              {instructionSteps.map((step, index) => (
                <p key={index} className={styles.instructionStep}>
                  {step.trim()}
                </p>
              ))}
            </div>
          </div>

          {(recipe.strYoutube || recipe.strSource) && (
            <div className={styles.linksSection}>
              <h3 className={styles.sectionTitle}>Additional Resources</h3>
              <div className={styles.links}>
                {recipe.strYoutube && (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Watch Video
                  </a>
                )}
                {recipe.strSource && (
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Original Recipe
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
