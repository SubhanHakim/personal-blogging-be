const validator = require("validator");

const validationRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  console.log("Rceived data", email);
  

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      error: "Invalid email!",
    });
  }

  if (
    !username ||
    typeof username !== "string" ||
    !validator.isLength(username, { min: 3, max: 30 })
  ) {
    return res.status(400).json({ message: "Invalid username" });
  }

  if (
    !password ||
    typeof password !== "string" ||
    !validator.isLength(password, { min: 8 }) ||
    !/[A-Z]/.test(password)
  ) {
    return res.status(400).json({ message: "Invalid password" });
  }

  next();
};

module.exports = { validationRegister };
