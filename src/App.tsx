import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { FavoritesProvider } from "./components/FavoritesContext";
import RootPage from "./pages/Root";
import HomePage, { mealsLoader } from "./pages/Home";
import FavoritePage from "./pages/Favorite";
import AboutPage from "./pages/About";
import ErrorBoundary from "./pages/Error";
import RecipeDetails, { recipeLoader } from "./pages/RecipeDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage />, loader: mealsLoader },
      { path: "favorites", element: <FavoritePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "recipe/:mealId", element: <RecipeDetails />, loader: recipeLoader }
    ],
  },
]);

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
};

export default App;
