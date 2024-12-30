import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Banner from "./components/Banner";
import FoodRecommender from "./components/foodRecommender";
import "./style.css";

export default function Home() {
  return (
    <div className="App">
      <Header />
      <Banner
        title="Fast food, made fresh, right to your door"
        subtitle="Explore Our Menu"
        imageURL="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format"
      />
      <FoodRecommender />
    </div>
  );
}
