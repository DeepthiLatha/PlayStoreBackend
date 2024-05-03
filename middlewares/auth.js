const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    console.log(process.env.JWT_SECRET, process.env.JWT_EXPIRY);
    return token;
  };

  const authorize = (requiredRole) => {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      // console.log(authHeader);
      if (!authHeader) {
        return res.status(401).send('Unauthorized');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(process.env.JWT_SECRET, decoded);
        req.user = decoded;
        if (requiredRole && req.user.role !== requiredRole) {
          return res.status(403).send('Forbidden');
        }
        next();
      } catch (error) {
        return res.status(401).send(`error: ${error}`);
      }
    };
  };

  module.exports = {generateToken, authorize}