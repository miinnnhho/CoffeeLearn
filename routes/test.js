import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('test');
});

export default router;