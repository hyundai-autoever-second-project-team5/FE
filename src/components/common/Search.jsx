import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-row border border-white rounded-lg px-2">
      <input
        type="text"
        className="border-none bg-transparent focus:outline-none text-white"
      />
      <IconButton>
        <FontAwesomeIcon icon={faSearch} color="white" />
      </IconButton>
    </div>
  );
};

export default Search;
