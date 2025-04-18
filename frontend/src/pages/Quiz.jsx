import React, { useEffect, useState } from "react";
import "../style/Quiz.css";

const Quiz = () => {
  const [labels, setLabels] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // Feedback message for correct/incorrect answers
  const [isDisabled, setIsDisabled] = useState(false); // Disable options after an answer is selected

  useEffect(() => {
    fetch("/labels.json")
      .then((res) => res.json())
      .then((data) => {
        setLabels(data);
        generateQuestion(data);
      });
  }, []);

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
    setFeedback(null); // Reset feedback after a new question
  };

  const handleClick = (selected) => {
    setIsDisabled(true);
    if (selected.name === question.name) {
      setFeedback("✅ Correct!");
      setScore(score + 1); // Increase score for correct answer
    } else {
      setFeedback("❌ Wrong! Try again.");
    }
    setTimeout(() => generateQuestion(labels), 1500); // Generate new question after a delay
  };

  if (!question) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      <h2>🎥 Identify the Object</h2>
      <video
        src={question.sample_video}
        controls
        width="320"
        autoPlay
        muted
      />
      <div className="score">
        <p>Score: {score}</p>
      </div>

      <div className="feedback">
        {feedback && <p>{feedback}</p>}
      </div>

      <div className="options" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        {options.map((opt) => (
          <img
            key={opt.name}
            src={opt.image}
            alt={opt.name}
            onClick={() => !isDisabled && handleClick(opt)} // Disable click after an answer
            style={{
              cursor: isDisabled ? "not-allowed" : "pointer",
              border: "2px solid #ccc",
              borderRadius: "8px",
              width: 120,
              height: 120,
              objectFit: "cover",
              opacity: isDisabled ? 0.6 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
