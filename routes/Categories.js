const express = require("express");
const {
  fetchAllCategories,
  createCategory,
} = require("../controller/Category");
const router = express.Router();
//This rouetr has the base path as categories
router.get("/", fetchAllCategories).post("/", createCategory);

exports.router = router;
