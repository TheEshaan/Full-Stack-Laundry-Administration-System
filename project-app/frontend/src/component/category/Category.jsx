import React, { useRef, useState } from "react";
import "./category.css";

export default function Category({ category, cost, _id, img, func }) {
  const [editMode, setEditMode] = useState(false);
  const textRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    if (editMode) {
      func(_id, textRef.current.value);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className="categoryCard">
      <div className="categoryItems">
        <label htmlFor="category" className="categoryHeading">
          {category}
        </label>
        <img src={img} className="categoryImg" />

        <div className="price-container">
          <div className="price-element">Price per KG:</div>
          {!editMode && <div className="price-element">{cost}</div>}
          {editMode && (
            <input ref={textRef} type="text" className="price-input" />
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="editSaveButton1" onClick={handleClick}>{editMode ? "Save" : "Edit"}</button>
      </div>
    </div>
  );
}
