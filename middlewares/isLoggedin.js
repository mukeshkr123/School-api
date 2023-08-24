const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
  // get token from header
  const headerObj = req.headers;
  const token = headerObj.authorization.spilt(" ")[1];
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //find the admin
    const user = Admin.findById(verifiedToken.id).select("name email role");
    //save the user into req.onj
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token Expired ");
    next(err);
  }
};

module.exports = isLogin;
