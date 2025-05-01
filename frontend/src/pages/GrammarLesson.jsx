import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarModules } from '../data/grammarModules';
import "../style/grammarLesson.css";
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the default styles for the toast

export default function GrammarLesson() {
  const { id: moduleId } = useParams(); // get ID from route
  const navigate = useNavigate(); // for going back
  const { user } = useContext(AuthContext); // Access logged-in user

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false); // Track if lesson is completed

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

  const completeLesson = async () => {
    const token = localStorage.getItem('authToken');
    if (user && token) {
      try {
        const moduleName = module.name;

        const res = await axios.post(
          'http://localhost:5000/complete_grammar_module',
          {
            module_name: moduleName
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        // Show success toast
        toast.success(res.data.message || "Navigating to Menu", {
          autoClose: 3000, // Automatically closes after 3 seconds
        });

        // Delay navigation to allow toast to show
        setTimeout(() => {
          setLessonCompleted(true);
          navigate('/isl-grammar');
        }, 3000); // Delay for 3 seconds (same as autoClose)

      } catch (err) {
        console.error("Error marking lesson as completed:", err);
        const msg = err.response?.data?.detail || "Failed to complete the lesson.";

        // Show error toast
        toast.error(`❌ ${msg}`, {
          autoClose: 3000, // Automatically closes after 3 seconds
        });

        // Delay navigation to allow toast to show
        setTimeout(() => {
          navigate('/isl-grammar');
        }, 3000); // Delay for 3 seconds
      }
    } else {
      toast.warn("Make an account to save your progress!", {
        autoClose: 3000, // Automatically closes after 3 seconds
      });

      // Delay navigation to allow toast to show
      setTimeout(() => {
        navigate('/isl-grammar');
      }, 3000); // Delay for 3 seconds
    }
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


      {/* ToastContainer is necessary to display the toast notifications */}
      <ToastContainer />
    </div>
  );
}
