import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarModules } from '../data/grammarModules';
import "../style/grammarLesson.css";
import AuthContext from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GrammarLesson() {
  const { id: moduleId } = useParams();
  const navigate = useNavigate();
  const { user, backendRequest } = useContext(AuthContext); // centralized backend

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const module = grammarModules[moduleId];
  const current = module.practiceSentences[currentIndex];

  const checkAnswer = () => setShowFeedback(true);

  const next = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setCurrentIndex(i => i + 1);
  };

  const completeLesson = async () => {
    if (!user) {
      toast.warn("Make an account to save your progress!", { autoClose: 3000 });
      setTimeout(() => navigate('/isl-grammar'), 3000);
      return;
    }

    try {
      const res = await backendRequest.post('/complete_grammar_module', {
        module_name: module.name
      });

      toast.success(res.data.message || "Lesson Completed!", { autoClose: 3000 });

      // Mark lesson completed locally for UI feedback
      setLessonCompleted(true);

      // Delay navigation to allow toast/banner to show
      setTimeout(() => navigate('/isl-grammar'), 3000);

    } catch (err) {
      console.error("Error marking lesson as completed:", err);
      const msg = err.response?.data?.detail || "Failed to complete the lesson.";
      toast.error(`❌ ${msg}`, { autoClose: 3000 });

      setTimeout(() => navigate('/isl-grammar'), 3000);
    }
  };

  return (
    <div className="grammar-lesson-container">
      <button onClick={() => navigate('/isl-grammar')}>← Back to Menu</button>

      <h2>{module.name} Grammar</h2>
      <p><strong>Rule:</strong> {module.rule}</p>
      {module.explanation && <p className="explanation"><strong>Explanation:</strong> {module.explanation}</p>}
      <p><strong>Example:</strong> {module.example.english} → <em>{module.example.isl}</em></p>

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

      {showFeedback && userAnswer.trim().toLowerCase() === current.isl.toLowerCase() && (
        currentIndex < module.practiceSentences.length - 1 ? (
          <button onClick={next}>Next Sentence</button>
        ) : (
          <button onClick={completeLesson}>Finish Lesson</button>
        )
      )}

      {/* Show completion banner */}
      {lessonCompleted && (
        <p className="lesson-completed-msg">🎉 Lesson Completed!</p>
      )}

      <ToastContainer />
    </div>
  );
}
