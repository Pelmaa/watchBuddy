import Navbar from "../../components/navbar/Navbar";
import Team from "./Team";

import "./team.css";

const About = () => {
  return (<div><Navbar/>
   <div className="about-container">
      <div className="about-background" />
      <div className="about-overlay" />

      <div className="about-content">
        <h2>About WatchBuddy</h2>
        <p className="about-description">
          <strong>WatchBuddy</strong> is your ultimate movie tracking companion —
          built to help movie enthusiasts stay organized, share their opinions, and enjoy a seamless cinematic experience. Whether you're a casual viewer or a film buff,
          WatchBuddy makes sure you never lose track of your watchlist, ratings, or reviews.
        </p>

        <p className="about-description">
          With features like personalized watchlists, progress tracking, and rating systems, our goal is to empower you to make better viewing choices and celebrate your love for movies and TV shows. It's more than an app — it's your personal movie assistant.
        </p>

        <p className="about-description">
          <strong>Why WatchBuddy?</strong><br />
          ✔️ Add and manage your favorite titles effortlessly.<br />
          ✔️ Track watched, currently watching, and planned content.<br />
          ✔️ Rate and review to build your movie memory.<br />
          ✔️ Intuitive UI with a Netflix-inspired dark theme.
        </p>

        <div id="team-section" className="team-section">
  <h3>Our Amazing Team</h3>
  

          <p className="about-description">
            Behind WatchBuddy is a passionate team of developers committed to building a world-class movie companion app — crafted in Bhutan, with love and code.
          </p>
          <Team />
        </div>
      </div>
    </div>
  </div>
   
  );
};

export default About;
