const express = require("express");
const {
  fetchOrderByUser,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();
//This rouetr has the base path as orders
router
  .get("/own", fetchOrderByUser)
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", fetchAllOrders);

exports.router = router;
