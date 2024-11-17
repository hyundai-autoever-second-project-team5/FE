import React from "react";
import ReactWordcloud from "react-wordcloud";

const StyledWordCloud = ({ words }) => {
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

  return (
    <ReactWordcloud
      options={options}
      words={changedWords}
      className="w-full min-w-0"
    />
  );
};

export default StyledWordCloud;
