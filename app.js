import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import orderRouter from './routes/order.js';
import orderCompleteRouter from './routes/order_complete.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);
app.use('/order', orderRouter);
app.use('/order_complete', orderCompleteRouter);

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
