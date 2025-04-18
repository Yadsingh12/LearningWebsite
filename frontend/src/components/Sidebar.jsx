import React from "react";
import { Link } from "react-router-dom";
import "../style/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>🧭 Menu</h2>
      <nav>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/object-detection">🔍 Object Detection</Link></li>
          <li><Link to="/quiz">🧠 Quiz</Link></li>
          <li><Link to="/isl-grammar">📝 ISL Grammar</Link></li>
          {/* Add more links later like: Profile, Logout, etc. */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
