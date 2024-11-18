import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import Notification from "./Notification";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { getCookie, removeCookie } from "../../api/cookie";
import { postSignOut } from "../../api/user";
import GenreList from "./GenreList";
import GenereSelectModal from "../main/GenereSelectModal";

const Header = () => {
  const navigation = useNavigate();
  const location = useLocation(); // 현재 URL 정보 가져오기\
  const isSearchPage = location.pathname.includes("search");
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const { data, refetch } = useGetUserInfo(getCookie("accessToken"));

  // 로그인모달
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // 장르선택모달
  const handleSurveyOpen = () => setSurveyOpen(true);

  // 프로필 메뉴 클릭
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (url) => {
    handleMenuClose();
    navigation(url);
  };

  const handleLogout = () => {
    handleMenuClose();
    postSignOut().then(() => {
      removeCookie("accessToken");
      navigation("/");
      refetch();
    });
  };

  
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
    if (open || anchorEl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, anchorEl]);


  return (
    <>
      <div
        className={`fixed flex flex-col gap-3 justify-center items-center w-full py-3 z-30 transition-all duration-300 ${
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
              <Notification />
              {data ? (
                <div className="flex flex-row items-center gap-1">
                  <img
                    src={
                      data?.profile_url ||
                      "https://avatars.githubusercontent.com/u/89841486?v=4"
                    }
                    alt="profile"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <IconButton
                    onClick={handleMenuClick}
                    size="small"
                    aria-controls={menuOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                  >
                    <FontAwesomeIcon icon={faCaretDown} color="white" />
                  </IconButton>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleOpen}
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
        {isSearchPage && <GenreList isScrolled={isScrolled} />}
      </div>
      <LoginModal
        open={open}
        handleClose={handleClose}
        handleSurveyOpen={handleSurveyOpen}
      />
      <GenereSelectModal
        open={surveyOpen}
        handleClose={() => setSurveyOpen(false)}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "rgba(250, 250, 250, 0.4)",
            backdropFilter: "blur(8px)",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2,
            borderRadius: "8px",
            minWidth: "150px",
            "& .MuiMenuItem-root": {
              padding: "12px 16px",
              color: "black",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            },
          },
        }}
        MenuListProps={{
          sx: {
            padding: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleMenuItemClick("/mypage")}>
          마이페이지
        </MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
