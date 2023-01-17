import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images.length > urls.length) {
      setLoading(true);
      handleImageFetch(images[current]);
    }
  }, [current]);

  const handleImageFetch = (image) => {
    fetch(image.url)
      .then((res) => res.json())
      .then((data) => {
        if (!urls.includes(data.avatar_url)) {
          setUrls([...urls, data.avatar_url]);
        }
        setLoading(false);
      });
  };

  const handleNext = () => {
    if (current < images.length - 1) {
      setCurrent((prev) => (prev += 1));
    }
  };
  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => (prev -= 1));
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        {images.map((img, i) => (
          <div
            key={i}
            id={i}
            className={`image${i == current ? "-active" : ""}${
              i == current - 1 ? "-prev" : ""
            }${i == current + 1 ? "-next" : ""}`}
          >
            {loading && current == i && <p>loading...</p>}
            {/* {i == current - 1 && (
              <img src={urls[current - 1] ? urls[current - 1] : ""}></img>
            )} */}
            {i == current && <img src={urls[current]}></img>}
            {/* {i == current + 1 && (
              <img src={urls[current + 1] ? urls[current + 1] : ""}></img>
            )} */}
          </div>
        ))}
      </div>
      <div className="prev" onClick={handlePrev}>
        ‹
      </div>
      <div className="next" onClick={handleNext}>
        ›
      </div>
    </div>
  );
};

export default ImageSlider;
