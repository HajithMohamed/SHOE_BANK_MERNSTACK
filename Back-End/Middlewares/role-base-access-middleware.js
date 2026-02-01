// middlewares/restrictTo.js
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const restrictTo = (...allowedRoles) => {
  return catchAsync(async (req, res, next) => {
    // 1. Make sure protect middleware ran before this
    if (!req.userInfo || !req.userInfo.role) {
      return next(new AppError('Authentication required', 401));
    }

    // 2. Check if user's role is in the allowed list
    if (!allowedRoles.includes(req.userInfo.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    // 3. All good → proceed
    next();
  });
};

module.exports = restrictTo;