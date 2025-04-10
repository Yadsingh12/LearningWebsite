import { useState, useRef, useEffect } from "react";
import "../style/BoundingBoxPopup.css";

const BoundingBoxPopup = ({ boundingBoxes, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [labelsData, setLabelsData] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    // Load labels.json from the public folder dynamically
    fetch("/labels.json")
      .then((response) => response.json())
      .then((data) => setLabelsData(data))
      .catch((error) => console.error("Error loading labels:", error));
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!boundingBoxes || boundingBoxes.length === 0) return null;

  const currentBox = boundingBoxes[currentIndex];

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <h3>{currentBox.name}</h3>
        <p>{currentBox.description}</p>
        {currentBox.sample_video && (
          currentBox.sample_video.includes("youtube.com") ? (
            <iframe
              width="560"
              height="315"
              src={currentBox.sample_video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <video src={currentBox.sample_video} controls />
          )
        )}

        {boundingBoxes.length > 1 && (
          <button onClick={() => setCurrentIndex((prev) => (prev + 1) % boundingBoxes.length)}>Next</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BoundingBoxPopup;
