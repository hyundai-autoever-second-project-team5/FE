import React from "react";

const GenreChip = ({ text }) => {
  return (
    <div className="p-2 rounded-md text-white border-white border min-w-[80px] text-center hover:bg-white hover:text-black transition duration-300">
      {text}
    </div>
  );
};

export default GenreChip;
