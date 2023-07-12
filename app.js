import path from 'path';
import express from 'express';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

import indexRouter from './routes/index.js';
import addProductRouter from './routes/admin_additem.js';
import productListRouter from './routes/admin_itemlist.js';
import categoryListRouter from './routes/admin_categorylist.js';
import orderListRouter from './routes/admin_orderlist.js';
import productDetailsRouter from './routes/admin_productdetails.js';
import addCategoryRouter from './routes/admin_addcategory.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express);

app.use('/', indexRouter);
app.use('/admin/additem', addProductRouter);
app.use('/admin/product', productListRouter);
app.use('/admin/category', categoryListRouter);
app.use('/admin/order', orderListRouter);
app.use('/admin/productdetails', productDetailsRouter);
app.use('/admin/addcategory', addCategoryRouter);
app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});
