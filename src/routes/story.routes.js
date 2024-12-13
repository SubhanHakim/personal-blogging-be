module.exports = (app) => {
  const router = require("express").Router();
  const {
    getStories,
    getStoryId,
    createStory,
    updateStory,
    deleteStory,
  } = require("../controllers/stroyController");
  const { verifyToken } = require("../middleware/authMiddleware");
  const { validationStory } = require("../middleware/validationStory");

  // get all stories
  router.get("/", getStories);
  // get single story
  router.get("/detail/:id", getStoryId);
  // create story
  router.post("/create", verifyToken, validationStory, createStory);
  // update story
  router.put("/update/:id", verifyToken, updateStory);
  // delete story
  router.delete("/delete/:id", verifyToken, deleteStory);

  app.use("/api/stories", router);
};
