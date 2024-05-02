import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "./resizable.css";

/**
 * A resizable component that displays window data and provides options to add or update.
 * @param {Object} props - Component props
 * @param {Function} props.onAdd - Function to be called when "ADD" button is clicked
 * @param {Function} props.onUpdate - Function to be called when "Update" button is clicked
 * @param {Object} props.data - Data to be displayed in the window
 * @returns {JSX.Element} ResizableComponent
 */
export const ResizableComponent = ({ onAdd, onUpdate, data }) => {
  // States for width and height of the resizable component
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  /**
   * Handles resizing of the component.
   * @param {Event} event - The resize event
   * @param {Object} size - Object containing the new width and height of the resizable component
   */
  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <div className="resizable">
      {/* Resizable component */}
      <Resizable
        className="resize-handler"
        width={width}
        height={height}
        onResize={onResize}
      >
        {/* Window content */}
        <div className="window">
          <h1>{data?.Windowtype ? data?.Windowtype : "Windowtype"}</h1>
          <h2>{data?.Count}</h2>
          <h2>{data?.Content ? data?.Content : "No data Found"}</h2>
          {/* Button to add or update data */}
          {!data?.Content ? (
            <button onClick={onAdd}>ADD</button>
          ) : (
            <button onClick={onUpdate}>Update</button>
          )}
        </div>
      </Resizable>
    </div>
  );
};
