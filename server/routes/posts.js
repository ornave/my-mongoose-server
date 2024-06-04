const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.use(verifyToken);

router.get("/", (req, res) => {
  // last 20 posts sorted of the friends of the user + 5 of the users that are not friend with 
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = router;
