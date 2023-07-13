import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import myOrderRouter from './routes/mypage_order.js';
import practiceAPIRouter from './routes/practiceAPI.js';
import itemsRouter from './routes/items.js';
import itemsInfoRouter from './routes/items_info.js';
import itemsCoffeeRouter from './routes/items_coffee.js';
import itemsGiftRouter from './routes/items_gift.js';
import cartRouter from './routes/cart.js';
import cartOrderRouter from './routes/cart_order.js';
import orderCompleteRouter from './routes/order_complete.js';
import testRouter from './routes/test.js';
import loginRouter from './routes/login.js';
import signupRouter from './routes/signup.js';
import finishSignupRouter from './routes/finish_signup.js';
import userInformationRouter from './routes/user_information.js';
import adminRouter from './routes/admin.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);
app.use('/mypage_order', myOrderRouter);
app.use('/practiceAPI', practiceAPIRouter);
app.use('/cart', cartRouter);
app.use('/cart_order', cartOrderRouter);
app.use('/order_complete', orderCompleteRouter);
app.use('/items', itemsRouter);
app.use('/items_coffee', itemsCoffeeRouter);
app.use('/items_gift', itemsGiftRouter);
app.use('/items_info', itemsInfoRouter);
app.use('/test', testRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/finish_signup', finishSignupRouter);
app.use('/user_information', userInformationRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
