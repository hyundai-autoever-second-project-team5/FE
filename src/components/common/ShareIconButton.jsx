import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ShareIconButton() {
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href; // 현재 페이지의 URL

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // 2초 후에 상태 초기화
  };

  return (
    <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
      <Tooltip title={isCopied ? "링크가 복사되었습니다!" : "공유하기"} arrow>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faShareAlt} style={{ fontSize: "24px" }} />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
}

export default ShareIconButton;
