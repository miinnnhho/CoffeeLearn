import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/add_category');
});

export default router;
