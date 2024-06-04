const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");
const { getFeedPosts } = require("../controllers/postController");

router.use(verifyToken);

router.get("/", verifyToken, getFeedPosts);

module.exports = router;
