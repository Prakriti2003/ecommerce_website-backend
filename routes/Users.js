const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();
//This rouetr has the base path as users
router.get("/own", fetchUserById).patch("/:id", updateUser);

exports.router = router;
