export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "آپ کو اس ریسورس کی اجازت نہیں"
      });
    }
    next();
  };
};
