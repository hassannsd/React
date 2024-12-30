import React from "react";
import "./style.css";
import Header from "./components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <h1>About Cheesy Snacks</h1>
        <p>
          Welcome to <strong>Cheesy Snacks</strong>, the ultimate destination
          for all things cheesy and delicious! We are passionate about bringing
          you the most mouth-watering, cheese-loaded treats that will satisfy
          your cravings and leave you coming back for more.
        </p>
        <p>
          At Cheesy Snacks, we believe that cheese makes everything better, and
          we’re here to prove it! From cheesy fries and melty grilled sandwiches
          to creative cheese dips and signature snacks, each dish is crafted
          with high-quality ingredients and a generous serving of cheese, of
          course!
        </p>
        <p>
          Whether you’re grabbing a quick bite or sitting down with friends to
          enjoy our signature cheesy creations, you’ll always find something to
          tickle your taste buds. We’re dedicated to providing a fun and
          friendly atmosphere where you can indulge in your favorite cheesy
          comfort foods, made fresh with love.
        </p>
        <p>
          Come on over to <strong>Cheesy Snacks</strong> and experience the
          cheesiest delights that will make your day a little bit better—and a
          whole lot tastier!
        </p>
      </div>
    </>
  );
};

export default About;
