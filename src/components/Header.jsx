"use client";

import { Navbar } from "flowbite-react";
import ThemeBtn from "./ThemeBtn";
import logo from "../assets/activity-svgrepo-com.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar fluid>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src={logo}
          className="mr-3 h-6 sm:h-9"
          alt="Event Generator Dashboard"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Event Generation Dashboard
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ThemeBtn />
      </div>
      <Navbar.Collapse>
        <Link to="/">Home</Link>
        <Link to="/netLogger">IP Logger</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
