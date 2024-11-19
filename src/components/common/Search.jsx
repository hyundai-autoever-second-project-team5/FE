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
      navigate(`/search`);
    }
  }, [searchParams, navigate]);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if (value.trim() !== "") {
        navigate(`/search?query=${encodeURIComponent(value)}`);
      } else {
        // 입력값이 비어있으면 메인 페이지로 이동
        navigate(`/`);
      }
    }, 300),
    [navigate]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 실시간으로 반영
    debouncedHandleInputChange(value);
  };

  return (
    <div className="flex flex-row rounded-lg px-2 w-full max-w-[120px] sm:max-w-[200px] items-center bg-white bg-opacity-20 backdrop-blur-md min-w-0 flex-grow">
      <IconButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} color="#82848b" />
      </IconButton>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full bg-transparent border-none focus:outline-none"
      />
      {query.length > 0 && <SearchComp query={query} />}
    </div>
  );
};

export default Search;
