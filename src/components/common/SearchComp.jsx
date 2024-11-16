import React, { useEffect, useState } from "react";

const SearchComp = ({ query = "" }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length === 0) {
        setSuggestions([]);
        return;
      }

      try {
        // 비동기 동작 시뮬레이션
        setTimeout(() => {
          
        }, 300);
      } catch (error) {
        
      }
    };

    fetchSuggestions();
  }, [query]);

  if (suggestions.length === 0) return null;

  return (
    <div className="">
      <ul className="p-0 m-0 list-none">
        {suggestions.map((item) => (
          <li
            key={item.id}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              console.log(`선택된 항목: ${item.title}`);
            }}
          >
            {item.title}          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComp;