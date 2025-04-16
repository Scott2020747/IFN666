const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header received:', authHeader); // Log the header

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  console.log('Token sent from front end:', token); // Log the token received
  
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err); // Log verification error, if any
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    
    console.log('Decoded token payload:', decoded); // Log the decoded token payload
    
    // For additional clarity, you might log the expected token payload separately if needed.
    req.userId = decoded.id;
    req.userRole = decoded.role; // Store the role for later use
    next();
  });
};
