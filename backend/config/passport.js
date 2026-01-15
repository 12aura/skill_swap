// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User");
// require("dotenv").config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const googleName = profile.displayName;

//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           user = await User.create({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             password: "google_auth",
//             isGoogleUser: true,
//           });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// module.exports = passport;

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const googleName = profile.displayName;

//         let user = await User.findOne({ email });

//         if (!user) {
//           // ✅ CREATE user with Google name
//           user = new User({
//             name: googleName,          // <-- THIS is important
//             email: email,
//             password: null,            // or ""
//             authProvider: "google"
//           });

//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// module.exports = passport;


const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        // If new user → SIGNUP
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            authProvider: "google",
            googleId: profile.id,
            password: null,
          });
        }

        // Existing user → LOGIN
        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
