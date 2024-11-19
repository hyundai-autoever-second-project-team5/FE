import React from "react";

const GenreChip = ({ text, handleChange, isSelected }) => {
  return (
    <div
      className={`p-2 rounded-md  border min-w-[80px] text-center hover:bg-white hover:text-black transition duration-300 ${
        isSelected ? "bg-white text-black" : "text-white border-white"
      }`}
      onClick={handleChange}
    >
      {text}
    </div>
  );
};

export default GenreChip;
