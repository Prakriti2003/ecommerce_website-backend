const express = require("express");
const { fetchAllBrands, createBrand } = require("../controller/Brand");
const router = express.Router();
//This rouetr has the base path as categories
router.get("/", fetchAllBrands).post("/", createBrand);

exports.router = router;
