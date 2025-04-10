import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ObjectDetection from "./pages/ObjectDetection";
import Quiz from "./pages/Quiz";

const App = () => {
  return (
    <Router basename="/yolov8-tfjs">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/object-detection" element={<ObjectDetection />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
