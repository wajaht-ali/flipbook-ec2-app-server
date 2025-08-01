import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../model/userModel.js";
import config from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const profileImg = profile.photos[0].value;

        let user = await UserModel.findOne({ where: { googleId } });

        if (!user) {
          user = await UserModel.create({
            googleId,
            name,
            email,
            profileImg,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
