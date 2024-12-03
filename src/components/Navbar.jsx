import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-800 rounded-sm px-2 py-1"
      : "text-white hover:bg-gray-800 rounded-sm px-2 py-1";

  return (
    <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
      <nav
        className="relative bg-indigo-700 border-b border-indigo-500 shadow-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="text-white text-2xl font-extrabold">
                Recipe Tracker
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/recipes" className={linkClass}>
                Recipes
              </NavLink>
              <NavLink to="/add-recipe" className={linkClass}>
                Add Recipe
              </NavLink>
              <DarkModeToggle />
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              className="block md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-indigo-700 shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <NavLink to="/" className={linkClass} onClick={toggleMenu}>
                Home
              </NavLink>
              <NavLink to="/recipes" className={linkClass} onClick={toggleMenu}>
                Recipes
              </NavLink>
              <NavLink
                to="/add-recipe"
                className={linkClass}
                onClick={toggleMenu}
              >
                Add Recipe
              </NavLink>
              <DarkModeToggle />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
