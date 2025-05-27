const express = require("express");
const upload = require("../middleware/multerUpload");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Video = require("../models/Video");
const uploadToS3 = require("../services/awsUploader");
const fs = require("fs");
const User = require("../models/User");
const Gift = require("../models/gift");

const uploadFields = upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

router.post("/upload", uploadFields, verifyToken, async (req, res) => {
  try {
    const { title, description, videoType, isPaid, price, videoUrl } = req.body;

    const videoFile = req.files.videoFile?.[0] || null;
    const thumbnail = req.files.thumbnail?.[0] || null;

    let videoFileUrl;
    let thumbnailUrl;

    if (videoType === "short") {
      const uploadResult = await uploadToS3(videoFile.path, "video");
      videoFileUrl = uploadResult.Location;
      fs.unlinkSync(videoFile.path);
    }

    if (videoType === "long") {
      const uploadResult = await uploadToS3(thumbnail.path, "thumbnail");
      thumbnailUrl = uploadResult.Location;
      videoFileUrl = videoUrl;
      fs.unlinkSync(thumbnail.path);
    }

    const user = await User.findById(req.userId);

    const video = new Video({
      creator: {
        id: req.userId,
        username: user.username,
      },
      title,
      description,
      videoType,
      videoUrl: videoType === "short" ? videoFileUrl : videoUrl,
      isPaid,
      price,
      thumbnail: videoType === "long" ? thumbnailUrl : null,
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getvideos/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * 6)
      .limit(6);

    const totalVideos = await Video.countDocuments();
    const totalPages = Math.ceil(totalVideos / 6);

    res.status(200).json({ videos, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/purchase", verifyToken, async (req, res) => {
  try {
    const { videoId } = req.body;
    const user = await User.findById(req.userId);
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (user.balance < video.price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= video.price;
    user.purchasedVideos.push({ videoId, purchasedAt: new Date() });
    await user.save();

    res.status(200).json({ message: "Video purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/comment", verifyToken, async (req, res) => {
  try {
    const { videoId, comment } = req.body;
    const user = await User.findById(req.userId);
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.comments.push({
      username: user.username,
      content: comment,
      createdAt: new Date(),
    });
    await video.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/gift", verifyToken, async (req, res) => {
  try {
    const { videoId, amount, comment } = req.body;
    const user = await User.findById(req.userId);
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= amount;
    await user.save();

    const gift = new Gift({ videoId, amount, comment, userId: user._id });
    await gift.save();

    res.status(200).json({ message: "Gift sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
