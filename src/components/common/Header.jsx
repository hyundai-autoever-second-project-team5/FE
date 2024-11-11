import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed flex justify-center items-center w-full py-3 z-30 transition-all duration-300 ${
        isScrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="flex flex-row justify-between max-w-[1400px] w-full px-5">
        <Typography variant="h4" color="white">
          CineWall
        </Typography>
        <div className="flex flex-row gap-3">
          <Search />
          <div className="flex flex-row gap-2 items-center">
            <IconButton>
              <FontAwesomeIcon icon={faBell} color="white" />
            </IconButton>
            <Button variant="contained" color="inherit">
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
