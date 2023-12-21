import React from "react";
import keepLogo from "../assets/keepLogo.png";
import "../styles/topbar.css";
import { CiMenuBurger, CiSearch, CiGrid41 } from "react-icons/ci";

export default function TopBar({ setSearchQuery }) {
  return (
    <div className="topbar">
      <CiMenuBurger className="menu" />
      <img src={keepLogo} alt="keep logo" className="logo" />
      <h1>Keep</h1>

      <div className="search-bar">
        <CiSearch />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
