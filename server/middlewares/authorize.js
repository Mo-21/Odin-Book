const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  let token;

  if (req.cookies.accessToken === null) {
    return res.status(400).json({ message: "Invalid access token" });
  } else {
    try {
      //Get token from header
      token = req.cookies.accessToken;
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      if (!token) return res.status(401).json("Not Authorized!");
      //Get the user from the token
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }
};

module.exports = authorize;
