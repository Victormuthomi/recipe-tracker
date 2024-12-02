import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2 "
      : "text-white hover:bg-gray-800 rounded-lg px-4 py-2 ";
  return (
    <>
      <nav
        className="bg-indigo-700 border-b border-indigo-500 shadow-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white text-2xl font-extrabold">
                Recipe Tracker
              </span>
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
