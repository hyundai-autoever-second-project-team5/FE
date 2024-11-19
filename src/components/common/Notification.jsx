import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Badge,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const bellModalOpen = Boolean(bellAnchorEl);
  const [notifications, setNotifications] = useState([]);
  const eventSourceRef = useRef(null);

  // 컴포넌트 마운트 시 SSE 연결 설정
  useEffect(() => {
    const eventSource = new EventSource("https://api.cinewall.shop/subscribe", {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("SSE 연결 열림!");
    };

    eventSource.onmessage = (ev) => {
      console.log(ev.data);
    };

    eventSource.addEventListener("follow", (event) => {
      const data = JSON.parse(event.data);
      console.log("새로운 팔로우 요청:", data);

      setNotifications((prev) => [
        ...prev,
        {
          id: data.follower_id,
          message: `${data.from_user_nickname}님이 팔로우를 시작했습니다.`,
          profileUrl: data.from_user_profile_url,
        },
      ]);
    });

    eventSource.onerror = (error) => {
      console.error("SSE 오류:", error);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  const handleBellOpen = (e) => {
    setBellAnchorEl(e.currentTarget);
  };

  const handleBellClose = () => {
    setBellAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleBellOpen}>
        <Badge
          badgeContent={notifications.length} // 알림 수 표시
          color="error"
          overlap="circular"
        >
          <FontAwesomeIcon icon={faBell} color="white" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={bellAnchorEl}
        open={bellModalOpen}
        onClose={handleBellClose}
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
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <MenuItem
              key={index}
              sx={{ paddingY: "12px", display: "flex", alignItems: "center" }}
            >
              <Avatar
                src={notif.profileUrl}
                alt={`${notif.message} 프로필 이미지`}
                sx={{ width: 30, height: 30, marginRight: 2 }}
              />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {notif.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{ paddingY: "12px" }}>새로운 알림이 없습니다.</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Notification;
