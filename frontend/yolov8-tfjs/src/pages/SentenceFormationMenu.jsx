import React from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarModules } from '../data/grammarModules';
import "../style/sentenceMenu.css";

export default function SentenceFormationMenu() {
  const navigate = useNavigate();

  return (
    <div className="sentence-menu-container">
      <h2>Select Sentence Formation Type</h2>
      <ul>
        {Object.values(grammarModules).map(module => (
          <li key={module.id}>
            <button onClick={() => navigate(`/isl-grammar/type/${module.id}`)}>
              {module.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
