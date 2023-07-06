const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index'); // index.ejs 파일 렌더링
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
