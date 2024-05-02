import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResizableComponent } from "../Resizable/Resizable";
import "./window.css";

export const WindowComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [activeWindowType, setActiveWindowType] = useState("");
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchWindowData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching window data:", error);
    }
  };

  useEffect(() => {
    fetchWindowData();
  }, []);

  const openModal = (windowType) => {
    setShowModal(true);
    setActiveWindowType(windowType);
    const windowToUpdate = data.find(
      (window) => window.Windowtype === windowType
    );
    if (windowToUpdate) {
      setTextareaValue(windowToUpdate.Content);
    }
  };

  // console.log(data);
  const closeModal = () => {
    setShowModal(false);
    setTextareaValue("");
    setActiveWindowType("");
  };

  const handleAddAndUpdate = async () => {
    await axios.post(`${apiUrl}/window`, {
      Content: textareaValue,
      Windowtype: activeWindowType,
      Count:
        data.filter((window) => window.Windowtype === activeWindowType).length +
        1,
    });
    fetchWindowData();
    closeModal();
  };

  return (
    <>
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <div className="">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>Content</p>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                cols="50"
                rows="8"
              />
            </div>
            {textareaValue.length > 0 && (
              <>
                <button onClick={handleAddAndUpdate}>
                  {data.filter(
                    (window) => window.Windowtype === activeWindowType
                  ).length
                    ? "Update"
                    : "Add"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <ResizableComponent
        onAdd={() => openModal("Window 1")}
        onUpdate={() => openModal("Window 1")}
        data={data.find((item) => item.Windowtype === "Window 1")}
      />
      <ResizableComponent
        onAdd={() => openModal("Window 2")}
        onUpdate={() => openModal("Window 2")}
        data={data.find((item) => item.Windowtype === "Window 2")}
      />
      <ResizableComponent
        onAdd={() => openModal("Window 3")}
        onUpdate={() => openModal("Window 3")}
        data={data.find((item) => item.Windowtype === "Window 3")}
      />
    </>
  );
};
