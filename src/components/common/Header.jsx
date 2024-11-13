import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 모달이 열릴 때 스크롤 비활성화, 닫힐 때 복구
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed flex justify-center items-center w-full py-3 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-primary bg-opacity-80 backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <div className="flex flex-row justify-between max-w-[1400px] w-full px-5">
          <Typography
            variant="h4"
            color="white"
            onClick={() => navigation("/")}
            className="cursor-pointer"
          >
            CineWall
          </Typography>
          <div className="flex flex-row gap-3">
            <Search />
            <div className="flex flex-row items-center gap-2">
              <IconButton>
                <FontAwesomeIcon icon={faBell} color="white" />
              </IconButton>
              <Button variant="contained" color="inherit" onClick={handleOpen}>
                로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
