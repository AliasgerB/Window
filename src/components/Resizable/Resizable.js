import React, { useState } from "react";
import "./resizable.css";

export const ResizableComponent = ({ onAdd, onUpdate, data }) => {
  const [width, setWidth] = useState(200); // Initial width

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    const startX = e.pageX;
    const startY = e.pageY;
    const initialWidth = width;

    const handleMouseMove = (e) => {
      const dx = e.pageX - startX;
      const dy = e.pageY - startY;

      if (direction === "right") {
        setWidth(initialWidth + dx);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="resizable" style={{ width: width, height: "auto" }}>
      {/* Window content */}
      <div className="window">
        <h1>{data?.Windowtype ? data?.Windowtype : "Please add the data"}</h1>
        {data?.Count && <h3>API Count : {data?.Count}</h3>}
        <h4>{data?.Content ? data?.Content : ""}</h4>
        {/* Button to add or update data */}
        {!data?.Content ? (
          <button onClick={onAdd}>ADD</button>
        ) : (
          <button onClick={onUpdate}>Update</button>
        )}
      </div>
      {/* Resize handles */}
      <div
        className="resize-handle right"
        onMouseDown={(e) => handleMouseDown(e, "right")}
      ></div>
    </div>
  );
};
