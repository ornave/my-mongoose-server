const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");
const {
  registerUser,
  getUserById,
  updateUserById,
  deleteUserById
} = require("../controllers/userController");

const {
  createFriendsRequest,
  acceptFriendsRequest,
  getFriendsByUserId,
  deleteFriendById
} = require("../controllers/friendsController");
const {
  getPostsByUserId,
  createNewPost,
  deletePostById,
  updatePostById,
} = require("../controllers/postController");

router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUserById);
router.delete("/:id", verifyToken, deleteUserById);

router.get("/:id/posts", verifyToken, getPostsByUserId);
router.post("/:id/posts", verifyToken, createNewPost);
router.put("/:id/posts/:pid", verifyToken, updatePostById);
router.delete("/:id/posts/:pid", verifyToken, deletePostById);

router.get("/:id/friends", verifyToken, getFriendsByUserId);
router.post("/:id/friends", verifyToken, createFriendsRequest);
router.patch("/:id/friends/:fid", verifyToken, acceptFriendsRequest);
router.delete("/:id/friends/:fid", verifyToken, deleteFriendById);

router.post("/", registerUser);

module.exports = router;
