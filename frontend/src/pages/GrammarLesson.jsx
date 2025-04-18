import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarModules } from '../data/grammarModules';
import "../style/grammarLesson.css";

export default function GrammarLesson() {
  const { id: moduleId } = useParams(); // get ID from route
  const navigate = useNavigate(); // for going back

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const module = grammarModules[moduleId];
  const current = module.practiceSentences[currentIndex];

  const checkAnswer = () => {
    setShowFeedback(true);
  };

  const next = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setCurrentIndex(i => i + 1);
  };

  return (
    <div className="grammar-lesson-container">
      <button onClick={() => navigate('/isl-grammar')}>← Back to Menu</button>
      <h2>{module.name} Grammar</h2>
      <p><strong>Rule:</strong> {module.rule}</p>
      {module.explanation && (
        <p className="explanation"><strong>Explanation:</strong> {module.explanation}</p>
      )}
      <p><strong>Example:</strong> {module.example.english} → <em>{module.example.isl}</em></p>

      {currentIndex < module.practiceSentences.length ? (
        <>
          <p><strong>Sentence:</strong> {current.english}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type ISL version here"
          />
          <button onClick={checkAnswer}>Check</button>

          {showFeedback && (
            <p>
              {userAnswer.trim().toLowerCase() === current.isl.toLowerCase()
                ? "✅ Correct!"
                : `❌ Incorrect Answer: ${current.isl}`}
            </p>
          )}

          {showFeedback && currentIndex < module.practiceSentences.length - 1 && (
            <button onClick={next}>Next Sentence</button>
          )}
        </>
      ) : (
        <p>🎉 Lesson completed!</p>
      )}
    </div>
  );
}
