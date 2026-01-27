const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const adminMiddleware = catchAsync(async (req, res, next) => {
  if (!req.userInfo || !req.userInfo.role) {
    return next(new AppError('Authentication required', 401));
  }

  if (req.userInfo.role !== 'admin') {
    return next(new AppError('You do not have permission to perform this action. Admin access required.', 403));
  }

  next();
});

module.exports = adminMiddleware;
