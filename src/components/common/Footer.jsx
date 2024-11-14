import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-10 bg-primary">
      <div className="max-w-[1400px] w-full px-5 py-10 m-auto">
        <div className="flex flex-col w-full gap-2">
          <Typography component={"pre"} color="white" variant="body2">
            서비스 이용약관 | 개인정보 처리방침 | 회사 안내 <br />
            <br />
            고객센터 | cinewall@huyndai.co.kr, 02-123-8282 <br />
            제휴 및 대외 협력 | hyundaiautoever webapp course <br />
            <br />
            주식회사 씨네월 | 대표 이효원 | 서울특별시 금천구 가산디지털1로 189
            (주)LG 가산디지털센터
            <br />
            사업자 등록 번호 134-88-342134 <br />© 2024 by CINEWALL, Inc. All
            rights reserved.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
