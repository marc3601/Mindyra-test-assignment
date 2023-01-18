import React from "react";
import "./App.css";
import data from "../data/data.json";
import ImageSlider from "../components/ImageSlider";
const App = () => {
  const count = data.length;
  return (
    <>
      <h1 className="title">{`${count} programmers`}</h1>
      <ImageSlider images={data} />
    </>
  );
};
export default App;
