import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/User.js";

function initializePassport(passport) {
  // Local email/password login strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Email not found." });
          }

          const match = await user.comparePassword(password);

          if (!match) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

// Google OAuth login strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleEmail = profile.emails?.[0]?.value;

        if (!googleEmail) {
          return done(null, false, {
            message: "No email found from Google account."
          });
        }

        const allowedAdminEmail = "haydenmk@hawaii.edu";

        if (googleEmail !== allowedAdminEmail) {
          return done(null, false, {
            message: "This Google account is not authorized."
          });
        }

        let user = await User.findOne({ email: googleEmail });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.name = profile.displayName;
            await user.save();
          }

          return done(null, user);
        }

        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: googleEmail,
          role: "admin"
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default initializePassport;