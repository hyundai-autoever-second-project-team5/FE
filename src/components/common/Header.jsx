import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import { getKakaoLogin, postSignUp } from "../../api/user";
import axios from "axios";
import client from "../../api/client";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width:550px)");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleKakaoLogin = async () => {
    getKakaoLogin().then((res) => console.log(res));
  };

  // const handleSignUp = () => {
  //     postSignUp()
  // }

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
          isScrolled ? "bg-primary" : "bg-transparent"
        }`}
      >
        <div className="flex flex-row justify-between max-w-[1400px] w-full px-5">
          <Typography variant="h4" color="white">
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">로그인/회원가입</Typography>
          <div className="flex flex-col gap-2 my-2">
            <TextField label="이메일" className="w-full" />
            <TextField label="비밀번호" className="w-full" />
          </div>

          <div className="flex flex-col gap-2 my-3">
            <Button variant="contained" color="inherit" className="w-full">
              로그인
            </Button>
            <Button variant="contained" color="inherit" className="w-full">
              회원가입
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={handleKakaoLogin}
            className="w-full"
            startIcon={<FontAwesomeIcon icon={faComment} />}
          >
            카카오로 로그인하기
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
