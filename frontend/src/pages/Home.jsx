import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero fade-in">
        <h1>Welcome to ISL Learning Hub</h1>
        <p>
          Learn Indian Sign Language (ISL) through real-world object detection, grammar tools,
          interactive quizzes, and educational videos — all for free!
        </p>
        <div className="auth-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/register" className="btn register">Register</Link>
        </div>
      </section>

      {/* Login Encouragement */}
      <section className="login-reminder bounce-in">
        <h2>Why Sign Up?</h2>
        <p>
          Track your learning journey, save quiz progress, and become part of a
          supportive community helping one another grow in ISL!
        </p>
        <p>
          We’re building a space where users can publish, polish, and perfect their skills. 
          Registering is your first step to contributing!
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Explore Features</h2>
        <div className="feature-grid">
          <FeatureCard
            title="Object Detection"
            description="Use your camera to detect real-world objects and instantly learn their ISL signs and meaning. It’s fun and makes learning intuitive!"
            to="/object-detection"
          />
          <FeatureCard
            title="Grammar Lessons"
            description="Understand ISL grammar, sentence reordering, and formation — the most critical part of fluency. Your feedback here is most welcome!"
            to="/isl-grammar"
          />
          <FeatureCard
            title="Interactive Quiz"
            description="Play through our quiz-based learning game and test your knowledge. Try reaching the final level — can you do it?"
            to="/quiz"
          />
          <FeatureCard
            title="Translate to ISL (Beta)"
            description="Try our rule-based English to ISL converter. Deep learning version coming soon — we need your help to train it!"
            to="isl-grammar/convertToISL"
          />
          <FeatureCard
            title="Video Library"
            description="Watch ISL animations and grammar clips in action. Perfect for visual learners. More content added regularly!"
            to="/video-library"
          />
        </div>
      </section>

      {/* Community Section */}
      <section className="community fade-in">
        <h2>Help Us Improve</h2>
        <p>
          Everything here is just the beginning. Your honest feedback is needed
          to make this accurate and impactful. Whether it’s grammar rules,
          sentence suggestions, or ideas — reach out!
        </p>
        <p>
          🔥 Be part of a bold mission to revolutionize ISL learning. We have
          ambitious goals: community content sharing, user dashboards,
          certification paths, and much more — all powered by YOU.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Questions, suggestions, or feedback? Reach out and join our journey:
        </p>
        <p className="email">
          📧 <a href="mailto:yadaulakh1977@gmail.com">yadaulakh1977@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, to }) => (
  <Link to={to} className="feature-link">
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </Link>
);

export default Home;
