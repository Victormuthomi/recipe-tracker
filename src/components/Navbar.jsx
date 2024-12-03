import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-800 rounded-sm px-1 py-1 "
      : "text-white hover:bg-gray-800 rounded-sm px-1 py-1";
  return (
    <>
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl">
        <nav
          className="bg-indigo-700 border-b border-indigo-500 shadow-md"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl ml-2 px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <NavLink to="/" className="text-white text-2xl font-extrabold">
                  Recipe Tracker
                </NavLink>
              </div>

              <div className="flex space-x-4">
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
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
