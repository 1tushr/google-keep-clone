import React from "react";
import "../styles/sidebar.css";
import { MdLightbulbOutline, MdOutlineEdit } from "react-icons/md";
export default function SideBar() {
  return (
    <div class="sidebar">
      <MdLightbulbOutline />
      <span>My Notes</span>
    </div>
  );
}
