import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // adjust path if needed
import Home from "./pages/Home";
import ObjectDetection from "./pages/ObjectDetection";
import Quiz from "./pages/Quiz";
import SentenceFormationMenu from "./pages/SentenceFormationMenu";
import GrammarLesson from "./pages/GrammarLesson";

const App = () => {
  return (
    <Router basename="/frontend">
      <Routes>
        {/* Layout wraps these routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/object-detection" element={<ObjectDetection />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/isl-grammar" element={<SentenceFormationMenu />} />
          <Route path="/isl-grammar/type/:id" element={<GrammarLesson />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
