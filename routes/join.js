import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('join/join');
});

router.get('/finish', function (req, res) {
  res.render('join/finish_join');
});

export default router;
