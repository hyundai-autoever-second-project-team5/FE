const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 주소로 변경
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/subscribe', (req, res) => {
  const token = req.query.token;
  
  if (!token || token !== 'valid-token') {
    res.status(401).send('Unauthorized');
    return;
  }

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.flushHeaders();

  const intervalId = setInterval(() => {
    const data = {
      follower_id: Math.floor(Math.random() * 100),
      from_user_id: Math.floor(Math.random() * 100),
      from_user_nickname: `사용자${Math.floor(Math.random() * 100)}`,
      from_user_profile_url: 'http://example.com/profile.jpg',
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000); // 5초마다 전송

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});