import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const meals = useLoaderData() as Meal[];

  const handleSearch = async () => {
    if (!inputRef.current?.value) return;
    const result = await fetchMeals(inputRef.current.value);
    setSearchResults(result || []);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const displayMeals = searchResults.length > 0 ? searchResults : meals;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Recipe Collection</h1>
      </header>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for recipes..."
            className={styles.searchInput}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </section>

      {/* Recipe Grid Section */}
      <section className={styles.recipesSection}>
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
                <button className={styles.viewButton}>
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
