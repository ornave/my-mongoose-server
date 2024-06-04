const Friendship = require("../models/Friendship");

const getFriendsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const isFriends = async (user1, user2) => {
      const friendship = await Friendship.findOne({
        $or: [
          { user_id: user1, friend_id: user2 },
          { user_id: user2, friend_id: user1 },
        ],
        status: "accepted",
      });
      return !!friendship;
    };
    if (
      userId === req.currentUserId ||
      (await isFriends(req.currentUserId, userId))
    ) {
      const friendships = await Friendship.find({
        $or: [{ user_id: userId }, { friend_id: userId }],
        status: "accepted",
      }).populate([
        { path: "friend_id", select: ["first_name", "last_name", "email"] },
        { path: "user_id", select: ["first_name", "last_name", "email"] },
      ]);

      const formatted = friendships.map((friendship) =>
        friendship.user_id.id === userId
          ? friendship.friend_id
          : friendship.user_id
      );

      res.status(200).json(formatted);
    } else {
      res.status(403).json({ message: "Can't access user's friendships" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed getting user: " + error.message });
  }
};

const createFriendsRequest = async (req, res) => {
  try {
    const friendship = new Friendship({
      user_id: req.currentUserId,
      friend_id: req.params.id,
    });
    const result = await friendship.save();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed sending request", error: error.message });
  }
};

const acceptFriendsRequest = async (req, res) => {
  try {
    if (req.currentUserId !== req.params.id) {
      res.status(403).json({ error: "Unauthorized request" });
      return;
    }
    const friendship = await Friendship.findOneAndUpdate(
      { user_id: req.params.fid, friend_id: req.params.id, status: "pending" },
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(friendship);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed sending request", error: error.message });
  }
};

const deleteFriendById = async (req, res) => {
  const userId = req.params.id;
  const friendId = req.params.fid;

  try {
    if (req.currentUserId !== userId) {
      res.status(403).json({ error: "Unauthorized request" });
      return;
    }

    await Friendship.findOneAndDelete({
      $or: [
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId },
      ],
    });
    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getFriendsByUserId,
  createFriendsRequest,
  acceptFriendsRequest,
  deleteFriendById
};
