export const hasRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const errorMessage = encodeURIComponent("Доступ запрещен");
      res.redirect(`/error?error=${errorMessage}`);
      return;
    }
    next();
  };
};
