import React, { useState, useEffect, useRef } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const bellModalOpen = Boolean(bellAnchorEl);
  const [notifications, setNotifications] = useState([]);
  const eventSourceRef = useRef(null);

  // 컴포넌트 마운트 시 SSE 연결 설정
  useEffect(() => {
    // SSE 연결
    const eventSource = new EventSource("https://3.38.104.1:8080/subscribe");

    eventSource.onopen = () => {
      console.log("SSE 연결 열림!");
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

    // Ref로 EventSource 저장
    eventSourceRef.current = eventSource;

    // 컴포넌트 언마운트 시 SSE 연결 종료
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 한 번만 실행

  const handleBellOpen = (e) => {
    setBellAnchorEl(e.currentTarget);
  };

  const handleBellClose = () => {
    setBellAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleBellOpen}>
        <FontAwesomeIcon icon={faBell} color="white" />
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
            <MenuItem key={index} sx={{ paddingY: "12px" }}>
              {notif.message}
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
