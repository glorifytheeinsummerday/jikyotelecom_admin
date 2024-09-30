const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// SSL 인증서 및 키 파일 경로 설정
// Let's Encrypt를 사용하여 발급받은 인증서와 키 파일의 경로입니다.
// 도메인에 맞게 경로를 수정하세요.
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/www.jikyotelecom.com/privkey.pem'),  // 개인 키 파일 경로
    cert: fs.readFileSync('/etc/letsencrypt/live/www.jikyotelecom.com/fullchain.pem') // 인증서 파일 경로
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// 간단한 로그인 엔드포인트
app.post('/admin-dashboard', (req, res) => {
    const { username, password } = req.body;

    // 허용된 사용자 목록
    const validUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'admin1', password: 'password1' },
        { username: 'admin2', password: 'password2' }
    ];

    // 사용자 인증
    const user = validUsers.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '잘못된 사용자 이름 또는 비밀번호' });
    }
});

// HTTPS 서버 실행
https.createServer(options, app).listen(port, () => {
    console.log(`서버가 https://www.jikyotelecom.com:${port}에서 실행 중입니다.`);
});
