import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "./resizable.css";

export const ResizableComponent = ({ onAdd, onUpdate, data }) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <div className="resizable">
      <Resizable
        className="resize-handler"
        width={width}
        height={height}
        onResize={onResize}
      >
        <div className="window">
          <h1>{data?.Windowtype ? data?.Windowtype : "Windowtype"}</h1>
          <h2>{data?.Count}</h2>
          <h2>{data?.Content ? data?.Content : "No data Found"}</h2>
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
