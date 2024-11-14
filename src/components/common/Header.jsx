import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hook/useGetUserInfo";
import { getCookie, removeCookie } from "../../api/cookie";

const Header = () => {
  const navigation = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const [bellAnchorEl, setBellAnchorEl] = React.useState(null);
  const bellModalOpen = Boolean(bellAnchorEl);
  const { data, refetch } = useGetUserInfo(getCookie("accessToken"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // 알림 버튼 클릭
  const handleBellOpen = (event) => {
    setBellAnchorEl(event.currentTarget);
  };
  const handleBellClose = () => {
    setBellAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    removeCookie("accessToken");
    navigation("/");
    refetch();
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
              <IconButton onClick={handleBellOpen}>
                <FontAwesomeIcon icon={faBell} color="white" />
              </IconButton>
              {data ? (
                <div className="flex flex-row items-center gap-1">
                  <img
                    src="https://avatars.githubusercontent.com/u/89841486?v=4"
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
      </div>
      <LoginModal open={open} handleClose={handleClose} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2,
            minWidth: "150px",
          },
        }}
        MenuListProps={{
          sx: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ paddingY: "12px" }}
          onClick={() => handleMenuItemClick("/mypage")}
        >
          마이페이지
        </MenuItem>
        <MenuItem sx={{ paddingY: "12px" }} onClick={handleLogout}>
          로그아웃
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={bellAnchorEl}
        id="account-menu"
        open={bellModalOpen}
        onClose={handleBellClose}
        onClick={handleBellClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2,
            minWidth: "250px",
            maxHeight: "300px",
            overflowY: "scroll",
          },
        }}
        MenuListProps={{
          sx: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Array(9)
          .fill(0)
          .map((item) => (
            <MenuItem sx={{ paddingY: "12px" }}>
              이효원님이 팔로우를 시작했습니다.
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default Header;
