import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('items/items');
});

router.get("/coffee_learn/:productId", function (req, res) {
  const productId = req.params.productId;
  res.render("items/items_info", { productId });
});

router.get('/giftset', function (req, res) {
  res.render('items/giftset');
});

router.get('/coffee', function (req, res) {
  res.render('items/coffee');
});

export default router;