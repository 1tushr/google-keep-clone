import { useState } from "react";
import "./App.css";
import NotesArea from "./components/NotesArea";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

function App() {
  
const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <TopBar setSearchQuery={setSearchQuery}></TopBar>
      <SideBar></SideBar>
      <NotesArea searchQuery={searchQuery}></NotesArea>
    </div>
  );
}

export default App;
