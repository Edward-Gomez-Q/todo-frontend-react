import ProtoTypes from "prop-types";
import Overlay from "../overlay";
import { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";

export const ThemeContext = createContext(null);

function Layout({ bg, overlay, children }) {
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "" || localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : ""
  );
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`layout-wrapper  w-full dark:bg-darkblack-600 `}
        style={{
          borderColor: "#2a313c",
        }}
      >
        <div className="relative flex w-full">
          {overlay ? overlay : <Overlay />}
          <Sidebar />
          <div
            className={`body-wrapper flex-1 overflow-x-hidden ${
              bg ? bg : "dark:bg-darkblack-500"
            } `}
          >
            <Outlet />
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;