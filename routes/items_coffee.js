import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('items_coffee');
});

export default router;