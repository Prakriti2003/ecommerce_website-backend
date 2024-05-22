const express = require("express");
const { createUser, loginUser } = require("../controller/Auth");

const router = express.Router();
//This rouetr has the base path as users
router.post("/signup", createUser).post("/login", loginUser);

exports.router = router;
