import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import itemsRouter from './routes/items.js';
import itemsInfoRouter from './routes/items_info.js';
import itemsCoffeeRouter from './routes/items_coffee.js';
import itemsGiftRouter from './routes/items_gift.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/items_coffee', itemsCoffeeRouter);
app.use('/items_gift', itemsGiftRouter);
app.use('/items_info', itemsInfoRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
