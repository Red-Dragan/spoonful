import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootPage from "./pages/Root";
import HomePage from "./pages/Home";
import FavoritePage from "./pages/Favorite";
import AboutPage from "./pages/About";

const router = createBrowserRouter([
  {path: "/", element: <RootPage />, children: [
    {index: true, element: <HomePage />},
    {path: "favorites", element: <FavoritePage />},
    {path: 'about', element: <AboutPage />}
  ]}
])

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;