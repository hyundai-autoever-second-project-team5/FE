import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-row rounded-lg px-2 max-w-[210px] items-center bg-white bg-opacity-20 backdrop-blur-md">
      <IconButton>
        <FontAwesomeIcon icon={faSearch} color="#82848b" />
      </IconButton>
      <input
        type="text"
        className="border-none bg-transparent focus:outline-none w-full"
      />
    </div>
  );
};

export default Search;
