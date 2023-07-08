import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(dirname, 'public')));
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.express);

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});