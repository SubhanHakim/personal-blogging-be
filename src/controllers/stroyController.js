const Story = require("../models/Story");
const { validationResult } = require("express-validator");

// get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("user", "username email").sort({ createdAt: "desc" });
    res.status(200).json(stories);
  } catch (error) {
    console.error("error in getStories", error);
    res.status(500).json({ error: error.message });
  }
};

// get single story
exports.getStoryId = async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId).populate("user", "username email");
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    console.error("error in getStoryId", error);
    res.status(500).json({ error: error.message });
  }
};

// create story
exports.createStory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, body, status, category } = req.body;
  try {
    const newStory = new Story({
      title,
      body,
      status,
      category,
      user: req.user.id,
    });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error("error in createStory", error);
    res.status(500).json({ error: error.message });
  }
};

// update story
exports.updateStory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, body, status, category } = req.body;
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    story.title = title;
    story.body = body;
    story.status = status;
    story.category = category;
    await story.save();
    res.status(200).json(story);
  } catch (error) {
    console.error("error in updateStory", error);
    res.status(500).json({ error: error.message });
  }
};

// delete story
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await Story.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Story removed" });
  } catch (error) {
    console.error("error in deleteStory", error);
    res.status(500).json({ error: error.message });
  }
};