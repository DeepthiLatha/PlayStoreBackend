const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const generateToken = (user) => {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return token;
  };


  const authorize = (requiredRole) => {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('Unauthorized');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (requiredRole && req.user.role !== requiredRole) {
          return res.status(403).send('Forbidden');
        }
        next();
      } catch (error) {
        return res.status(401).send('Invalid token');
      }
    };
  };

  module.exports = {generateToken, authorize}