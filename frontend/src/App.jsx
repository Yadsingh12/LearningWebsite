import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ObjectDetection from "./pages/ObjectDetection";
import Quiz from "./pages/Quiz";
import SentenceFormationMenu from "./pages/SentenceFormationMenu";
import GrammarLesson from "./pages/GrammarLesson";
import ConvertToISL from "./pages/ConvertToISL";
import { AuthProvider } from "./Context/AuthContext"; // ✅ use from context folder
import Login from "./pages/Login"; // you'll create this
import Register from "./pages/Register"; // optional, create if needed

const App = () => {
  return (
    <AuthProvider>
      <Router basename="/frontend">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/object-detection" element={<ObjectDetection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/isl-grammar" element={<SentenceFormationMenu />} />
            <Route path="/isl-grammar/type/:id" element={<GrammarLesson />} />
            <Route path="/isl-grammar/convertToISL" element={<ConvertToISL />} />
          </Route>
          {/* 🔒 Auth routes outside Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
