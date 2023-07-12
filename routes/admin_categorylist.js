import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/categorylist');
});

export default router;
