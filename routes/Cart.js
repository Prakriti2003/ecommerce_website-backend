const express = require("express");
const {
  fetchCartByUser,
  addToCart,
  updateCart,
  deleteFromCart,
} = require("../controller/Cart");
const router = express.Router();
//This rouetr has the base path as categories
router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);

exports.router = router;
