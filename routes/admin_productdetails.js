import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/product_details');
});

export default router;
