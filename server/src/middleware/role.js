// src/middleware/role.js

exports.requireRole = (role) => {
    return (req, res, next) => {
      if (!req.userRole || req.userRole !== role) {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }
      next();
    };
  };
  