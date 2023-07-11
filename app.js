import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import loginRouter from './routes/login.js';
import signupRouter from './routes/signup.js';
import finishSignupRouter from './routes/finish_signup.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/finish_signup', finishSignupRouter);


app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
