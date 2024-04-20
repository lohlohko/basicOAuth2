require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4 } = require("uuid");
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?.email }).lean().exec();

      if (!user) {
        let nickName = profile?.email.split("@")[0];
        user = await User.create({
          email: profile?.email,
          password: v4(),
          name: nickName,
          profileImage: profile?.photos[0].value,
        });
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
