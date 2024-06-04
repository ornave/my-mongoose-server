const express = require("express");
const router = express.Router();
const jwtProvider = require("../auth/jwtProvider");
const postsRoute = require("./posts");
const usersRoute = require("./users");

router.post("/tokens", jwtProvider);

router.use("/posts", postsRoute);
router.use("/users", usersRoute);

module.exports = router;
