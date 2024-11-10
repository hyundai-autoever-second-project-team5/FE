import { Button, IconButton, Typography } from "@mui/material";
import React from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full p-3 bg-primary z-10">
      <Typography variant="h5" color="white">
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
  );
};

export default Header;
