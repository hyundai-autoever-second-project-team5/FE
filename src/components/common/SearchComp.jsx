import React, { useEffect, useState } from "react";

const mockSuggestions = [
  { id: 1, title: "React" },
  { id: 2, title: "JavaScript" },
  { id: 3, title: "TypeScript" },
  { id: 4, title: "Tailwind CSS" },
  { id: 5, title: "Node.js" },
  { id: 6, title: "Express" },
  { id: 7, title: "MongoDB" },
  { id: 8, title: "GraphQL" },
  { id: 9, title: "Redux" },
  { id: 10, title: "Webpack" },
];

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
          const filteredSuggestions = mockSuggestions.filter((item) =>
            item.title.toLowerCase().includes(trimmedQuery.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        }, 300);
      } catch (error) {
        console.error("검색 제안 fetch 에러:", error);
        setSuggestions([]);
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