const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { User } = require("../models/User");

const opts = {
  jwtFromRequest: function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["accessToken"];
    }
    return token;
  },
  secretOrKey: process.env.JWT_ACCESS_KEY,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
