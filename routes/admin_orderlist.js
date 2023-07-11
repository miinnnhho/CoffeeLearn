import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/orderlist');
});

export default router;
