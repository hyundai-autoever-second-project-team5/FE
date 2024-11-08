import React from "react";
import Card from "../components/common/Card";

const Home = () => {
  const handleCardHover = () => {};
  return (
    <div className="h-[2000px] px-5">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array(9)
          .fill(0)
          .map((item) => (
            <Card
              posterSrc={
                "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F11%2Fmarvel-reportedly-considering-reassembling-original-six-avengers-actors-for-new-film-info-1.jpg?q=75&w=800&cbr=1&fit=max"
              }
              avgScore={3.5}
              myScore={5}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
