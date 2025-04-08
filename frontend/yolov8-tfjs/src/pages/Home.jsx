import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <h1>Welcome to the Multi-Feature App</h1>
      <p>Select a feature:</p>
      <Link to="/object-detection">
        <button>🔍 Live Object Detection</button>
      </Link>
    </div>
  );
};

export default Home;
