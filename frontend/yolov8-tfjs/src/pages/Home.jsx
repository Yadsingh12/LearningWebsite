import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="App">
      <h1>Welcome to the Multi-Feature App</h1>
      <p>Select a feature:</p>

      <Link to="/object-detection">
        <button>🔍 Live Object Detection</button>
      </Link>

      <Link to="/quiz">
        <button>🧠 Quiz Yourself</button>
      </Link>

      <Link to="/isl-grammar">
        <button>📝 ISL Grammar Practice</button>
      </Link>
    </div>
  );
};

export default Home;
