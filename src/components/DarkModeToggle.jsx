import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-white dark:bg-black">
      <button
        onClick={handleThemeSwitch}
        className={`px-4 py-2 rounded-full ${
          theme === "dark"
            ? "bg-gray-800 text-white hover:bg-gray-700 "
            : "bg-gray-200 text-gray-800 hover:bg-gray-300 "
        }`}
      >
        {theme === "dark" ? "Dark mode" : "Light mode"}
      </button>
    </div>
  );
}

export default DarkModeToggle;
