import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "2rem" }}>
      {/* Hero Section */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Welcome to ISL Learning Hub</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "1rem auto" }}>
          A fun and interactive platform to help you learn Indian Sign Language (ISL) through object detection, quizzes, grammar lessons, and more!
        </p>
      </section>

      {/* Features Section */}
      <section>
        <h2 style={{ marginBottom: "1.5rem" }}>Features</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          <FeatureCard
            title="Real-time Object Detection"
            description="Use your camera to detect hand gestures and learn ISL signs interactively."
            to="/object-detection"
          />
          <FeatureCard
            title="Grammar Lessons"
            description="Explore ISL grammar rules and sentence formation techniques."
            to="/isl-grammar"
          />
          <FeatureCard
            title="Interactive Quiz"
            description="Test your knowledge and reinforce your learning with quizzes."
            to="/quiz"
          />
        </div>
      </section>

      {/* Benefits / Motivation */}
      <section style={{ marginTop: "4rem" }}>
        <h2>Why Choose This Platform?</h2>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
          <li>🚀 Easy-to-use and beginner friendly</li>
          <li>🎯 Focused on Indian Sign Language</li>
          <li>🧠 Engaging content with interactive tools</li>
        </ul>
      </section>
    </div>
  );
};

// Simple feature card component
const FeatureCard = ({ title, description, to }) => (
  <Link to={to} style={{ textDecoration: "none", color: "inherit", flex: "1 1 250px" }}>
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1.5rem",
        transition: "0.3s",
        height: "100%",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </Link>
);

export default Home;
