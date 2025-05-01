import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarModules } from '../data/grammarModules';
import "../style/sentenceMenu.css";

export default function SentenceFormationMenu() {
  const navigate = useNavigate();
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Adjust if you store auth differently
    console.log("Fetching user data with token:", token);
    fetch("http://localhost:5000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.completed_modules) {
          setCompletedModules(data.completed_modules);
          console.log("Completed modules:", data.completed_modules);
        }
      })
      .catch(err => console.error("Failed to fetch user data:", err));
  }, []);

  return (
    <div className="sentence-menu-container">
      <h2>📝 ISL Sentence Formation</h2>

      {/* About Section */}
      <div className="about-section">
        <h3>About ISL Sentence Formation</h3>
        <p>
          Indian Sign Language (ISL) is a visual language used by the deaf community in India. This tool will help you learn how to form grammatically correct sentences in ISL.
        </p>
        <p>
          The key to understanding ISL sentence structure is to recognize its unique word order and grammar rules, which differ from spoken languages.
        </p>
      </div>

      <div className="instructions-section">
        <h3>🔍 What to Do</h3>
        <ul>
          <li>Select a sentence type below to explore its structure.</li>
          <li>Each lesson will guide you through ISL grammar rules with examples.</li>
        </ul>
      </div>

      {/* Grammar Modules List */}
      <ul>
        {Object.values(grammarModules).map(module => (
          <li key={module.id}>
            <button onClick={() => navigate(`/isl-grammar/type/${module.id}`)}>
              {module.name}
              {completedModules.includes(module.name) && <span className="tick"> ✅</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
