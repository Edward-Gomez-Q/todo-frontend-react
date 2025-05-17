import PropTypes from "prop-types";
import Overlay from "../overlay";
import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

export const ThemeContext = createContext(null);

function Layout({ bg, overlay, children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`layout-wrapper w-full min-h-screen ${
          bg ? bg : "dark:bg-darkblack-500"
        }`}
        style={{ borderColor: "#2a313c" }}
      >
        {overlay ? overlay : <Overlay />}
        <div className="relative flex flex-col w-full">
          <Outlet />
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  bg: PropTypes.string,
  overlay: PropTypes.node,
  children: PropTypes.node,
};

export default Layout;