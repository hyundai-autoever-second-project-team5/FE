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

const SearchComp = ({ query }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      try {

        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data.results);


        // 모의 데이터 필터링
        const filteredSuggestions = mockSuggestions.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        // 비동기 동작 시뮬레이션
        setTimeout(() => {
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
    <div className="absolute left-0 right-0 z-10 mt-2 overflow-y-auto bg-white border border-gray-300 rounded-md top-full max-h-52">
      <ul className="p-0 m-0 list-none">
        {suggestions.map((item) => (
          <li
            key={item.id}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              // 클릭 시 원하는 동작 추가 (예: 검색어 설정, 페이지 네비게이션 등)
              console.log(`선택된 항목: ${item.title}`);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComp;