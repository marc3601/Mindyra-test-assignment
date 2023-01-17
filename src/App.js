import React, { useState, useEffect } from "react";
import "./App.css";
import dummy from "../data/dummy.json";
import ImageSlider from "../components/ImageSlider";
const App = () => {
  return (
    <>
      <h1>Slider</h1>
      <ImageSlider images={dummy} />
    </>
  );
};
export default App;
