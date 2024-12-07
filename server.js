const app = require("./app.js");
const mongoose = require("mongoose");
require("dotenv").config();

const db = {
  url: process.env.MONGODB_URI,
};


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(db.url, {});
    console.log(`Connected to MongoDB on ${db.url}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

// server
const server = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT;
    if (!app.listening) {
      app.listening = true;
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
    
  }
};

if (process.env.NODE_ENV !== "production") {
  server();
}

module.exports = app;
