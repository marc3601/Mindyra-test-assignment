import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import Loading from "./Loading";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [urls, setUrls] = useState([]);
  const [increasing, setIncreasing] = useState(true);
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
    setIncreasing(true);
    if (current < images.length - 1) {
      setCurrent((prev) => (prev += 1));
    }
  };
  const handlePrev = () => {
    setIncreasing(false);
    if (current > 0) {
      setCurrent((prev) => (prev -= 1));
    }
  };

  const prevStyles = {
    transform: `translateX(-100%)`,
    transitionProperty: `${increasing ? `transform` : `none`}`,
    transition: `${increasing ? `transform ease-out 0.3s` : `none`}`,
  };
  const nextStyles = {
    transform: `translateX(100%)`,
    transitionProperty: `${!increasing ? `transform` : `none`}`,
    transition: `${!increasing ? `transform ease-out 0.3s` : `none`}`,
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
            style={
              i === current - 1
                ? prevStyles
                : i === current + 1
                ? nextStyles
                : {}
            }
          >
            {loading && current == i && <Loading />}
            {i == current - 1 && (
              <img src={urls[current - 1] ? urls[current - 1] : ""}></img>
            )}
            {i == current && <img src={urls[current]}></img>}
            {i == current + 1 && (
              <img src={urls[current + 1] ? urls[current + 1] : ""}></img>
            )}
          </div>
        ))}
      </div>
      {current > 0 && (
        <div className="prev" onClick={handlePrev}>
          ‹
        </div>
      )}

      {current < images.length - 1 && (
        <div className="next" onClick={handleNext}>
          ›
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
