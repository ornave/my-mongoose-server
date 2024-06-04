const express = require("express");
const router = express.Router();
const jwtProvider = require("../auth/jwtProvider");
const protectedRoute = require("./routes/protectedRoute");
const postsRoute = require("./routes/posts");

router.get("/tokens", jwtProvider);

router.use("/posts", postsRoute);
router.use("/users", protectedRoute);

module.exports = router;
