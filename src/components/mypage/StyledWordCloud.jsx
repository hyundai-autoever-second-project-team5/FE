import React from "react";
import ReactWordcloud from "react-wordcloud";
// import "tippy.js/dist/tippy.css";
// import "tippy.js/animations/scale.css";

const StyledWordCloud = ({ words }) => {
  //   const words = [
  //     { text: "mistake", value: 11 },
  //     { text: "thought", value: 16 },
  //     { text: "bad", value: 17 },
  //     { text: "correct", value: 10 },
  //     { text: "day", value: 54 },
  //     { text: "time", value: 77 },
  //     { text: "doctor", value: 70 },
  //     { text: "office", value: 64 },
  //     { text: "work", value: 64 },
  //     { text: "patient", value: 59 },
  //   ];
  const changedWords = Object.entries(words).map(([key, value]) => ({
    text: value,
    value: Math.floor(Math.random() * 100) + 1, // 1부터 100 사이의 랜덤 값
  }));

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [16, 90],
    fontStyle: "normal",
    fontWeight: "bold",
    padding: 5,
    rotations: 2,
    rotationAngles: 0,
    scale: "sqrt", // 스케일을 선형으로 변경
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return <ReactWordcloud options={options} words={changedWords} />;
};

export default StyledWordCloud;
