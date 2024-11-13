import React from "react";
import { TextField, Button, Avatar, Card, CardContent } from "@mui/material";

const Userprofile = ({ profile, name, nickname}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-3 px-3 py-10 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="items-center justify-center text-bold">
          <Avatar
            src={profile}
            alt="profile-image"
            sx={{ width: 100, height: 100 }}
            className="mb-2"
          />
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={"/"}
            sx={{ marginBottom: "8px" }}
          >
            프로필 변경
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        이름
        <div className="text-lg">{name}</div>
        <div className="text-xs">
            이름은 최소 2자, 최대 20자 까지 입력이 가능해</div>
            <div className="text-xs">수정한 정보는 씨네월의 다른 서비스에도 동일하게 표시돼요</div>
        <div></div>
        닉네임
        <div className="text-lg text-gray-6">{nickname}</div>
      </div>
    </div>
  );
};

export default Userprofile;