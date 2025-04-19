const authService = require('../services/authService');

// Authentication middleware
exports.authenticate = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
      return next();
    }
    
    const user = await authService.getUserBySession(sessionId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Require authentication
exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Require specific user type
exports.requireUserType = (userTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  };
};