import React, { useEffect, useState } from "react";
import '../style/Quiz.css';


const Quiz = () => {
  const [labels, setLabels] = useState([]);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);

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
  };

  const handleClick = (selected) => {
    if (selected.name === question.name) {
      console.log("✅ Correct");
    } else {
      console.log("❌ Wrong");
    }
    generateQuestion(labels);
  };

  if (!question) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      <h2>🎥 Identify the Object</h2>
      <video src={question.sample_video} controls width="320" autoPlay muted />
      <div className="options" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        {options.map((opt) => (
          <img
            key={opt.name}
            src={opt.image}
            alt={opt.name}
            onClick={() => handleClick(opt)}
            style={{
              cursor: "pointer",
              border: "2px solid #ccc",
              borderRadius: "8px",
              width: 120,
              height: 120,
              objectFit: "cover"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
