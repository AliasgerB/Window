import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResizableComponent } from "../Resizable/Resizable";
import "./window.css";

/**
 * WindowComponent is a component that manages resizable windows.
 * It fetches window data from an API, allows adding or updating window content,
 * and renders resizable windows using the ResizableComponent.
 * @returns {JSX.Element} A WindowComponent
 */
export const WindowComponent = () => {
  // State variables
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the modal
  const [textareaValue, setTextareaValue] = useState(""); // Stores the value of the textarea in the modal
  const [activeWindowType, setActiveWindowType] = useState(""); // Stores the type of the active window
  const [data, setData] = useState([]); // Stores window data fetched from the API
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL; // API URL

  // Function to fetch window data from the API
  const fetchWindowData = async () => {
    try {
      const response = await axios.get(apiUrl); // Fetch window data from the API
      setData(response.data); // Update window data in state
    } catch (error) {
      console.error("Error fetching window data:", error); // Log error if fetching fails
    }
  };

  // useEffect hook to fetch window data when the component mounts
  useEffect(() => {
    fetchWindowData(); // Fetch window data
  }, []);

  // Function to open the modal for adding or updating window content
  const openModal = (windowType) => {
    setShowModal(true); // Set showModal state to true to show the modal
    setActiveWindowType(windowType); // Set the active window type
    // Find the window to update based on window type
    const windowToUpdate = data.find(
      (window) => window.Windowtype === windowType
    );
    // If window exists, set the textarea value to its content
    if (windowToUpdate) {
      setTextareaValue(windowToUpdate.Content);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false); // Set showModal state to false to hide the modal
    setTextareaValue(""); // Reset the textarea value
    setActiveWindowType(""); // Reset the active window type
  };

  // Function to handle adding or updating window content
  const handleAddAndUpdate = async () => {
    // Send a POST request to the API to add or update window content
    if (textareaValue.length) {
      await axios.post(`${apiUrl}/window`, {
        Content: textareaValue,
        Windowtype: activeWindowType,
        Count:
          data.filter((window) => window.Windowtype === activeWindowType)
            .length + 1,
      });
      fetchWindowData(); // Fetch updated window data
      closeModal(); // Close the modal
    } else {
      setError("Please enter content");
    }
  };

  return (
    <>
      {/* Modal for adding or updating window content */}
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <div className="">
              {/* Close button */}
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>Content</p>
              {/* Textarea for entering window content */}
              <textarea
                value={textareaValue}
                onChange={(e) => {
                  setTextareaValue(e.target.value);
                  setError("");
                }}
                cols="50"
                rows="8"
              />
            </div>
            {/* Add or Update button */}

            <button onClick={handleAddAndUpdate}>
              {data.filter((window) => window.Windowtype === activeWindowType)
                .length
                ? "Update"
                : "Add"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      )}

      {/* Resizable components representing different windows */}
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
