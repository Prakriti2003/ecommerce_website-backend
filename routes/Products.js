const express = require("express");
const {
  createProduct,
  fetchProductsByFilter,
  fetchProductById,
  updateProduct,
} = require("../controller/Product");

const router = express.Router();
//This rouetr has the base path as products
router
  .post("/", createProduct)
  .get("/", fetchProductsByFilter)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

exports.router = router;
