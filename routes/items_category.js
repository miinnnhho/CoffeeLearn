import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('items_category');
});

export default router;