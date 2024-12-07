const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

// create express app
const app = express();

// configure dotenv
dotenv.config();

// middleware CORS & parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

// middleware session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
      secure: false,
    },
  })
);

// middleware logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});


// call Routes
require("./src/routes/auth.routes")(app);


// for testing only
app.get("/", (req, res) => {
    res.send("Welcome to the server");
})

module.exports = app;
