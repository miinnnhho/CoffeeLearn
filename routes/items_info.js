import express from "express";

const router = express.Router();

router.get("/:productId", function (req, res) {
  const productId = req.params.productId;
  res.render("items_info", { productId });
});

export default router;
