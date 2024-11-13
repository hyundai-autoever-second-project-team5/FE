import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchComp from "./SearchComp";
import debounce from "lodash.debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    if (initialQuery) {
      setQuery(initialQuery);
      navigate(`/detail/${encodeURIComponent(initialQuery)}`);
    }
  }, [searchParams, navigate]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/detail/${encodeURIComponent(query)}`);
    }
  };

  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value.trim() !== "") {
        navigate(`/detail/${encodeURIComponent(value)}`);
      }
    }, 300),
    [navigate]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedHandleInputChange(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex flex-row rounded-lg px-2 max-w-[210px] items-center bg-white bg-opacity-20 backdrop-blur-md">
      <IconButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} color="#82848b" />
      </IconButton>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full bg-transparent border-none focus:outline-none"
      />
      {query.length > 0 && <SearchComp query={query} />} 
    </div>
  );
};

export default Search;