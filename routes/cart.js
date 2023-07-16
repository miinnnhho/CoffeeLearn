import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('cart/cart');
});

router.get('/order', function (req, res) {
  res.render('cart/order');
});

router.get('/order_complete', function (req, res) {
  res.render('cart/order_complete');
});

export default router;