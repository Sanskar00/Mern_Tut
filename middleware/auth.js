const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token
  const decoded = jwt.verify(
    token,
    config.get("jwtSecret"),
    (err, verifiedToken) => {
      if (err) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = verifiedToken.user;
        console.log(verifiedToken.user);
        next();
      }
    }
  );
};
