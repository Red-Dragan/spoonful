import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router";

type Meal = {
  strMeal: string;
  idMeal: string;
  strMealThumb: string;
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

  const displayMeals = searchResults.length > 0 ? searchResults : meals;

  return (
    <div>
      <div>
        <input ref={inputRef} type="text" placeholder="Search meals..." />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {displayMeals?.map(meal => (
          <div key={meal.idMeal}>
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="100px"/>
            <button>View Recipe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
