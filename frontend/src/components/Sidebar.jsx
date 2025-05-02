import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "../style/Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useContext(AuthContext);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="logo-container">
        {!collapsed && <h2>🧭 Menu</h2>}

        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      <nav>
        <ul>
          <li><Link to="/"  class="links">{collapsed ? "🏠" : "🏠 Home"}</Link></li>
          <li><Link to="/object-detection" class="links">{collapsed ? "🔍" : "🔍 Object Detection"}</Link></li>
          <li><Link to="/quiz" class="links">{collapsed ? "🧠" : "🧠 Quiz"}</Link></li>
          <li><Link to="/video-library" class="links">{collapsed ? "📚" : "📚 Video Library"}</Link></li>
          <li><Link to="/isl-grammar" class="links">{collapsed ? "📝" : "📝 ISL Grammar"}</Link></li>
          <li><Link to="/isl-grammar/convertToISL" class="links">{collapsed ? "🔄" : "🔄 Convert to ISL"}</Link></li>

          <br />
          {user ? (
            <li>
              <button onClick={logout} className="logout-btn">
                {collapsed ? "🚪" : "🚪 Logout"}
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/login">{collapsed ? "🔐" : "🔐 Login"}</Link></li>
              <li><Link to="/register">{collapsed ? "🆕" : "🆕 Sign Up"}</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
