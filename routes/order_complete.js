import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('order_complete');
});

export default router;
