import React, { useState, useRef, useEffect } from "react";
import "../styles/notesarea.css";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
export default function NotesArea({ searchQuery }) {
 
  const [isExpanded, setIsExpanded] = useState(false);
 
  const [noteContent, setNoteContent] = useState({ title: "", note: "" });

  const [noteColor, setNoteColor] = useState("#ffffff");
  // State for the cards
  const [cards, setCards] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) ?? [];
  });

  const [editNoteId, setEditNoteId] = useState(null);
  const notesAreaRef = useRef(null);

  
  useEffect(() => {
    console.log("Saving Cards to Local Storage:", cards);
    localStorage.setItem("notes", JSON.stringify(cards));
  }, [cards]);

 
  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setEditNoteId(null); 
  };

  const handleTitleChange = (event) => {
    setNoteContent((prevContent) => ({
      ...prevContent,
      title: event.target.value,
    }));
  };

  const handleNoteChange = (event) => {
    setNoteContent((prevContent) => ({
      ...prevContent,
      note: event.target.value,
    }));
  };

  const handleColorChange = (event) => {
    setNoteColor(event.target.value);
  };

  const createOrUpdateCard = () => {
    if (noteContent.title && noteContent.note) {
      if (editNoteId !== null) {
      
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editNoteId
              ? { ...noteContent, id: card.id, color: noteColor }
              : card
          )
        );
      } else {
       
        const newCard = { ...noteContent, id: Date.now(), color: noteColor };
        setCards((prevCards) => [...prevCards, newCard]);
      }

      setIsExpanded(false);
      setEditNoteId(null);
      setNoteContent({ title: "", note: "" });
      setNoteColor("#ffffff"); 
    }
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const editCard = (id) => {
    const cardToEdit = cards.find((card) => card.id === id);
    setNoteContent({ title: cardToEdit.title, note: cardToEdit.note });
    setNoteColor(cardToEdit.color);
    setEditNoteId(id);
    setIsExpanded(true);
  };

  return (
    <div>
      <div
        ref={notesAreaRef}
        className={`notes-area ${isExpanded ? "expanded" : ""}`}
      >
        {!isExpanded ? (
          <input
            type="text"
            placeholder="Take a note..."
            onMouseOver={handleInputClick}
          />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            onMouseLeave={handleClose}
          >
            <input
              type="text"
              placeholder="Title"
              onChange={handleTitleChange}
              value={noteContent.title}
            />
            <textarea
              placeholder="Note"
              onChange={handleNoteChange}
              value={noteContent.note}
            ></textarea>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={createOrUpdateCard}
                style={{ backgroundColor: "light-grey", outline: "none" }}
              >
                {editNoteId !== null ? "Update" : "Save"}
              </button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoColorPaletteOutline
                  style={{
                    fontSize: "2rem",
                    marginRight: "10px",
                    color: "black",
                  }}
                />
                <input
                  type="color"
                  onChange={handleColorChange}
                  style={{
                    padding: "0",
                    border: "none",
                    outline: "none",
                    width: "2rem",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="created-cards">
        {cards
          .filter((card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((card) => (
            <div
              key={card.id}
              className="card"
              style={{ backgroundColor: card.color }}
            >
              <h3>{card.title}</h3>
              <p>{card.note}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => editCard(card.id)}>
                  <MdOutlineEdit />
                </button>
                <button onClick={() => deleteCard(card.id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
