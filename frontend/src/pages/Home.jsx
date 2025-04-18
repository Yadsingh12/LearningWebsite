import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css"; // Ensure the path is correct

const Home = () => {
  return (
    <div className="App">
      {/* Hero Section */}
      <section style={{ maxWidth: "800px" }}>
        <h1>Welcome to ISL Learning Hub</h1>
        <p>
          Learn Indian Sign Language (ISL) interactively through real-time
          gesture detection, grammar lessons, quizzes, and more!
        </p>
      </section>

      {/* Features Section */}
      <section style={{ maxWidth: "1000px", width: "100%" }}>
        <h2 style={{ margin: "2rem 0 1rem 0", color: "#444" }}>Explore Features</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <FeatureCard
            title="Object Detection"
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

      {/* Contact Section */}
      <section style={{ marginTop: "3rem", textAlign: "center" }}>
        <h2>Contact Us</h2>
        <p style={{ color: "#555" }}>
          Have questions, suggestions, or feedback? Drop an email at:
        </p>
        <p style={{ marginTop: "0.5rem", fontSize: "1.1rem", color: "#333" }}>
          📧 Email: <a href="mailto:yadaulakh1977@gmail.com">yadaulakh1977@gmail.com</a><br />
        </p>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, to }) => (
  <Link to={to}>
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1.5rem",
        width: "250px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ marginBottom: "1rem", color: "#222" }}>{title}</h3>
      <p style={{ color: "#555" }}>{description}</p>
    </div>
  </Link>
);

export default Home;
