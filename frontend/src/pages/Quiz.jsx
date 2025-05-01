import React, { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import "../style/Quiz.css";
import AuthContext from '../Context/AuthContext';
import { Link } from "react-router-dom"; // Ensure you're using React Router

const Quiz = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('authToken');

  const [labels, setLabels] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showToast, setShowToast] = useState(false); // 👈 Toast state

  useEffect(() => {
    fetch("/labels.json")
      .then((res) => res.json())
      .then((data) => {
        const enabledData = data.filter((item) => item.enabled);
        setLabels(enabledData);
      });

    if (user && token) {
      fetch("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => {
          setHighScore(data.high_score || 0);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      const guestScore = parseInt(localStorage.getItem("guestHighScore"), 10);
      if (!isNaN(guestScore)) setHighScore(guestScore);
    }
  }, [user, token]);

  const startQuiz = () => {
    setScore(0);
    setShowCongrats(false);
    setFeedback(null);
    setHasStarted(true);
    generateQuestion(labels);
  };

  const generateQuestion = (data) => {
    const correct = data[Math.floor(Math.random() * data.length)];
    const others = data
      .filter((label) => label.name !== correct.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const allOptions = [...others, correct].sort(() => 0.5 - Math.random());

    setQuestion(correct);
    setOptions(allOptions);
    setIsDisabled(false);
    setFeedback(null);
  };

  const handleClick = (selected) => {
    setIsDisabled(true);

    if (selected.name === question.name) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback("✅ Correct!");
      setTimeout(() => generateQuestion(labels), 1500);
    } else {
      setFeedback("❌ Wrong!");
      updateHighScore(score);
      setScore(0);
      setTimeout(() => setHasStarted(false), 5000);
    }
  };

  const updateHighScore = (latestScore) => {
    if (latestScore > highScore) {
      setHighScore(latestScore);
      setShowCongrats(true);

      if (user && token) {
        fetch("http://localhost:5000/update_highscore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ highScore: latestScore }),
        });
      } else {
        localStorage.setItem("guestHighScore", latestScore);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000); // 👈 Auto-hide after 5 sec
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="quiz-page">
        <h2>🎯 Welcome to the Quiz!</h2>
        <p>High Score: 🏆 {highScore}</p>
        <button onClick={startQuiz} className="start-button">
          ▶️ Start Quiz
        </button>
      </div>
    );
  }

  if (!question) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      <h2>🎥 Identify the Object</h2>

      {showCongrats && (
        <div className="congrats-animation">🎉 New High Score! 🎉</div>
      )}

      {showToast && (
        <div className="login-toast">
          <p>
            🎯 <strong>New High Score!</strong> <br />
            <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to save your progress.
          </p>
        </div>
      )}

      <div className="video-wrapper">
        <ReactPlayer
          url={question.sample_video}
          controls={true}
          playing={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </div>

      <div className="score">
        <p>Score: {score}</p>
        <p>🏆 High Score: {highScore}</p>
      </div>

      <div className="feedback">{feedback && <p>{feedback}</p>}</div>

      <div className="options">
        {options.map((opt) => (
          <img
            key={opt.name}
            src={opt.image}
            alt={opt.name}
            onClick={() => !isDisabled && handleClick(opt)}
            className={`option-img ${isDisabled ? "disabled" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
