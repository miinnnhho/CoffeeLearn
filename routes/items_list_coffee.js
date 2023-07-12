import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('items_list_coffee');
});

export default router;