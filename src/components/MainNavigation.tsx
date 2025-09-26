import type React from "react";
import { NavLink } from "react-router";
import recipeLogo from "../assets/recipe-logo.jpg";
import classes from "../styles/MainNavigation.module.css";

const MainNavigation: React.FC = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div className={classes.brand}>
          <img src={recipeLogo} alt="Logo" className={classes.logo} />
          <span className={classes.brandText}>RecipeApp</span>
        </div>

        <ul className={classes.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.navLinkActive}` : classes.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.navLinkActive}` : classes.navLink
              }
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.navLinkActive}` : classes.navLink
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className={classes.ctaSection}>
          <button className={classes.ctaButton}>Get Started</button>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
