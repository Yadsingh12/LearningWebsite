import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "../style/Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <h2>🧭 Menu</h2>
      <nav>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/object-detection">🔍 Object Detection</Link></li>
          <li><Link to="/quiz">🧠 Quiz</Link></li>
          <li><Link to="/isl-grammar">📝 ISL Grammar</Link></li>
          <br></br>
          {user ? (
            <>
              {/* Optional: <li><Link to="/profile">👤 Profile</Link></li> */}
              <li><button onClick={logout} className="logout-btn">🚪 Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">🔐 Login</Link></li>
              <li><Link to="/register">🆕 Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
