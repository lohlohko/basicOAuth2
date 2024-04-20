require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);

      resolve(decoded);
    });
  });
};

module.exports = async (req, res, next) => {
 
  if (!req.headers.authorization)
    return res.status(401).send({
      message: "Unauthorized request",
    });

  
  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(401).send({
      message: "Unauthorized request",
    });


  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(400).send({
      message: "authorization token was not provided or was not valid",
    });
  }

};
