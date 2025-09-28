import React, { useState, useRef, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "../styles/Meals.module.css"

type Meal = {
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
  strCategory?: string;
};

// Keep original function for search functionality
async function fetchMeals(searchTerm: string = '') {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    if (!response.ok) throw new Error("Failed to fetch meals");
    const result = await response.json();
    if (!result.meals || !Array.isArray(result.meals)) {
      throw new Error("Failed to fetch meals");
    }
    return result.meals;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error occurred";
    throw new Response(message, { status: 500 });
  }
}

export async function mealsLoader() {
  return fetchMeals('');
}

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const meals = useLoaderData() as Meal[];
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search term from URL params
  const searchTerm = searchParams.get('search') || '';

  // Restore search on component mount and when searchParams change
  useEffect(() => {
    if (searchTerm && inputRef.current) {
      inputRef.current.value = searchTerm;
      performSearch(searchTerm);
    }
  }, [searchTerm]);

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const result = await fetchMeals(term);
      setSearchResults(result || []);
    } catch (error) {
      console.log("failed search");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    const term = inputRef.current?.value.trim() || '';
    
    if (term) {
      // Update URL with search parameter
      setSearchParams({ search: term });
    } else {
      // Clear search parameter if empty
      setSearchParams({});
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewRecipe = (mealId: string) => {
    navigate(`recipe/${mealId}`);
  };

  const handleClearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSearchParams({});
    setSearchResults([]);
  };

  const displayMeals = searchResults.length > 0 ? searchResults : meals;
  const isShowingSearchResults = searchTerm && searchResults.length > 0;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Recipe Finder</h1>
        <p className={styles.subtitle}>
          {isShowingSearchResults 
            ? `Search results for "${searchTerm}" (${searchResults.length} found)`
            : "Discover delicious recipes from around the world"
          }
        </p>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for recipes..."
            className={styles.searchInput}
            onKeyDown={handleKeyPress}
          />
          <button 
            onClick={handleSearch} 
            className={styles.searchButton}
            disabled={isSearching}
          >
            {isSearching ? "Loading..." : "Search"}
          </button>
          {searchTerm && (
            <button 
              onClick={handleClearSearch} 
              className={styles.clearButton}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Recipe Grid Section */}
      <div className={styles.recipesSection}>
        {isSearching ? <LoadingSpinner /> :
          <div className={styles.recipeGrid}>
            {displayMeals?.map((meal) => (
              <div key={meal.idMeal} className={styles.recipeCard}>
                <div className={styles.imageContainer}>
                  <img 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal}
                    className={styles.recipeImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>
                    {meal.strCategory || "Main Dish"}
                  </span>
                  <h3 className={styles.recipeTitle}>{meal.strMeal}</h3>
                  <button 
                    className={styles.viewButton}
                    onClick={() => handleViewRecipe(meal.idMeal)}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default HomePage;
