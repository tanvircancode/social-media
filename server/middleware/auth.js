const jwt = require("jsonwebtoken");

 const authenticateJwtUser = (req, res, next) => {

    const authHeader = req.headers.authorization;
   
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        req.user = user;
        next();
      });
    } else {
      return res.status(401).send("Access Denied");
    }
}

module.exports = authenticateJwtUser
