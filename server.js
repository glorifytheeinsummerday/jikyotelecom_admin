const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS 모듈 추가
const app = express();
const port = 3000;

app.use(cors()); // CORS 허용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/admin-dashboard', (req, res) => {
    const { username, password } = req.body;

    // 추가된 아이디와 비밀번호
    const validUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'admin1', password: 'password1' },
        { username: 'admin2', password: 'password2' }
    ];

    // 로그인 검증
    const user = validUsers.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ success: true }); // 로그인 성공 시 JSON 응답
    } else {
        res.json({ success: false, message: '잘못된 사용자 이름 또는 비밀번호' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
