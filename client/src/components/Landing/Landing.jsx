import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className="tagline1">Your Tasks, </span>
          <span className="tagline2">Simplified.</span>
        </h1>
        <p>
          Stay on top of your day with ease. Organize, track, and complete your
          tasks
          <br /> effortlessly. Make every day productive and stress-free.
        </p>
        <Link className="btn red" to="/register">
          Register Now!
        </Link>
        <Link className="btn blue" to="/login">
          Login
        </Link>
      </div>
      <div className="">
        <img
          src={`${process.env.PUBLIC_URL}/landing.jpg`}
          alt="landing"
          width={"100%"}
          height={515}
        />
      </div>
    </div>
  );
};

export default Landing;
