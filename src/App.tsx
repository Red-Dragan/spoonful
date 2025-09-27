import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootPage from "./pages/Root";
import HomePage, { mealsLoader } from "./pages/Home";
import FavoritePage from "./pages/Favorite";
import AboutPage from "./pages/About";
import ErrorBoundary from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage />, loader: mealsLoader },
      { path: "favorites", element: <FavoritePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
