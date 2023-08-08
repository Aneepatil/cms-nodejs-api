export const isAuthorized = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.userAuth.role)) {
      return res.status(403).json({
        Message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
