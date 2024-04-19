import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { ThemeProvider } from "./context/theme";
import { useState, useEffect } from "react";
import "./index.css";

function Layout() {
  const [themeMode, setThemeMode] = useState("light");
  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };
  useEffect(() => {
    const tempVar = document.querySelector("html").classList;
    tempVar.remove("light", "dark");
    tempVar.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ lightTheme, darkTheme, themeMode }}>
      <div
        className={`h-screen w-screen relative overscroll-none bg-blue-100 dark:bg-slate-600 dark:text-white`}
      >
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
