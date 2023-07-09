import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/order', function (req, res) {
    res.render('order');
});
app.get('/order_complete', function (req, res) {
    res.render('order_complete');
});
app.get('/order_modify', function (req, res) {
    res.render('order_modify');
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
