import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-row border border-white rounded-xl px-3 max-w-[200px]">
      <input
        type="text"
        className="border-none bg-transparent focus:outline-none text-white w-full"
      />
      <IconButton>
        <FontAwesomeIcon icon={faSearch} color="white" />
      </IconButton>
    </div>
  );
};

export default Search;
