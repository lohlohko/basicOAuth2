const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
require("dotenv").config();
const app = express();
const passport = require("./configs/google-oauth");
const session = require("express-session");
const userController = require("./controllers/user.controller");
const { register, login, newToken } = require("./controllers/auth.controller");

app.use(cors());
app.use(express.json());

let port = process.env.PORT || 9000;

// register
app.post("/register", register);
// .login
app.post("/login", login);
app.use("/users", userController);

//google oauth2
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use("/auth/google/logout", (req, res) => {
 req.session.destroy();
 res.send("Logout Succes!")
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/protected",
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);
    return res.redirect
    ( `http://localhost:9000/auth/google/?token=${token}&name=${user.name}&profile=${user.profileImage}`);
  }
);

app.get("/auth/google/protected", (req, res) => {
  return res.status(200).json({ msg: "Login Succes" });
});

app.get("/auth/google/failure", (req, res) => {
  return res.status(400).json({ msg: "Login Failed" });
});

app.listen(port, async () => {
  try {
    await connect();
    console.log(`server is running on port ${port}`);
  } catch (err) {
    console.error(err.message);
  }
});
