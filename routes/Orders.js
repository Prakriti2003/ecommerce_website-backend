const express = require("express");
const {
  fetchOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/Order");

const router = express.Router();
//This rouetr has the base path as orders
router
  .get("/", fetchOrderByUser)
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
