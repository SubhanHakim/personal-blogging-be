module.exports = (app) => {
  const router = require("express").Router();
  const auth = require("../controllers/authContoller");
  const { validationRegister } = require("../middleware/validationRegister");

  console.log("auth.register", auth.register);
  console.log("auth.login", auth.login);
  console.log("validationRegister", validationRegister);

  // register user
  router.post("/register", validationRegister, auth.register);

  // login user
  router.post("/login", async (req, res) => {
    try {
      await auth.login(req, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post("/logout", async (req, res) => {
    try {
      await auth.logout(req, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use("/api/auth", router);
};
